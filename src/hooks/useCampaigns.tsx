import { useState, useEffect, useCallback } from 'react';
import { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from '../types/campaignTypes';
import * as campaignStore from '../stores/campaignStore';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await campaignStore.getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCampaign = useCallback(async (campaignData: CreateCampaignRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newCampaign = await campaignStore.createCampaign(campaignData);
      setCampaigns(prev => [...prev, newCampaign]);
      return newCampaign;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCampaign = useCallback(async (id: number, updates: UpdateCampaignRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCampaign = await campaignStore.updateCampaign(id, updates);
      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === id ? updatedCampaign : campaign
        )
      );
      return updatedCampaign;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCampaign = useCallback(async (id: number) => {
    setError(null);
    try {
      await campaignStore.deleteCampaign(id);
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete campaign');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns
  };
};