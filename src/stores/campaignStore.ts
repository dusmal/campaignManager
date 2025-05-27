// In-memory fake API store for simulating campaign operations

import { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from "../types/campaignTypes";
import mockData from "../utilities/mockData";

let campaignStore: Campaign[] = [...mockData.campaigns];
let nextId = Math.max(...campaignStore.map(c => c.id), 0) + 1;

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllCampaigns = async (): Promise<Campaign[]> => {
  await delay();
  return [...campaignStore];
};

export const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
  await delay();
  return campaignStore.find(campaign => campaign.id === id);
};

export const createCampaign = async (campaignData: CreateCampaignRequest): Promise<Campaign> => {
  await delay();

  const newCampaign: Campaign = {
    ...campaignData,
    id: nextId++
  };

  campaignStore.push(newCampaign);
  return newCampaign;
};

export const updateCampaign = async (id: number, updates: UpdateCampaignRequest): Promise<Campaign> => {
  await delay();

  const index = campaignStore.findIndex(campaign => campaign.id === id);
  if (index === -1) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  campaignStore[index] = { ...campaignStore[index], ...updates };
  return campaignStore[index];
};

export const deleteCampaign = async (id: number): Promise<void> => {
  await delay();

  const index = campaignStore.findIndex(campaign => campaign.id === id);
  if (index === -1) {
    throw new Error(`Campaign with id ${id} not found`);
  }

  campaignStore.splice(index, 1);
};