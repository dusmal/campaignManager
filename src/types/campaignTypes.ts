export interface ICampaign {
    id: number;
    name: string;
    keywords: string[];
    status: boolean;
    town: string;
    radius: number;
    bidAmount: number;
    campaignFund: number;
    dateCreated: string;
}

export interface IAccount {
    balance: number;
}
