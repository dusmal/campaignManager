import { useState, useEffect, useCallback } from "react";
import * as accountStore from "../stores/accountStore";

export const useAccount = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const currentBalance = await accountStore.getBalance();
      setBalance(currentBalance);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBalance = useCallback(async (amount: number) => {
    setLoading(true);
    setError(null);

    try {
      const newBalance = await accountStore.updateBalance(amount);
      setBalance(newBalance);
      return newBalance;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update balance");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    loading,
    error,
    updateBalance,
    refetch: fetchBalance,
  };
};
