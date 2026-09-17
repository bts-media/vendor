import { describe, expect, it } from 'vitest';
import { BranchGroup, Channel, PackageTier, Placement } from '~constants/enums';
import {
    allowedPlacements,
    isPackageAllowed,
    normalizePlacements,
    packageMissingPlacements,
} from './placements';

describe('allowedPlacements', () => {
    it('hides parcel placements without the parcel channel and TV without screens', () => {
        expect(allowedPlacements(Channel.SCREEN)).not.toContain(Placement.PARCEL_STICKER);
        expect(allowedPlacements(Channel.SCREEN)).toContain(Placement.SCREEN_TV);
        expect(allowedPlacements(Channel.PARCEL)).not.toContain(Placement.SCREEN_TV);
        expect(allowedPlacements(Channel.NONE)).toHaveLength(9);
        expect(allowedPlacements(Channel.BOTH)).toHaveLength(12);
    });
});

describe('normalizePlacements', () => {
    it('adds the required sticker and TV lines and pins the parcel quantity to the goal', () => {
        const lines = normalizePlacements(Channel.BOTH, [], 50_000);
        expect(lines).toEqual([
            { placementId: Placement.PARCEL_STICKER, quantity: 50_000 },
            { placementId: Placement.SCREEN_TV, quantity: 1, branchGroupId: BranchGroup.REGION },
        ]);
    });

    it('drops lines the channel no longer allows and strips a stray branch group', () => {
        const lines = normalizePlacements(
            Channel.NONE,
            [
                { placementId: Placement.PARCEL_STICKER, quantity: 1 },
                { placementId: Placement.TELEGRAM_POST, quantity: 2, branchGroupId: 1 },
            ],
            0,
        );
        expect(lines).toEqual([{ placementId: Placement.TELEGRAM_POST, quantity: 2 }]);
    });
});

describe('packages', () => {
    it('lists what a package would add and refuses TV packages without screens', () => {
        expect(packageMissingPlacements(PackageTier.ECONOM, [])).toHaveLength(5);
        expect(isPackageAllowed(PackageTier.OPTIMUM, Channel.PARCEL)).toBe(false);
        expect(isPackageAllowed(PackageTier.ECONOM, Channel.PARCEL)).toBe(true);
        expect(isPackageAllowed(PackageTier.PREMIUM, Channel.BOTH)).toBe(true);
    });
});
