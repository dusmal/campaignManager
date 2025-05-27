import React, { useState, useEffect } from 'react';
import { settingsService } from '../../stores/settingsStore';
import CampaignModal from '../campaign/CampaignModal';
import { Campaign } from '../../types/campaignTypes';

interface AddNewButtonProps {
    onCreateCampaign: (campaignData: Campaign) => Promise<void>;
    onUpdateCampaign?: (campaignData: Campaign) => Promise<void>;
    campaignToEdit?: Campaign | null;
    clearEditCampaign?: () => void;
}

const AddNewButton: React.FC<AddNewButtonProps> = ({
    onCreateCampaign,
    onUpdateCampaign,
    campaignToEdit,
    clearEditCampaign
}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [availableTowns, setAvailableTowns] = useState<{ name: string }[]>([]);
    const [availableKeywords, setAvailableKeywords] = useState<string[]>([]);
    const [minimumBidAmount, setMinimumBidAmount] = useState<number>(0.5);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (campaignToEdit) {
            setIsModalOpen(true);
        }
    }, [campaignToEdit]);

    useEffect(() => {
        if (isModalOpen) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [towns, keywords, settings] = await Promise.all([
                        settingsService.getAvailableTowns(),
                        settingsService.getAvailableKeywords(),
                        settingsService.getSettings()
                    ]);
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
    }, [isModalOpen]);

    const closeModal = (): void => {
        setIsModalOpen(false);
        clearEditCampaign?.();
    };

    const handleSubmit = async (campaignData: Campaign) => {
        if (campaignToEdit && onUpdateCampaign) {
            await onUpdateCampaign(campaignData);
        } else {
            await onCreateCampaign(campaignData);
        }
        closeModal();
    };

    return (
        <>
            <button className="add-new-button" onClick={() => setIsModalOpen(true)}>
                ＋add new
            </button>

            {(isModalOpen) && (
                loading ? (
                    <div className="loading-indicator">Loading...</div>
                ) : (
                    <CampaignModal
                        onClose={closeModal}
                        onSubmit={handleSubmit}
                        availableTowns={availableTowns}
                        availableKeywords={availableKeywords}
                        minimumBidAmount={minimumBidAmount}
                        initialValues={campaignToEdit}
                    />
                )
            )}
        </>
    );
};

export default AddNewButton;
