import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
interface StockState {
  selectedStock: string;
  duration: string;
  stockData: any[];
  status: 'idle' | 'loading' | 'failed';
}
const BASE_URL = "http://localhost:5321"
const initialState: StockState = {
  selectedStock: '',
  duration: '1d',
  stockData: [],
  status: 'idle',
};

// Thunk to fetch stock data
export const fetchStockData = createAsyncThunk<
  any, // Adjust the return type if needed
  { stock: string; duration: string }, // Arguments type
  { rejectValue: string } // Error type
>(
  'stocks/fetchStockData',
  async ({ stock, duration }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/stocks/${stock}`, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
        },
        method: 'POST',
        body: JSON.stringify({ stock, duration }),
      });
      console.log(response)
      if (!response.ok) throw new Error('Failed to fetch stock data');
      return await response.json();
    } catch (error) {
      return rejectWithValue('Error fetching stock data');
    }
  }
);


// Slice to handle stock state
const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stockData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSelectedStock, setDuration } = stockSlice.actions;
export const selectStock = (state: any) => state.stock;
export default stockSlice.reducer;
