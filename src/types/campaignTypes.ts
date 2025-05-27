export interface Campaign {
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

export interface CreateCampaignRequest {
  name: string;
  keywords: string[];
  status: boolean;
  town: string;
  radius: number;
  bidAmount: number;
  campaignFund: number;
  dateCreated: string;
}

export interface UpdateCampaignRequest {
  name?: string;
  keywords?: string[];
  status?: boolean;
  town?: string;
  radius?: number;
  bidAmount?: number;
  campaignFund?: number;
  dateCreated?: string;
}



export interface IAccount {
    balance: number;
}

export interface ISettings {
    minimumBidAmount: number;
}

export interface ITown {
    name: string;
}