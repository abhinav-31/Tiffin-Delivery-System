// src/utils/utility.js

export const generateRandomTransactionId = () => {
    return `txn_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
