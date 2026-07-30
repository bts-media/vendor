import { Input, Skeleton } from 'antd';
import { Upload } from 'lucide-react';
import { Card, SectionTitle, SelectableCard } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { CreativeType } from '~services/creatives/type';
import styles from '../CampaignBuilder.module.css';
import { WizardState } from '../types';

interface CreativeStepProps {
    creatives: CreativeType[];
    isLoading: boolean;
    state: WizardState;
    onChange: (patch: Partial<WizardState>) => void;
}

const CreativeStep = ({ creatives, isLoading, state, onChange }: CreativeStepProps) => {
    const { t } = useLanguage();

    return (
        <>
            <Card padded>
                <SectionTitle title={t('creative_step_title')} sub={t('creative_step_sub')} />

                {isLoading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                    <div className={styles.creativeGrid}>
                        {creatives.map(creative => (
                            <SelectableCard
                                key={creative.id}
                                name={creative.name}
                                desc={
                                    creative.kind === 'parcel'
                                        ? t('creative_type_parcel')
                                        : t('creative_type_screen')
                                }
                                selected={state.creativeId === creative.id}
                                onToggle={() => onChange({ creativeId: creative.id })}
                                media={
                                    <div
                                        className={styles.creativeThumb}
                                        style={{ background: creative.brandColor }}
                                    >
                                        {creative.badge}
                                    </div>
                                }
                            />
                        ))}
                    </div>
                )}

                <div className={styles.uploadBox} style={{ marginTop: 12 }}>
                    <Upload size={18} />
                    <div>
                        <div>{t('creative_upload')}</div>
                        <div className={styles.hint} style={{ marginTop: 2 }}>
                            {t('creative_upload_hint')}
                        </div>
                    </div>
                </div>

                <div className={styles.hint}>{t('creative_moderation_note')}</div>
            </Card>

            <Card padded>
                <SectionTitle title={t('campaign_name')} />
                <Input
                    value={state.name}
                    onChange={event => onChange({ name: event.target.value })}
                    placeholder={t('campaign_name')}
                    maxLength={60}
                />
            </Card>
        </>
    );
};

export default CreativeStep;
