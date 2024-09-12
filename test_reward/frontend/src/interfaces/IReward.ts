export interface RewardInterface {
    ID: number;
    imageUrl: string;
    RewardName?: string;
    Discount?:   number;
    Reward?:  string;
    Ticket?:  string;
    Status?:     boolean;
    Points?:    number;
    Reward_time?: Date;
    Describtion?: string;

    member_id?: number;

    
}