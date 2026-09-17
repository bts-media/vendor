import {
    BranchGroup,
    Channel,
    PACKAGE_DEFS,
    PLACEMENT_DEFS,
    PackageTier,
    Placement,
    PriceBasis,
} from '~constants/enums';
import { PlacementInput } from './type';

/** Backend qoidalari (`resolveCampaignPlacements`) — klientda ham shu tartib saqlanadi. */

export const isParcelPlacement = (id: Placement) =>
    PLACEMENT_DEFS[id].priceBasis === PriceBasis.PER_PARCEL_WEIGHT;

export const needsBranchGroup = (id: Placement) =>
    PLACEMENT_DEFS[id].priceBasis === PriceBasis.PER_BRANCH_MONTH;

const hasParcel = (channelId: number) =>
    channelId === Channel.PARCEL || channelId === Channel.BOTH;
const hasScreen = (channelId: number) =>
    channelId === Channel.SCREEN || channelId === Channel.BOTH;

/** Kanalga qarab tanlash mumkin bo'lgan o'rinlar: posilka — PARCEL/BOTH, televizor — SCREEN/BOTH. */
export const allowedPlacements = (channelId: number): Placement[] =>
    (Object.keys(PLACEMENT_DEFS).map(Number) as Placement[]).filter(id => {
        const channel = PLACEMENT_DEFS[id].channel;
        if (channel === Channel.PARCEL) return hasParcel(channelId);
        if (channel === Channel.SCREEN) return hasScreen(channelId);
        return true;
    });

/**
 * Kanal yoki maqsad o'zgarganda qatorlarni backend kutgan holatga keltiradi:
 * ruxsat etilmagan o'rinlar olib tashlanadi, majburiy qatorlar (stiker / televizor)
 * qo'shiladi, posilka qatorining soni doim ko'rsatishlar maqsadiga teng.
 */
export const normalizePlacements = (
    channelId: number,
    placements: PlacementInput[],
    impressionGoal: number,
): PlacementInput[] => {
    const allowed = allowedPlacements(channelId);
    const next = placements.filter(line => allowed.includes(line.placementId));

    if (hasParcel(channelId) && !next.some(line => isParcelPlacement(line.placementId))) {
        next.unshift({ placementId: Placement.PARCEL_STICKER, quantity: 1 });
    }
    if (hasScreen(channelId) && !next.some(line => line.placementId === Placement.SCREEN_TV)) {
        next.push({
            placementId: Placement.SCREEN_TV,
            quantity: 1,
            branchGroupId: BranchGroup.REGION,
        });
    }

    return next.map(line => {
        if (isParcelPlacement(line.placementId)) {
            return { placementId: line.placementId, quantity: Math.max(1, impressionGoal) };
        }
        if (needsBranchGroup(line.placementId)) {
            return { ...line, branchGroupId: line.branchGroupId ?? BranchGroup.REGION };
        }
        return { placementId: line.placementId, quantity: line.quantity };
    });
};

/** Paketga kiradigan, lekin hali qo'shilmagan o'rinlar — backend ularni o'zi 1 dona qo'shadi. */
export const packageMissingPlacements = (
    tier: PackageTier | undefined,
    placements: PlacementInput[],
): Placement[] =>
    tier
        ? PACKAGE_DEFS[tier].placements.filter(
              id => !placements.some(line => line.placementId === id),
          )
        : [];

/** Televizorli paket (Optimum, Premium) faqat ekran kanali bor kampaniyaga mos. */
export const isPackageAllowed = (tier: PackageTier, channelId: number) =>
    !PACKAGE_DEFS[tier].placements.includes(Placement.SCREEN_TV) || hasScreen(channelId);
