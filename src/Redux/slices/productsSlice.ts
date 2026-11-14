import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, getProducts } from '../../Utils/services/productService';
import { getErrorCode } from '../../Utils/api/apiError';
import type { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import { getNextId } from '../../Utils/getNextId';
import { RequestStatus } from '../../types/Enums/RequestStatus';
import type { ListState } from '../../types/api.types';
import type { CreateProductRequest, Product } from '../../types/product.types';

const initialState: ListState<Product> = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: ApiErrorCode }>(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue(getErrorCode(error));
    }
  },
);

export const addProduct = createAsyncThunk<Product, CreateProductRequest, { rejectValue: ApiErrorCode }>(
  'products/add',
  async (payload, { rejectWithValue }) => {
    try {
      return await createProduct(payload);
    } catch (error) {
      return rejectWithValue(getErrorCode(error));
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        // The mock API returns the same id for every POST, so ensure uniqueness locally.
        const id = state.items.some((p) => p.id === action.payload.id)
          ? getNextId(state.items)
          : action.payload.id;
        state.items.unshift({ ...action.payload, id });
      });
  },
});

export default productsSlice.reducer;
