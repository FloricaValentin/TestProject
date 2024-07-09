
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface Invoice {
  id: number;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  user_id: number;
  paid: boolean;
}

export const fetchInvoicesAsync = createAsyncThunk('invoices/fetchInvoices', async () => {
  try {
    const response = await axios.get('http://localhost:3000/invoices/');
    const data = response.data;

    const invoices: Invoice[] = Object.keys(data).map(key => ({
      id: Number(key),
      ...data[key]
    }));

    return invoices;
  } catch (error) {
    throw new Error('Failed to fetch invoices');
  }
});

const initialState: {
  invoices: Invoice[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  invoices: [],
  status: 'idle',
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoicesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoicesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const selectAllInvoices = (state: RootState) => state.invoices.invoices;
export const selectInvoiceById = (state: RootState, invoiceId: number) =>
  state.invoices.invoices.find((invoice) => invoice.id === invoiceId);

export default invoicesSlice.reducer;
