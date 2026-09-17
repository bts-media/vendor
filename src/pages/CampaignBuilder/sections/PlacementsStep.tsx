import { Card, EstimateBreakdown, PlacementsEditor, SectionTitle } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { channelIdOf } from '~services/campaigns';
import { LinesEstimateType } from '~services/campaigns/type';
import { WizardState } from '../types';

interface PlacementsStepProps {
    state: WizardState;
    estimate?: LinesEstimateType;
    isEstimating: boolean;
    onChange: (patch: Partial<WizardState>) => void;
}

/** 3-qadam: o'rinlar, miqdorlar, paket — va backend hisoblagan qatorlar narxi. */
const PlacementsStep = ({ state, estimate, isEstimating, onChange }: PlacementsStepProps) => {
    const { t } = useLanguage();

    return (
        <>
            <Card padded>
                <SectionTitle title={t('placements_title')} sub={t('placements_sub')} />
                <PlacementsEditor
                    channelId={channelIdOf(state.channels)}
                    impressionGoal={state.goal}
                    placements={state.placements}
                    packageTierId={state.packageTierId}
                    onChange={onChange}
                />
            </Card>

            <Card padded>
                <SectionTitle title={t('est_total')} />
                <EstimateBreakdown estimate={estimate} isLoading={isEstimating} />
            </Card>
        </>
    );
};

export default PlacementsStep;
