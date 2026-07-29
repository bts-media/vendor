export type ItemStatus = 'draft' | 'moderation' | 'active' | 'inactive';

export type ItemType = {
    id: string;
    name: string;
    description?: string;
    status: ItemStatus;
    price?: number;
    order: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateItemBody = {
    name: string;
    description?: string;
    status: ItemStatus;
    price?: number;
    order: number;
};

export type UpdateItemBody = Partial<CreateItemBody>;
