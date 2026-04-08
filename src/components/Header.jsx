import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { exportToCSV } from '../utils/exportData';
import { Wallet, Download } from 'lucide-react';

export default function Header() {
    const { transactions } = useFinance();

    return (
        <header className="glass-panel" style={{ padding: '1.25rem 2rem', margin: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Wallet color="var(--accent-primary)" size={28} />
                <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, letterSpacing: '-0.5px' }}>FinanceTracker</h1>
            </div>
            <button
                className="btn btn-outline"
                onClick={() => exportToCSV(transactions)}
                disabled={transactions.length === 0}
                style={{ padding: '0.5rem 1rem' }}
                title="Export Data to CSV"
            >
                <Download size={18} />
                <span style={{ display: 'none' }} className="hide-on-mobile">Export CSV</span>
            </button>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (min-width: 640px) {
          .hide-on-mobile { display: inline !important; }
        }
      `}} />
        </header>
    );
}
