import { IAccount } from "../types/campaignTypes";
import mockData from "../utilities/mockData";

const account: IAccount = mockData.account;

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const accountService = {
    async getBalance(): Promise<number> {
        await delay();
        return account.balance;
    },
};



