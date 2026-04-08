export const exportToCSV = (transactions) => {
    if (!transactions || transactions.length === 0) return;

    const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Amount'];

    const csvRows = [headers.join(',')];

    transactions.forEach(t => {
        const row = [
            t.id,
            t.date,
            t.type,
            `"${t.category}"`,
            `"${t.description.replace(/"/g, '""')}"`,
            t.amount
        ];
        csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'finance_transactions.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
