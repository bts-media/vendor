import { ChannelKey } from '~services/campaigns/type';

/** Sehrgar bo'ylab tashiladigan holat */
export type WizardState = {
    name: string;
    creativeId: string;
    channels: ChannelKey[];
    /** Hudud id'lari (services/inventory) */
    regions: string[];
    goal: number;
    days: number;
};

export const WIZARD_STEPS = ['step_creative', 'step_targeting', 'step_review'] as const;
