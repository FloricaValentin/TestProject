import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInvoicesAsync } from '../features/invoices/invoicesSlice';
import InvoiceList from '../components/InvoiceList';
import InvoiceModal from '../components/InvoiceModal';
import { AppDispatch } from '../app/store';

const InvoicesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);

  const handleInvoiceClick = (invoiceId: number) => {
    setSelectedInvoice(invoiceId);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  return (
    <div>
      <h2>Invoices Page</h2>
      <InvoiceList handleInvoiceClick={handleInvoiceClick} /> 
      {selectedInvoice !== null && (
        <InvoiceModal invoiceId={selectedInvoice} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default InvoicesPage;
