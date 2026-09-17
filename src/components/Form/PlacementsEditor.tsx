import { Button, InputNumber, Select } from 'antd';
import { Plus, Trash2 } from 'lucide-react';
import SelectableCard from '~components/ui/SelectableCard';
import {
    BranchGroup,
    Channel,
    PACKAGE_DEFS,
    PLACEMENT_DEFS,
    PackageTier,
    Placement,
    PriceBasis,
} from '~constants/enums';
import useLanguage from '~hooks/useLanguage';
import {
    allowedPlacements,
    isPackageAllowed,
    isParcelPlacement,
    needsBranchGroup,
} from '~services/campaigns/placements';
import { PlacementInput } from '~services/campaigns/type';
import { formatNumber } from '~utils/helpers';
import styles from './PlacementsEditor.module.css';

const TIERS = [PackageTier.ECONOM, PackageTier.OPTIMUM, PackageTier.PREMIUM];
const BRANCH_GROUPS = [BranchGroup.TASHKENT, BranchGroup.OBLAST, BranchGroup.REGION];

interface PlacementsEditorProps {
    channelId: number;
    impressionGoal: number;
    placements: PlacementInput[];
    packageTierId?: number;
    onChange: (patch: { placements?: PlacementInput[]; packageTierId?: number }) => void;
    disabled?: boolean;
}

/**
 * Buyurtma qatorlari va paket tanlovi — sehrgarda ham, tafsilot sahifasida ham bitta.
 * Qoidalar `services/campaigns/placements.ts` da; bu yerda faqat ko'rsatish va kiritish.
 */
const PlacementsEditor = ({
    channelId,
    impressionGoal,
    placements,
    packageTierId,
    onChange,
    disabled,
}: PlacementsEditorProps) => {
    const { t } = useLanguage();

    const allowed = allowedPlacements(channelId);
    const used = placements.map(line => line.placementId);
    const unused = allowed.filter(id => !used.includes(id));

    /** Stiker (PARCEL/BOTH) va televizor (SCREEN/BOTH) qatori majburiy — olib tashlanmaydi */
    const isRequired = (id: Placement) =>
        (isParcelPlacement(id) && channelId !== Channel.NONE) || id === Placement.SCREEN_TV;

    /** Posilka qatori faqat stiker ↔ quti orasida almashadi; televizor qatori almashmaydi */
    const optionsFor = (id: Placement): Placement[] => {
        if (isParcelPlacement(id)) return allowed.filter(isParcelPlacement);
        if (id === Placement.SCREEN_TV) return [id];
        return [id, ...unused.filter(option => !isRequired(option))];
    };

    const updateLine = (index: number, patch: Partial<PlacementInput>) =>
        onChange({
            placements: placements.map((line, i) => (i === index ? { ...line, ...patch } : line)),
        });

    const changePlacement = (index: number, placementId: Placement) =>
        updateLine(index, {
            placementId,
            quantity: isParcelPlacement(placementId) ? impressionGoal : placements[index].quantity,
            branchGroupId: needsBranchGroup(placementId) ? BranchGroup.REGION : undefined,
        });

    const addLine = () => {
        const placementId = unused.find(option => !isRequired(option));
        if (placementId === undefined) return;
        onChange({
            placements: [
                ...placements,
                {
                    placementId,
                    quantity: 1,
                    branchGroupId: needsBranchGroup(placementId) ? BranchGroup.REGION : undefined,
                },
            ],
        });
    };

    const removeLine = (index: number) =>
        onChange({ placements: placements.filter((_, i) => i !== index) });

    const placementLabel = (id: Placement) => t(`placement_${Placement[id]}`);

    return (
        <div>
            <div className={styles.packageGrid}>
                <SelectableCard
                    name={t('package_none')}
                    selected={packageTierId === undefined}
                    disabled={disabled}
                    onToggle={() => onChange({ packageTierId: undefined })}
                />
                {TIERS.map(tier => {
                    const def = PACKAGE_DEFS[tier];
                    const allowedTier = isPackageAllowed(tier, channelId);
                    return (
                        <SelectableCard
                            key={tier}
                            name={t(`package_${PackageTier[tier]}`)}
                            desc={`${def.discountPercent}% ${t('discount').toLowerCase()}`}
                            selected={packageTierId === tier}
                            disabled={disabled || !allowedTier}
                            soonLabel={allowedTier ? undefined : t('package_needs_screen')}
                            meta={
                                <span className={styles.included}>
                                    {t('package_includes')}:{' '}
                                    {def.placements.map(placementLabel).join(', ')}
                                </span>
                            }
                            onToggle={() => onChange({ packageTierId: tier })}
                        />
                    );
                })}
            </div>

            <div className={styles.lines}>
                {placements.map((line, index) => {
                    const id = line.placementId as Placement;
                    const parcel = isParcelPlacement(id);
                    return (
                        <div className={styles.line} key={`${id}-${index}`}>
                            <Select
                                value={id}
                                disabled={disabled || optionsFor(id).length < 2}
                                onChange={value => changePlacement(index, value)}
                                options={optionsFor(id).map(option => ({
                                    value: option,
                                    label: placementLabel(option),
                                }))}
                            />
                            {parcel ? (
                                <InputNumber
                                    value={impressionGoal}
                                    readOnly
                                    disabled
                                    style={{ width: '100%' }}
                                    formatter={value => formatNumber(value)}
                                />
                            ) : (
                                <InputNumber
                                    min={1}
                                    value={line.quantity}
                                    disabled={disabled}
                                    style={{ width: '100%' }}
                                    addonAfter={t(`unit_${PriceBasis[PLACEMENT_DEFS[id].priceBasis]}`)}
                                    onChange={value =>
                                        updateLine(index, { quantity: Math.max(1, Number(value) || 1) })
                                    }
                                />
                            )}
                            {parcel ? (
                                <span className={styles.included}>{t('parcel_qty_note')}</span>
                            ) : needsBranchGroup(id) ? (
                                <Select
                                    value={line.branchGroupId ?? BranchGroup.REGION}
                                    disabled={disabled}
                                    onChange={value => updateLine(index, { branchGroupId: value })}
                                    options={BRANCH_GROUPS.map(group => ({
                                        value: group,
                                        label: t(`branch_group_${BranchGroup[group]}`),
                                    }))}
                                />
                            ) : (
                                <span />
                            )}
                            <Button
                                type='text'
                                icon={<Trash2 size={16} />}
                                disabled={disabled || isRequired(id)}
                                onClick={() => removeLine(index)}
                                aria-label={t('remove')}
                            />
                        </div>
                    );
                })}
            </div>

            <Button
                style={{ marginTop: 12 }}
                icon={<Plus size={16} />}
                disabled={disabled || !unused.length}
                onClick={addLine}
            >
                {t('add_placement')}
            </Button>

            <div className={styles.note}>{t('package_note')}</div>
        </div>
    );
};

export default PlacementsEditor;
