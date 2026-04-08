import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import SpendingChart from './SpendingChart';

const MetricCard = ({ title, amount, icon, type }) => {
    const isPositive = type === 'income';
    const color = type === 'balance' ? 'var(--accent-primary)' : isPositive ? 'var(--success)' : 'var(--danger)';

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, minWidth: '250px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>{title}</h3>
                <div style={{ backgroundColor: `${color}1A`, padding: '0.6rem', borderRadius: '12px' }}>
                    {icon}
                </div>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                ${amount.toFixed(2)}
            </h2>
        </div>
    );
};

const Dashboard = () => {
    const { totals } = useFinance();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
            {/* Metrics Row */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <MetricCard
                    title="Total Balance"
                    amount={totals.balance}
                    icon={<DollarSign color="var(--accent-primary)" size={24} />}
                    type="balance"
                />
                <MetricCard
                    title="Total Income"
                    amount={totals.income}
                    icon={<TrendingUp color="var(--success)" size={24} />}
                    type="income"
                />
                <MetricCard
                    title="Total Expenses"
                    amount={totals.expense}
                    icon={<TrendingDown color="var(--danger)" size={24} />}
                    type="expense"
                />
            </div>

            {/* Main Content Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <TransactionForm />
                    <SpendingChart />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <TransactionList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
