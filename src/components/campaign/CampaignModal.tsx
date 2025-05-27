import React, { useState, useEffect, FormEvent, MouseEvent, KeyboardEvent } from 'react';
import { ICampaignModalProps, IFormErrors, IFormTouched, IFormValues } from '../../types/campaignTypes';

const CampaignModal = ({
    onClose,
    onSubmit,
    availableTowns,
    availableKeywords,
    minimumBidAmount,
    initialValues
}: ICampaignModalProps) => {
    const [formValues, setFormValues] = useState<IFormValues>({
        name: initialValues?.name || '',
        keywords: initialValues?.keywords || [],
        bidAmount: initialValues?.bidAmount?.toString() || '',
        campaignFund: initialValues?.campaignFund?.toString() || '',
        town: initialValues?.town || '',
        radius: initialValues?.radius?.toString() || '',
        status: initialValues?.status !== undefined ? initialValues.status : true
    });

    const [formErrors, setFormErrors] = useState<IFormErrors>({
        name: false,
        keywords: false,
        bidAmount: false,
        campaignFund: false,
        town: false,
        radius: false
    });

    const [formTouched, setFormTouched] = useState<IFormTouched>({
        name: false,
        keywords: false,
        bidAmount: false,
        campaignFund: false,
        town: false,
        radius: false
    });

    const [keywordInput, setKeywordInput] = useState<string>('');
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

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

    useEffect(() => {
        validateForm();
    }, [formValues]);

    const validateForm = (): void => {
        setFormErrors({
            name: formValues.name.trim() === '',
            keywords: formValues.keywords.length === 0,
            bidAmount: !formValues.bidAmount || parseFloat(formValues.bidAmount) < minimumBidAmount,
            campaignFund: !formValues.campaignFund || parseFloat(formValues.campaignFund) <= 0,
            town: formValues.town === '',
            radius: !formValues.radius || parseInt(formValues.radius) < 1
        });
    };

    const handleModalContentClick = (e: MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { id, value, type } = e.target;
        const fieldName = id.replace('campaign-form__', '') as keyof IFormValues;

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

        if (!formTouched[fieldName as keyof IFormTouched]) {
            setFormTouched({
                ...formTouched,
                [fieldName]: true
            });
        }
    };

    const handleBlur = (fieldName: keyof IFormTouched): void => {
        setFormTouched({
            ...formTouched,
            [fieldName]: true
        });
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

        if (!formTouched.keywords) {
            setFormTouched({
                ...formTouched,
                keywords: true
            });
        }
    };

    const removeKeyword = (keyword: string): void => {
        setFormValues({
            ...formValues,
            keywords: formValues.keywords.filter(k => k !== keyword)
        });

        if (!formTouched.keywords) {
            setFormTouched({
                ...formTouched,
                keywords: true
            });
        }
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && keywordInput) {
            e.preventDefault();
            addKeyword(keywordInput);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsFormSubmitted(true);

        setFormTouched({
            name: true,
            keywords: true,
            bidAmount: true,
            campaignFund: true,
            town: true,
            radius: true
        });

        validateForm();

        const hasErrors = Object.values(formErrors).some(error => error);

        if (!hasErrors) {
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
        }
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
                                onBlur={() => handleBlur('name')}
                                required
                            />
                            {(formTouched.name || isFormSubmitted) && formErrors.name && (
                                <div className="campaign-form__error">Campaign name is required</div>
                            )}
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
                                        onBlur={() => handleBlur('keywords')}
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
                            {(formTouched.keywords || isFormSubmitted) && formErrors.keywords && (
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
                                    onBlur={() => handleBlur('bidAmount')}
                                    required
                                />
                                {(formTouched.bidAmount || isFormSubmitted) && formErrors.bidAmount && (
                                    <div className="campaign-form__error">Bid amount must be at least ${minimumBidAmount.toFixed(2)}</div>
                                )}
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
                                    onBlur={() => handleBlur('campaignFund')}
                                    required
                                />
                                {(formTouched.campaignFund || isFormSubmitted) && formErrors.campaignFund && (
                                    <div className="campaign-form__error">Campaign fund must be greater than $0</div>
                                )}
                            </div>
                        </div>

                        <div className="campaign-form__group">
                            <label className="campaign-form__label" htmlFor="campaign-form__town">Town</label>
                            <select
                                className="campaign-form__select"
                                id="campaign-form__town"
                                value={formValues.town}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('town')}
                                required
                            >
                                <option value="">Select a town</option>
                                {availableTowns.map((town, index) => (
                                    <option key={index} value={town.name}>{town.name}</option>
                                ))}
                            </select>
                            {(formTouched.town || isFormSubmitted) && formErrors.town && (
                                <div className="campaign-form__error">Please select a town</div>
                            )}
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
                                onBlur={() => handleBlur('radius')}
                                required
                            />
                            {(formTouched.radius || isFormSubmitted) && formErrors.radius && (
                                <div className="campaign-form__error">Radius must be at least 1 km</div>
                            )}
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