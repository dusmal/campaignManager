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

export interface IFormValues {
  name: string;
  keywords: string[];
  bidAmount: string;
  campaignFund: string;
  town: string;
  radius: string;
  status: boolean;
}

export interface IFormErrors {
  name: boolean;
  keywords: boolean;
  bidAmount: boolean;
  campaignFund: boolean;
  town: boolean;
  radius: boolean;
}

export interface IFormTouched {
  name: boolean;
  keywords: boolean;
  bidAmount: boolean;
  campaignFund: boolean;
  town: boolean;
  radius: boolean;
}

export interface ICampaignModalProps {
  onClose: () => void;
  onSubmit: (campaignData: any) => void;
  availableTowns: { name: string }[];
  availableKeywords: string[];
  minimumBidAmount: number;
  initialValues?: any;
}

export interface ICampaignListProps {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
}