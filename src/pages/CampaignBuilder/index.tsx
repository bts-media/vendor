import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, PageTitle } from '~components/index';
import { useNotify } from '~components/NotificationProvider';
import { DEFAULT_CAMPAIGN_DAYS, MAX_CAMPAIGN_REGIONS } from '~constants/data';
import { PackageTier } from '~constants/enums';
import { useHeaderSlot } from '~context/HeaderSlotProvider';
import useDebounce from '~hooks/useDebounce';
import useLanguage from '~hooks/useLanguage';
import { channelIdOf, useCreateCampaign, useEstimate } from '~services/campaigns';
import { normalizePlacements } from '~services/campaigns/placements';
import { estimateScans, useInventory } from '~services/inventory';
import styles from './CampaignBuilder.module.css';
import CampaignSummary from './sections/CampaignSummary';
import CreativeStep from './sections/CreativeStep';
import PlacementsStep from './sections/PlacementsStep';
import ReviewStep from './sections/ReviewStep';
import TargetingStep from './sections/TargetingStep';
import WizardSteps from './sections/WizardSteps';
import { WizardState } from './types';

const INITIAL_CHANNELS: WizardState['channels'] = ['parcel', 'screen'];
const INITIAL_GOAL = 1_000_000;

/**
 * Boshlang'ich qiymatlar mockupdagi holatga mos (posilka + ekran). Hududlar bu yerda
 * yozilmaydi: ular backenddagi faol filiallardan kelib chiqadi, shuning uchun qat'iy ro'yxat
 * hech qanday filial xizmat ko'rsatmaydigan hududni so'rab, `REGION_NOT_AVAILABLE` beradi.
 */
const INITIAL_STATE: WizardState = {
    name: '',
    channels: INITIAL_CHANNELS,
    regions: [],
    goal: INITIAL_GOAL,
    days: DEFAULT_CAMPAIGN_DAYS,
    placements: normalizePlacements(channelIdOf(INITIAL_CHANNELS), [], INITIAL_GOAL),
};

const REVIEW_STEP = 3;

const CampaignBuilderPage = () => {
    const { t } = useLanguage();
    const notify = useNotify();
    const navigate = useNavigate();
    const { setExtra } = useHeaderSlot();

    const [state, setState] = useState<WizardState>(INITIAL_STATE);
    const [step, setStep] = useState(0);
    const [maxReached, setMaxReached] = useState(0);

    const { channels, regions, pricing, isLoading: isInventoryLoading } = useInventory();
    const { createCampaign, isCreating } = useCreateCampaign();
    const { estimate, lines, isEstimating } = useEstimate();

    /**
     * Kanal yoki maqsad o'zgarsa qatorlar backend qoidasiga tekislanadi (majburiy stiker /
     * televizor, posilka soni = maqsad); televizorsiz kanalga o'tsa televizorli paket ketadi.
     */
    const handleChange = (patch: Partial<WizardState>) =>
        setState(prev => {
            const next = { ...prev, ...patch };
            if (patch.channels || patch.goal !== undefined || patch.placements) {
                const channelId = channelIdOf(next.channels);
                next.placements = normalizePlacements(channelId, next.placements, next.goal);
                if (
                    next.packageTierId !== undefined &&
                    next.packageTierId !== PackageTier.ECONOM &&
                    !next.channels.includes('screen')
                ) {
                    next.packageTierId = undefined;
                }
            }
            return next;
        });

    const creative = state.creative;

    const summary = useMemo(() => {
        return {
            creative,
            campaignName: state.name,
            channelLabels: state.channels.map(key => t(`channel_${key}`)).join(' + '),
            regionLabels: state.regions
                .map(id => regions.find(region => region.id === id)?.name)
                .filter(Boolean)
                .join(', '),
            goal: state.goal,
            days: state.days,
            estimatedScans: estimateScans(state.goal, pricing.expectedScanRate),
            // Narxni backend narxlar jadvali bo'yicha hisoblaydi — klient taxmin qilmaydi
            estimatedCost: lines?.total ?? 0,
            packageLabel: state.packageTierId
                ? t(`package_${PackageTier[state.packageTierId]}`)
                : null,
            lines,
        };
    }, [state, regions, creative, pricing, lines, t]);

    /**
     * Inventar kelgach hamma hudud belgilanadi — mockupdagi "hududlar oldindan tanlangan"
     * holatining haqiqiy ma'lumotdagi ko'rinishi. Faqat bir marta: aks holda foydalanuvchi
     * olib tashlagan hudud qayta belgilanib qolardi.
     */
    const regionsSeeded = useRef(false);
    useEffect(() => {
        if (regionsSeeded.current || !regions.length) return;
        regionsSeeded.current = true;
        setState(prev =>
            prev.regions.length
                ? prev
                : { ...prev, regions: regions.slice(0, MAX_CAMPAIGN_REGIONS).map(item => item.id) },
        );
    }, [regions]);

    /** Maqsad, kanal, hudud, qator yoki paket o'zgarganda narx qayta so'raladi (debounce). */
    const estimateKey = useDebounce(
        JSON.stringify([
            state.channels,
            state.regions,
            state.goal,
            state.days,
            state.placements,
            state.packageTierId,
        ]),
    );
    useEffect(() => {
        // Backend kamida bitta hudud talab qiladi (`@ArrayNotEmpty`) — bo'sh tanlovda so'ramaymiz.
        if (!state.regions.length) return;
        void estimate({
            name: state.name,
            channels: state.channels,
            regions: state.regions,
            goal: state.goal,
            days: state.days,
            placements: state.placements,
            packageTierId: state.packageTierId,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps -- estimate har renderda yangi
    }, [estimateKey]);

    /** Qadam almashtirishdan oldin joriy qadam to'ldirilganini tekshiramiz */
    const validate = (from: number): boolean => {
        if (from === 0 && !state.creative) {
            notify.warning({ type: 'warning', message: t('creative_required') });
            return false;
        }
        if (from === 0 && !state.name.trim()) {
            notify.warning({ type: 'warning', message: t('campaign_name_required') });
            return false;
        }
        if (from === 1 && !state.channels.length) {
            notify.warning({ type: 'warning', message: t('channels_required') });
            return false;
        }
        if (from === 1 && !state.regions.length) {
            notify.warning({ type: 'warning', message: t('regions_required') });
            return false;
        }
        if (from === 2 && !state.placements.length) {
            notify.warning({ type: 'warning', message: t('placements_required') });
            return false;
        }
        return true;
    };

    const goToStep = (next: number) => {
        if (next > step && !validate(step)) return;
        setStep(next);
        setMaxReached(prev => Math.max(prev, next));
        window.scrollTo({ top: 0 });
    };

    // Qadamlar indikatori topbar ichida turadi (mockupdagi kabi)
    useEffect(() => {
        setExtra(<WizardSteps current={step} maxReached={maxReached} onGoTo={goToStep} />);
        return () => setExtra(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- goToStep har renderda yangi
    }, [step, maxReached, setExtra, state]);

    const body = {
        name: state.name || (creative?.name ?? ''),
        channels: state.channels,
        regions: state.regions,
        goal: state.goal,
        days: state.days,
        placements: state.placements,
        packageTierId: state.packageTierId,
        // Kampaniya yaratilgandan keyin shu tiket bilan kreativ biriktiriladi
        creative: state.creative
            ? {
                  name: state.creative.name,
                  typeId: state.creative.typeId,
                  uploadTicket: state.creative.uploadTicket,
              }
            : undefined,
    };

    const handleLaunch = () => createCampaign(body, () => navigate('/campaigns'));

    const isReview = step === REVIEW_STEP;

    return (
        <div>
            <PageTitle title={t(isReview ? 'review_title' : 'builder_title')} />

            <PageHeader
                title={t(isReview ? 'review_title' : 'builder_title')}
                subtitle={t(isReview ? 'review_desc' : 'builder_desc')}
            />

            {isReview ? (
                <ReviewStep
                    {...summary}
                    onBack={() => goToStep(REVIEW_STEP - 1)}
                    onLaunch={handleLaunch}
                    isLaunching={isCreating}
                />
            ) : (
                <div className={styles.builder}>
                    <div className={styles.column}>
                        {step === 0 && <CreativeStep state={state} onChange={handleChange} />}
                        {step === 1 && (
                            <TargetingStep
                                channels={channels}
                                regions={regions}
                                pricing={pricing}
                                isLoading={isInventoryLoading}
                                state={state}
                                onChange={handleChange}
                            />
                        )}
                        {step === 2 && (
                            <PlacementsStep
                                state={state}
                                estimate={lines}
                                isEstimating={isEstimating}
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    <CampaignSummary
                        {...summary}
                        isEstimating={isEstimating}
                        nextLabel={step === REVIEW_STEP - 1 ? t('go_to_review') : t('next')}
                        onNext={() => goToStep(step + 1)}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignBuilderPage;
