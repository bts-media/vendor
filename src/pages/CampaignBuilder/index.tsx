import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, PageTitle } from '~components/index';
import { useNotify } from '~components/NotificationProvider';
import { DEFAULT_CAMPAIGN_DAYS } from '~constants/data';
import { useHeaderSlot } from '~context/HeaderSlotProvider';
import useLanguage from '~hooks/useLanguage';
import { useCreateCampaign, useEstimate } from '~services/campaigns';
import { blendedCpm, estimateScans, useInventory } from '~services/inventory';
import styles from './CampaignBuilder.module.css';
import CampaignSummary from './sections/CampaignSummary';
import CreativeStep from './sections/CreativeStep';
import ReviewStep from './sections/ReviewStep';
import TargetingStep from './sections/TargetingStep';
import WizardSteps from './sections/WizardSteps';
import { WizardState } from './types';

/** Boshlang'ich qiymatlar mockupdagi holatga mos (posilka + ekran, Toshkent + Samarqand) */
const INITIAL_STATE: WizardState = {
    name: '',
    channels: ['parcel', 'screen'],
    regions: ['tashkent', 'samarkand'],
    goal: 1_000_000,
    days: DEFAULT_CAMPAIGN_DAYS,
};

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
    const { estimate, cost, isEstimating } = useEstimate();

    const handleChange = (patch: Partial<WizardState>) =>
        setState(prev => ({ ...prev, ...patch }));

    const creative = state.creative;

    const summary = useMemo(() => {
        const cpm = blendedCpm(state.channels, channels);
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
            // Narxni backend narx kartasi bo'yicha hisoblaydi — klient taxmin qilmaydi
            estimatedCost: cost,
            cpm,
        };
    }, [state, channels, regions, pricing, creative, cost, t]);

    /** Maqsad, kanal yoki hudud o'zgarganda narx qayta so'raladi. */
    useEffect(() => {
        void estimate({
            name: state.name,
            channels: state.channels,
            regions: state.regions,
            goal: state.goal,
            days: state.days,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps -- estimate har renderda yangi
    }, [state.channels, state.regions, state.goal, state.days]);

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

    const isReview = step === 2;

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
                    onBack={() => goToStep(1)}
                    onLaunch={handleLaunch}
                    isLaunching={isCreating}
                />
            ) : (
                <div className={styles.builder}>
                    <div className={styles.column}>
                        {step === 0 ? (
                            <CreativeStep state={state} onChange={handleChange} />
                        ) : (
                            <TargetingStep
                                channels={channels}
                                regions={regions}
                                pricing={pricing}
                                isLoading={isInventoryLoading}
                                state={state}
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    <CampaignSummary
                        {...summary}
                        isEstimating={isEstimating}
                        nextLabel={step === 1 ? t('go_to_review') : t('next')}
                        onNext={() => goToStep(step + 1)}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignBuilderPage;
