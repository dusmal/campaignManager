import React, { useState } from 'react';
import { Campaign } from '../../types/campaignTypes';

interface ICampaignListProps {
    campaigns: Campaign[];
    loading: boolean;
    error: string | null;
    onEdit: (campaign: Campaign) => void;
    onDelete: (campaign: Campaign) => void;
}

const CampaignList = ({ campaigns, loading, error, onEdit, onDelete }: ICampaignListProps) => {
    if (loading) return <div className="campaign-list__loading">Loading campaigns...</div>;
    if (error) return <div className="campaign-list__error">{error}</div>;

    return (
        <section className="campaign-list">
            <div className="campaign-list__table-container">
                <table className="campaign-list__table">
                    <thead>
                        <tr>
                            <th scope="col">Campaign</th>
                            <th scope="col">Campaign Fund</th>
                            <th scope="col">Status</th>
                            <th scope="col">Location</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="campaign-list__empty">No campaigns found</td>
                            </tr>
                        ) : (
                            campaigns.map(campaign => (
                                <tr key={campaign.id}>
                                    <td>{campaign.name}</td>
                                    <td>${campaign.campaignFund.toFixed(2)}</td>
                                    <td>
                                        <span className={`campaign-list__status campaign-list__status--${campaign.status ? 'active' : 'inactive'}`}>
                                            {campaign.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{campaign.town}</td>
                                    <td>
                                        <div className="campaign-list__actions">
                                            <button
                                                className="campaign-list__action-btn campaign-list__action-btn--edit"
                                                onClick={() => onEdit(campaign)}
                                                aria-label={`Edit ${campaign.name}`}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="campaign-list__action-btn campaign-list__action-btn--delete"
                                                onClick={() => onDelete(campaign)}
                                                aria-label={`Delete ${campaign.name}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CampaignList;
