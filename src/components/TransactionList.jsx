import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, TrendingDown, TrendingUp, Filter } from 'lucide-react';

export default function TransactionList() {
    const { transactions, deleteTransaction, filterCategory, setFilterCategory } = useFinance();

    const categories = ["All", "Food", "Travel", "Utilities", "Entertainment", "Salary", "Investment", "Other"];

    const filteredTransactions = filterCategory === "All"
        ? transactions
        : transactions.filter(t => t.category === filterCategory);

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Transactions History</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={16} color="var(--text-secondary)" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="form-select"
                        style={{ padding: '0.4rem 0.5rem', fontSize: '0.875rem', width: 'auto' }}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
                {filteredTransactions.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                        <Filter size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No transactions found.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredTransactions.map((t) => (
                            <div key={t.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '1.25rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                transition: 'var(--transition)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        backgroundColor: t.type === 'income' ? 'var(--success-glow)' : 'var(--danger-glow)',
                                        padding: '0.75rem',
                                        borderRadius: '50%'
                                    }}>
                                        {t.type === 'income' ? <TrendingUp size={20} color="var(--success)" /> : <TrendingDown size={20} color="var(--danger)" />}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.description}</h4>
                                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            <span>{t.date}</span>
                                            <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.6rem', borderRadius: '10px' }}>{t.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                        color: t.type === 'income' ? 'var(--success)' : 'var(--text-primary)'
                                    }}>
                                        {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '0.5rem' }}
                                        title="Delete Transaction"
                                        className="delete-btn"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .delete-btn:hover { color: var(--danger) !important; transform: scale(1.1); }
      `}} />
        </div>
    );
}
