import React, { useState, useEffect } from 'react';
import { ICampaign } from '../types/campaignTypes';
import { campaignService } from '../services/campaignClient';
import { useCampaign } from '../hooks/useCampaign';
import { useAccount } from '../hooks/useAccount';
import Header from '../components/layout/Header';


const Dashboard = () => {
    const campaignData = useCampaign();
    const accountData = useAccount();

    return (
        <div className="dashboard">
            <div className="wrapper">
                <Header />
                {/* <div className="campaign-list">
                    <h2>Campaigns</h2>
                    <p>{accountData.balance}</p>
                    {campaignData.campaigns.length === 0 ? (
                        <p>No campaigns found.</p>
                    ) : (
                        <ul>
                            {campaignData.campaigns.map((campaign) => (
                                <li key={campaign.id}>
                                    <h3>{campaign.name}</h3>
                                </li>
                            ))}
                        </ul>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
