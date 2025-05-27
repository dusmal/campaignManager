// In-memory fake API store for simulating account balance operations

const delay = (ms: number = 75) => new Promise(resolve => setTimeout(resolve, ms));

let accountBalance = 5000; 

export const getBalance = async (): Promise<number> => {
  await delay();
  return accountBalance;
};

export const updateBalance = async (amount: number): Promise<number> => {
  await delay();
  
  if (accountBalance + amount < 0) {
    throw new Error('Insufficient funds');
  }
  
  accountBalance += amount;
  return accountBalance;
};