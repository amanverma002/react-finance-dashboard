import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

export default function SpendingChart() {
    const { transactions } = useFinance();

    const expenses = transactions.filter(t => t.type === 'expense');

    const dataMap = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        return acc;
    }, {});

    const data = Object.keys(dataMap).map(key => ({
        name: key,
        value: dataMap[key]
    })).sort((a, b) => b.value - a.value);

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', flex: 1, minHeight: '350px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <PieChartIcon color="var(--accent-primary)" />
                Spending by Category
            </h3>

            <div style={{ flex: 1, position: 'relative', minHeight: '250px' }}>
                {data.length === 0 ? (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                        No expense data available.
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `$${value.toFixed(2)}`}
                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--text-primary)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
