// In-memory fake API store for simulating reading of settings and static data

import { ISettings, ITown } from "../types/campaignTypes";
import mockData from "../utilities/mockData";

const delay = (ms: number = 75) => new Promise(resolve => setTimeout(resolve, ms));

export const getMinimumBidAmount = async (): Promise<number> => {
    await delay();
    return mockData.settings.minimumBidAmount;
};

export const getSettings = async (): Promise<ISettings> => {
    await delay();
    return { ...mockData.settings };
};

export const getAvailableTowns = async (): Promise<ITown[]> => {
    await delay();
    return [...mockData.availableTowns];
};

export const getAvailableKeywords = async (): Promise<string[]> => {
    await delay();
    return [...mockData.availableKeywords];
};