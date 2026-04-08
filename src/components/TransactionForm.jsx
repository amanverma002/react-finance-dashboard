import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { PlusCircle } from 'lucide-react';

export default function TransactionForm() {
    const { addTransaction } = useFinance();
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        category: 'Food'
    });

    const categories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Salary', 'Investment', 'Other'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.description || !formData.amount) return;

        addTransaction({
            ...formData,
            amount: parseFloat(formData.amount)
        });

        setFormData({
            description: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
            type: 'expense',
            category: 'Food'
        });
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <PlusCircle color="var(--accent-primary)" />
                Add Transaction
            </h3>

            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="form-select">
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-input"
                            style={{ padding: '0.7rem 1rem' }}
                            required
                        />
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. Grocery shopping"
                        className="form-input"
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ flex: '1 1 50%' }}>
                        <label className="form-label">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="form-select">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: '1 1 50%' }}>
                        <label className="form-label">Amount</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>$</span>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="form-input"
                                style={{ paddingLeft: '2rem' }}
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
                    Add {formData.type === 'income' ? 'Income' : 'Expense'}
                </button>
            </form>
        </div>
    );
}
