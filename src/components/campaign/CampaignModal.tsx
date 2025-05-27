import React, { useState, useEffect, FormEvent, MouseEvent, KeyboardEvent } from 'react';

interface FormValues {
    name: string;
    keywords: string[];
    bidAmount: string;
    campaignFund: string;
    town: string;
    radius: string;
    status: boolean;
}

interface CampaignModalProps {
    onClose: () => void;
    onSubmit: (campaignData: any) => void;
    availableTowns: { name: string }[];
    availableKeywords: string[];
    minimumBidAmount: number;
    initialValues?: any;
}

const CampaignModal: React.FC<CampaignModalProps> = ({
    onClose,
    onSubmit,
    availableTowns,
    availableKeywords,
    minimumBidAmount,
    initialValues
}) => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: initialValues?.name || '',
        keywords: initialValues?.keywords || [],
        bidAmount: initialValues?.bidAmount?.toString() || '',
        campaignFund: initialValues?.campaignFund?.toString() || '',
        town: initialValues?.town || '',
        radius: initialValues?.radius?.toString() || '',
        status: initialValues?.status !== undefined ? initialValues.status : true
    });

    const [keywordInput, setKeywordInput] = useState<string>('');
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const handleEscapeKey = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey as unknown as EventListener);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscapeKey as unknown as EventListener);
        };
    }, [onClose]);

    const handleModalContentClick = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { id, value, type } = e.target;
        const fieldName = id.replace('campaign-form__', '');

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFormValues({
                ...formValues,
                [fieldName]: checkbox.checked
            });
        } else {
            setFormValues({
                ...formValues,
                [fieldName]: value
            });
        }
    };

    const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setKeywordInput(value);

        if (value.trim()) {
            const filteredSuggestions = availableKeywords.filter(keyword =>
                keyword.toLowerCase().includes(value.toLowerCase())
            );
            setKeywordSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        } else {
            setKeywordSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const addKeyword = (keyword: string): void => {
        if (keyword && !formValues.keywords.includes(keyword)) {
            setFormValues({
                ...formValues,
                keywords: [...formValues.keywords, keyword]
            });
        }
        setKeywordInput('');
        setShowSuggestions(false);
    };

    const removeKeyword = (keyword: string): void => {
        setFormValues({
            ...formValues,
            keywords: formValues.keywords.filter(k => k !== keyword)
        });
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && keywordInput) {
            e.preventDefault();
            addKeyword(keywordInput);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const newCampaign = {
            id: initialValues?.id,
            name: formValues.name,
            keywords: formValues.keywords,
            bidAmount: parseFloat(formValues.bidAmount) || 0,
            campaignFund: parseFloat(formValues.campaignFund) || 0,
            town: formValues.town,
            radius: parseInt(formValues.radius) || 0,
            status: formValues.status,
            dateCreated: initialValues?.dateCreated || new Date().toISOString()
        };

        onSubmit(newCampaign);
    };

    return (
        <div className="campaign-modal__backdrop" onClick={onClose}>
            <div className="campaign-modal__content" onClick={handleModalContentClick}>
                <div className="campaign-modal__header">
                    <h2 className="campaign-modal__title">{initialValues ? 'Edit Campaign' : 'Add New Campaign'}</h2>
                    <button className="campaign-modal__close-button" onClick={onClose} aria-label="Close modal">
                        ✕
                    </button>
                </div>
                <div className="campaign-modal__body">
                    <form className="campaign-form" onSubmit={handleSubmit}>
                        <div className="campaign-form__group">
                            <label className="campaign-form__label" htmlFor="campaign-form__name">Campaign Name</label>
                            <input
                                className="campaign-form__input"
                                type="text"
                                id="campaign-form__name"
                                placeholder="Enter campaign name"
                                value={formValues.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="campaign-form__group">
                            <label className="campaign-form__label" htmlFor="campaign-form__keyword-input">Keywords</label>
                            <div className="campaign-form__keywords-container">
                                <div className="campaign-form__keywords-list">
                                    {formValues.keywords.map((keyword, index) => (
                                        <div key={index} className="campaign-form__keyword-tag">
                                            {keyword}
                                            <button
                                                type="button"
                                                className="campaign-form__keyword-remove"
                                                onClick={() => removeKeyword(keyword)}
                                                aria-label={`Remove keyword ${keyword}`}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="campaign-form__keyword-input-wrapper">
                                    <input
                                        className="campaign-form__input"
                                        type="text"
                                        id="campaign-form__keyword-input"
                                        placeholder="Type keyword and press Enter"
                                        value={keywordInput}
                                        onChange={handleKeywordInputChange}
                                        onKeyDown={handleKeywordKeyDown}
                                    />
                                    {showSuggestions && keywordSuggestions.length > 0 && (
                                        <div className="campaign-form__keyword-suggestions">
                                            {keywordSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="campaign-form__keyword-suggestion"
                                                    onClick={() => addKeyword(suggestion)}
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {formValues.keywords.length === 0 && (
                                <div className="campaign-form__error">At least one keyword is required</div>
                            )}
                        </div>

                        <div className="campaign-form__row">
                            <div className="campaign-form__group">
                                <label className="campaign-form__label" htmlFor="campaign-form__bidAmount">Bid Amount ($)</label>
                                <input
                                    className="campaign-form__input"
                                    type="number"
                                    id="campaign-form__bidAmount"
                                    step="0.01"
                                    min={minimumBidAmount}
                                    placeholder={`Min: $${minimumBidAmount.toFixed(2)}`}
                                    value={formValues.bidAmount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="campaign-form__group">
                                <label className="campaign-form__label" htmlFor="campaign-form__campaignFund">Campaign Fund ($)</label>
                                <input
                                    className="campaign-form__input"
                                    type="number"
                                    id="campaign-form__campaignFund"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={formValues.campaignFund}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="campaign-form__group">
                            <label className="campaign-form__label" htmlFor="campaign-form__town">Town</label>
                            <select
                                className="campaign-form__select"
                                id="campaign-form__town"
                                value={formValues.town}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a town</option>
                                {availableTowns.map((town, index) => (
                                    <option key={index} value={town.name}>{town.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="campaign-form__group">
                            <label className="campaign-form__label" htmlFor="campaign-form__radius">Radius (km)</label>
                            <input
                                className="campaign-form__input"
                                type="number"
                                id="campaign-form__radius"
                                min="1"
                                placeholder="Enter radius"
                                value={formValues.radius}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="campaign-form__group campaign-form__group--checkbox">
                            <input
                                className="campaign-form__checkbox"
                                type="checkbox"
                                id="campaign-form__status"
                                checked={formValues.status}
                                onChange={handleInputChange}
                            />
                            <label className="campaign-form__label campaign-form__label--checkbox" htmlFor="campaign-form__status">
                                Active Campaign
                            </label>
                        </div>

                        <div className="campaign-form__actions">
                            <button type="button" className="campaign-form__button campaign-form__button--secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="campaign-form__button campaign-form__button--primary"
                                disabled={formValues.keywords.length === 0}
                            >
                                {initialValues ? 'Update Campaign' : 'Create Campaign'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CampaignModal;

