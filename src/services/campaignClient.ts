import { ICampaign, IAccount } from "../types/campaignTypes";
import mockData from "../utilities/mockData";

const mockCampaigns: ICampaign[] = mockData.campaigns;

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));
let nextId = mockCampaigns.length > 0
    ? Math.max(...mockCampaigns.map(campaign => campaign.id)) + 1
    : 1;

export const campaignService = {
    async getAll(): Promise<ICampaign[]> {
        await delay();
        return [...mockCampaigns];
    },

    async createCampaign(request: any): Promise<ICampaign> {
        await delay();
        const newCampaign: ICampaign = { ...request, id: nextId++ };
        mockCampaigns.push(newCampaign);
        return newCampaign;
    },
};

