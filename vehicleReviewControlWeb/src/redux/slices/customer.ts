import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: any = {
  isLoading: false,
  error: null,
  count: 0,
  customers: [],
  customer: null,
  sortBy: null,
  cepData: undefined,
  orderOrigins: [],
  candyCups: [],
  standardPackages: [],
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CUSTOMERS
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload.items;
      state.count = action.payload.count;
    },

    // GET CUSTOMER
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    // CLEAR CUSTOMERS
    clearCustomer(state) {
      state.customer = null;
    },

    clearCustomers(state) {
      state.customers = [];
      state.count = 0;
    },

    //  SORT & FILTER CUSTOMERS
    sortByCustomers(state, action) {
      state.sortBy = action.payload;
    },

    createCustomerSuccess(state, action) {
      state.customers = [...state.customers, action.payload];
    },

    deleteCustomerSuccess(state, action) {
      state.isLoading = false;
      const customers = state.customers.filter((customer: any) => customer.id !== action.payload);
      state.customers = customers;
    },

    updateCustomerSuccess(state, action) {
      state.isLoading = false;
      const customers = state.customers.filter((customer: any) => customer.id !== action.payload);
      state.customers = customers;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByCustomers, clearCustomer, clearCustomers } = slice.actions;

// ----------------------------------------------------------------------

type GetCustomersProps = {
  step: any;
  page: number;
  filterName: string;
  order?: string;
  orderBy?: string;
};

export function getCustomers({ step, page, filterName, order, orderBy }: GetCustomersProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/customer', {
        params: { index: page * step, step, query: filterName || undefined, order, orderBy },
      });
      dispatch(slice.actions.getCustomersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCustomer(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/customer/${id}`);
      dispatch(slice.actions.getCustomerSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createCustomer(customer: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/customer`, customer);
      dispatch(slice.actions.createCustomerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function updateCustomer(id: any, customer: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/customer/${id}`, customer);
      dispatch(slice.actions.updateCustomerSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteCustomer(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/customer/${id}`);
      dispatch(slice.actions.deleteCustomerSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
