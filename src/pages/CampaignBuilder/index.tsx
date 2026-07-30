import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, PageTitle } from '~components/index';
import { useNotify } from '~components/NotificationProvider';
import { DEFAULT_CAMPAIGN_DAYS } from '~constants/data';
import { useHeaderSlot } from '~context/HeaderSlotProvider';
import useLanguage from '~hooks/useLanguage';
import { useCreateCampaign } from '~services/campaigns';
import { useSelectableCreatives } from '~services/creatives';
import { blendedCpm, estimateCost, estimateScans, useInventory } from '~services/inventory';
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
    creativeId: '',
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

    const { creatives, isLoading: isCreativesLoading } = useSelectableCreatives();
    const { channels, regions, pricing, isLoading: isInventoryLoading } = useInventory();
    const { createCampaign, saveDraft, isCreating } = useCreateCampaign();

    const handleChange = (patch: Partial<WizardState>) =>
        setState(prev => {
            const next = { ...prev, ...patch };
            // Kreativ tanlanganda kampaniya nomi bo'sh bo'lsa — kreativdan taklif qilamiz
            if (patch.creativeId && !prev.name) {
                const picked = creatives.find(creative => creative.id === patch.creativeId);
                next.name = picked?.campaignName ?? picked?.name ?? '';
            }
            return next;
        });

    const creative = useMemo(
        () => creatives.find(item => item.id === state.creativeId),
        [creatives, state.creativeId],
    );

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
            estimatedCost: estimateCost(state.goal, cpm),
            cpm,
        };
    }, [state, channels, regions, pricing, creative, t]);

    /** Qadam almashtirishdan oldin joriy qadam to'ldirilganini tekshiramiz */
    const validate = (from: number): boolean => {
        if (from === 0 && !state.creativeId) {
            notify.warning({ type: 'warning', message: t('creative_required') });
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
        creativeId: state.creativeId,
        channels: state.channels,
        regions: state.regions,
        goal: state.goal,
        days: state.days,
    };

    const handleLaunch = () => createCampaign(body, () => navigate('/campaigns'));
    const handleSaveDraft = () => saveDraft(body, () => navigate('/campaigns'));

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
                            <CreativeStep
                                creatives={creatives}
                                isLoading={isCreativesLoading}
                                state={state}
                                onChange={handleChange}
                            />
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
                        nextLabel={step === 1 ? t('go_to_review') : t('next')}
                        onNext={() => goToStep(step + 1)}
                        onSaveDraft={handleSaveDraft}
                        isSaving={isCreating}
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignBuilderPage;
