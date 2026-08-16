import { ChannelKey } from '~services/campaigns/type';
import { UploadedCreative } from '~services/creatives/type';

/** Sehrgar bo'ylab tashiladigan holat */
export type WizardState = {
    name: string;
    /** Yuklangan fayl — kampaniya yaratilgach unga biriktiriladi */
    creative?: UploadedCreative;
    channels: ChannelKey[];
    /** Hudud id'lari (services/inventory) */
    regions: string[];
    goal: number;
    days: number;
};

export const WIZARD_STEPS = ['step_creative', 'step_targeting', 'step_review'] as const;
