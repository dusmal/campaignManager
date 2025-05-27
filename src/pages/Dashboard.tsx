import React, { useState, useEffect } from 'react';
import { Campaign, CreateCampaignRequest } from '../types/campaignTypes';
import Header from '../components/layout/Header';
import CampaignList from '../components/campaign/CampaignList';
import { useAccount } from '../hooks/useAccount';
import { useCampaigns } from '../hooks/useCampaigns';
import { useModal } from '../hooks/useModal';
import CampaignModalContainer from '../components/campaign/CampaignModalContainer';
import AddNewButton from '../components/ui/AddNewButton';

const Dashboard = () => {
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
  const {
    campaigns,
    loading: campaignsLoading,
    error: campaignsError,
    createCampaign,
    updateCampaign,
    deleteCampaign
  } = useCampaigns();

  const {
    balance,
    updateBalance
  } = useAccount();

  const handleCreateCampaign = async (campaignData: CreateCampaignRequest) => {
    await createCampaign(campaignData);

    // Deduct campaign fund from balance
    await updateBalance(-campaignData.campaignFund);
  };

  const handleUpdateCampaign = async (updatedCampaign: Campaign) => {
    const oldCampaign = campaigns.find(c => c.id === updatedCampaign.id);
    if (!oldCampaign) return;

    await updateCampaign(updatedCampaign.id, updatedCampaign);

    // Adjust balance based on fund difference
    const fundDiff = updatedCampaign.campaignFund - oldCampaign.campaignFund;
    await updateBalance(-fundDiff);
  };

  const handleDeleteCampaign = async (campaign: Campaign) => {

    await deleteCampaign(campaign.id);

    // Return campaign fund to balance
    await updateBalance(campaign.campaignFund);
  };

  const handleModalSubmit = async (campaignData: Campaign) => {
    if (campaignToEdit) {
      await handleUpdateCampaign(campaignData);
    } else {
      await handleCreateCampaign(campaignData);
    }
    closeModal();
    setCampaignToEdit(null);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setCampaignToEdit(campaign);
    openModal();
  };

  const handleModalClose = () => {
    closeModal();
    setCampaignToEdit(null);
  };

  return (
    <div className="dashboard">
      <div className="wrapper">
        <Header balance={balance} />
        <div className="campaign-wrapper">
          <AddNewButton onClick={openModal} />
          <CampaignList
            campaigns={campaigns}
            loading={campaignsLoading}
            error={campaignsError}
            onEdit={handleEditCampaign}
            onDelete={handleDeleteCampaign}
          />
        </div>
      </div>

      <CampaignModalContainer
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialValues={campaignToEdit}
      />
    </div>
  );
};

export default Dashboard;