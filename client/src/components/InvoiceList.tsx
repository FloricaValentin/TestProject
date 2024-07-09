
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoicesAsync, selectAllInvoices } from '../features/invoices/invoicesSlice';
import { RootState, AppDispatch } from '../app/store';

const InvoiceList: React.FC<{ handleInvoiceClick: (invoiceId: number) => void }> = ({ handleInvoiceClick }) => {
  const dispatch = useDispatch<AppDispatch>();
  const invoices = useSelector((state: RootState) => selectAllInvoices(state)); 

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);

  if (!Array.isArray(invoices)) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} onClick={() => handleInvoiceClick(invoice.id)}>
            <p>Vendor Name: {invoice.vendor_name}</p>
            <p>Amount: {invoice.amount}</p>
            <p>Due Date: {invoice.due_date}</p>
            <p>Description: {invoice.description}</p>
            <p>User ID: {invoice.user_id}</p>
            <p>Paid: {invoice.paid ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;

