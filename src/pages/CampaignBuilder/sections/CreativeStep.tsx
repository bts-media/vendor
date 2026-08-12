import { Button, Input, Upload } from 'antd';
import { Trash2, UploadCloud } from 'lucide-react';
import { Card, SectionTitle } from '~components/index';
import useLanguage from '~hooks/useLanguage';
import { useUploadCreativeFile } from '~services/creatives';
import styles from '../CampaignBuilder.module.css';
import { WizardState } from '../types';

interface CreativeStepProps {
    state: WizardState;
    onChange: (patch: Partial<WizardState>) => void;
}

/**
 * 1-qadam: kreativ fayli va kampaniya nomi.
 *
 * Mavjud kreativlar ro'yxati bu yerda YO'Q va bo'lishi ham mumkin emas: har bir
 * kreativ o'z kampaniyasiga tegishli (`CreateCreativeDto.campaignId` majburiy) va
 * boshqasiga ko'chirilmaydi. Shuning uchun yangi kampaniya har doim yangi fayldan
 * boshlanadi.
 */
const CreativeStep = ({ state, onChange }: CreativeStepProps) => {
    const { t } = useLanguage();
    const { uploadFile, isUploading } = useUploadCreativeFile();

    const handleUpload = async (file: File) => {
        const uploaded = await uploadFile(file);
        if (!uploaded) return;

        onChange({
            creative: uploaded,
            // Nom bo'sh bo'lsa fayl nomidan taklif qilamiz
            name: state.name || uploaded.name,
        });
    };

    return (
        <>
            <Card padded>
                <SectionTitle title={t('creative_step_title')} sub={t('creative_step_sub')} />

                {state.creative ? (
                    <div className={styles.uploadedCreative}>
                        <img
                            className={styles.creativeThumb}
                            src={state.creative.fileUrl}
                            alt={state.creative.name}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className={styles.uploadedName}>{state.creative.name}</div>
                            <div className={styles.hint}>
                                {state.creative.widthPx}×{state.creative.heightPx}
                            </div>
                        </div>
                        <Button
                            type='text'
                            icon={<Trash2 size={16} />}
                            onClick={() => onChange({ creative: undefined })}
                            aria-label={t('remove')}
                        />
                    </div>
                ) : (
                    <Upload.Dragger
                        multiple={false}
                        showUploadList={false}
                        disabled={isUploading}
                        accept='image/png,image/jpeg'
                        beforeUpload={file => {
                            // `false` — antd o'zi yubormaydi, yuklashni service qatlami bajaradi
                            void handleUpload(file as unknown as File);
                            return false;
                        }}
                        className={styles.uploadBox}
                    >
                        <UploadCloud size={20} />
                        <div>
                            <div>{isUploading ? t('uploading') : t('creative_upload')}</div>
                            <div className={styles.hint} style={{ marginTop: 2 }}>
                                {t('creative_upload_hint')}
                            </div>
                        </div>
                    </Upload.Dragger>
                )}

                <div className={styles.hint} style={{ marginTop: 12 }}>
                    {t('creative_moderation_note')}
                </div>
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
