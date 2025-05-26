import { useState, useEffect } from 'react';
import { campaignService } from '../services/campaignClient'
import { ICampaign } from '../types/campaignTypes';

export const useCampaign = () => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCampaigns = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await campaignService.getAll();
            setCampaigns(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    return {
        campaigns,
        loading,
        error,
    };
};