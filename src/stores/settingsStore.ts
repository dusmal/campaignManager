import { ISettings, ITown } from "../types/campaignTypes";
import mockData from "../utilities/mockData";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const settingsService = {
    async getMinimumBidAmount(): Promise<number> {
        await delay();
        return mockData.settings.minimumBidAmount;
    },

    async getSettings(): Promise<ISettings> {
        await delay();
        return { ...mockData.settings };
    },

    async getAvailableTowns(): Promise<ITown[]> {
        await delay();
        return [...mockData.availableTowns];
    },

    async getAvailableKeywords(): Promise<string[]> {
        await delay();
        return [...mockData.availableKeywords];
    }
};