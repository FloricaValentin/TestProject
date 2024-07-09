import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectInvoiceById } from '../features/invoices/invoicesSlice';

Modal.setAppElement('#root');

interface Props {
  invoiceId: number;
  onClose: () => void;
}

const InvoiceModal: React.FC<Props> = ({ invoiceId, onClose }) => {
  const invoice = useSelector((state: RootState) => selectInvoiceById(state, invoiceId));

  if (!invoice) return null;

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <h2>Invoice Details</h2>
      <p>Vendor Name: {invoice.vendor_name}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Due Date: {invoice.due_date}</p>
      <p>Description: {invoice.description}</p>
      <p>User ID: {invoice.user_id}</p>
      <p>Paid: {invoice.paid ? 'Yes' : 'No'}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default InvoiceModal;
