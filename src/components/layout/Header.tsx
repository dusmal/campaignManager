import React, { useState, useEffect } from 'react';
import { useAccount } from '../../hooks/useAccount';

const Header = () => {
    const { balance } = useAccount();

    return (
        <header className="header">
            <h1 className="header__title">Campaign Manager</h1>
            <div className="header__balance">
                <p className="header__balance-text">Account Balance:
                    <strong className="header__balance-amount">${balance.toFixed(2)}</strong>
                </p>
            </div>
        </header>
    );
};

export default Header;