import { Skeleton } from 'antd';
import { BranchGroup, PriceBasis } from '~constants/enums';
import useLanguage from '~hooks/useLanguage';
import { CampaignLineType, LinesEstimateType } from '~services/campaigns/type';
import { cn } from '~utils/cn';
import { formatNumber, formatSum } from '~utils/helpers';
import styles from './EstimateBreakdown.module.css';

interface EstimateBreakdownProps {
    estimate?: LinesEstimateType;
    isLoading?: boolean;
    /** Ishga tushirilgan — summalar muzlatilgan */
    frozen?: boolean;
}

/** Qatorlar bo'yicha narx hisobi: har bir o'rin, belgilangan to'lovlar, chegirma, posilka prognozi, jami. */
const EstimateBreakdown = ({ estimate, isLoading, frozen }: EstimateBreakdownProps) => {
    const { t } = useLanguage();

    if (isLoading && !estimate) return <Skeleton active paragraph={{ rows: 4 }} />;
    if (!estimate) return <div className={styles.note}>{t('no_data')}</div>;

    const lineSub = (line: CampaignLineType) => {
        const unit = t(`unit_${line.priceBasis}`);
        const group =
            line.branchGroupId !== null
                ? ` · ${t(`branch_group_${BranchGroup[line.branchGroupId]}`)}`
                : '';
        const surcharge = line.surcharge > 0 ? ` + ${formatNumber(line.surcharge)}` : '';
        return `${formatNumber(line.quantity)} ${unit} × ${formatNumber(line.unitPrice)}${surcharge} ${t('currency')}${group}`;
    };

    const hasParcel = estimate.lines.some(
        line => line.priceBasis === PriceBasis[PriceBasis.PER_PARCEL_WEIGHT],
    );

    return (
        <div>
            {estimate.lines.map(line => (
                <div className={styles.row} key={`${line.placementId}-${line.branchGroupId}`}>
                    <span className={styles.key}>
                        {t(`placement_${line.placement}`)}
                        <span className={styles.sub}>{lineSub(line)}</span>
                    </span>
                    <span className={cn(styles.value, line.unpriced && styles.unpriced, 'tnum')}>
                        {line.unpriced ? t('unpriced') : formatSum(line.amount)}
                    </span>
                </div>
            ))}

            <div className={styles.row}>
                <span className={styles.key}>{t('flat_total')}</span>
                <span className={`${styles.value} tnum`}>{formatSum(estimate.flatTotal)}</span>
            </div>
            {estimate.discountPercent > 0 && (
                <div className={styles.row}>
                    <span className={styles.key}>
                        {t('discount')} {estimate.discountPercent}%
                    </span>
                    <span className={`${styles.value} tnum`}>−{formatSum(estimate.discount)}</span>
                </div>
            )}
            {hasParcel && (
                <div className={styles.row}>
                    <span className={styles.key}>{t('parcel_estimate')}</span>
                    <span className={`${styles.value} tnum`}>
                        {formatSum(estimate.parcelEstimate)}
                    </span>
                </div>
            )}
            <div className={cn(styles.row, styles.total)}>
                <span>{t('total')}</span>
                <span className='tnum'>{formatSum(estimate.total)}</span>
            </div>

            <div className={styles.note}>
                {t(frozen ? 'estimate_frozen_note' : 'estimate_live_note')}
            </div>
        </div>
    );
};

export default EstimateBreakdown;
