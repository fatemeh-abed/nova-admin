import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, getUsers } from '../../Utils/services/userService';
import { getErrorCode } from '../../Utils/api/apiError';
import type { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import { getNextId } from '../../Utils/getNextId';
import { RequestStatus } from '../../types/Enums/RequestStatus';
import type { ListState } from '../../types/api.types';
import type { CreateUserRequest, User } from '../../types/user.types';

const initialState: ListState<User> = {
  items: [],
  status: RequestStatus.Idle,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: ApiErrorCode }>(
  'users/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getUsers();
    } catch (error) {
      return rejectWithValue(getErrorCode(error));
    }
  },
);

export const addUser = createAsyncThunk<User, CreateUserRequest, { rejectValue: ApiErrorCode }>(
  'users/add',
  async (payload, { rejectWithValue }) => {
    try {
      return await createUser(payload);
    } catch (error) {
      return rejectWithValue(getErrorCode(error));
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const id = state.items.some((u) => u.id === action.payload.id)
          ? getNextId(state.items)
          : action.payload.id;
        state.items.unshift({ ...action.payload, id });
      });
  },
});

export default usersSlice.reducer;
