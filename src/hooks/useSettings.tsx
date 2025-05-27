import { useState, useEffect } from 'react';
import { settingsService } from '../stores/settingsStore';

export const useSettings = () => {
    const [settings, setSettings] = useState({
        minimumBidAmount: 0.50
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await settingsService.getSettings();
            setSettings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return {
        settings,
        loading,
        error
    };
};