import { useState, useEffect } from 'react';
import { accountService } from '../services/accountClient';
import { IAccount } from '../types/campaignTypes';

export const useAccount = () => {
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = async () => {
        setLoading(true);
        setError(null);
        try {
            const balance = await accountService.getBalance();
            setBalance(balance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch account balance');
        } finally {
            setLoading(false);
        }
    };

    const updateBalance = (amount: number) => {
        setBalance(prevBalance => prevBalance + amount);
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return {
        balance,
        loading,
        error,
        updateBalance
    };
};