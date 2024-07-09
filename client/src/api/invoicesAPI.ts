import axios from 'axios';

const BASE_URL = 'http://localhost:3000/invoices';

export const fetchInvoices = async () => {
  const response = await axios.get(`${BASE_URL}/invoices`);
  return response.data;
};
