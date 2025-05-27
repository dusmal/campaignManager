import React, { useState, useEffect } from 'react';
import { Campaign, CreateCampaignRequest } from '../types/campaignTypes';
import Header from '../components/layout/Header';
import CampaignList from '../components/campaign/CampaignList';
import AddNewButton from '../components/ui/addNewButton';
import { useAccount } from '../hooks/useAccount';
import { useCampaigns } from '../hooks/useCampaigns';

const Dashboard = () => {
  const [campaignToEdit, setCampaignToEdit] = useState<Campaign | null>(null);

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

  return (
    <div className="dashboard">
      <div className="wrapper">
        <Header balance={balance} />
        <div className="campaign-wrapper">
          <AddNewButton
            onCreateCampaign={handleCreateCampaign}
            onUpdateCampaign={handleUpdateCampaign}
            campaignToEdit={campaignToEdit}
            clearEditCampaign={() => setCampaignToEdit(null)}
          />
          <CampaignList
            campaigns={campaigns}
            loading={campaignsLoading}
            error={campaignsError}
            onEdit={setCampaignToEdit}
            onDelete={handleDeleteCampaign}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
