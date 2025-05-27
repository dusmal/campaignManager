import React, { useState, useEffect } from 'react';
import CampaignModal from './CampaignModal';
import { getAvailableKeywords, getAvailableTowns, getSettings } from '../../stores/settingsStore';
import { Campaign } from '../../types/campaignTypes';

interface CampaignModalContainerProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (campaignData: Campaign) => Promise<void>;
    initialValues?: Campaign | null;
}

const CampaignModalContainer = ({
    isOpen,
    onClose,
    onSubmit,
    initialValues
}: CampaignModalContainerProps) => {
    const [availableTowns, setAvailableTowns] = useState<{ name: string }[]>([]);
    const [availableKeywords, setAvailableKeywords] = useState<string[]>([]);
    const [minimumBidAmount, setMinimumBidAmount] = useState<number>(0.5);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const towns = await getAvailableTowns();
                    const keywords = await getAvailableKeywords();
                    const settings = await getSettings();

                    setAvailableTowns(towns);
                    setAvailableKeywords(keywords);
                    setMinimumBidAmount(settings.minimumBidAmount);
                } catch (error) {
                    console.error('Error fetching settings:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className="loading-backdrop">
                <div className="loading-indicator">
                    <div className="loading-indicator__spinner"></div>
                    <div className="loading-indicator__text">Loading campaign data...</div>
                </div>
            </div>
        );
    }

    return (
        <CampaignModal
            onClose={onClose}
            onSubmit={onSubmit}
            availableTowns={availableTowns}
            availableKeywords={availableKeywords}
            minimumBidAmount={minimumBidAmount}
            initialValues={initialValues}
        />
    );
};

export default CampaignModalContainer;