import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export type orderServiceProps = {
  id: string;
  board: string;
  year: number;
  model: number;
  color: string;
  problem: string;
  note: string;
  finish: boolean;
  customerId: string;
  created_at: string;
  updated_at: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone_mobile: number;
    city: string;
  };
};

type orderServiceState = {
  isLoading: boolean;
  error: Error | string | null;
  sortBy: string | null;
  orderService: orderServiceProps | null;
  orderServices: orderServiceProps[];
  count: number;
  total: number;
  finish: number;
  pending: number;
};

const initialState: orderServiceState = {
  isLoading: false,
  error: null,
  sortBy: null,
  count: 0,
  total: 0,
  finish: 0,
  pending: 0,
  orderService: null,
  orderServices: [],
};

const slice = createSlice({
  name: 'order service',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getOrderServicesSuccess(state, action) {
      state.isLoading = false;
      state.orderServices = action.payload.items;
      state.count = action.payload.count;
    },

    getOrderServicesCountSuccess(state, action) {
      state.isLoading = false;
      const finish = action.payload.items.filter((order: any) => order.finish === true).length;
      const pending = action.payload.items.filter((order: any) => order.finish === !true).length;

      state.finish = finish;
      state.pending = pending;
      state.total = action.payload.items.length;
    },

    getOrderServiceSuccess(state, action) {
      state.isLoading = false;
      state.orderService = action.payload;
    },

    clearOrderService(state) {
      state.orderService = null;
    },

    sortByupdateOrderService(state, action) {
      state.sortBy = action.payload;
    },

    createOrderServiceSuccess(state, action) {
      state.isLoading = false;
      state.orderServices = [...state.orderServices, action.payload];
    },

    deleteOrderServiceSuccess(state, action) {
      state.isLoading = false;
      const orderServices = state.orderServices.filter((order: any) => order.id !== action.payload);
      state.orderServices = orderServices;
    },

    updateorderServicesSuccess(state, action) {
      state.isLoading = false;
      const { id } = action.payload;
      const updateOrderServices = state.orderServices.map((order: any) => {
        if (order.id === id) {
          return action.payload;
        }
        return order;
      });

      state.orderServices = updateOrderServices;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { sortByupdateOrderService, clearOrderService } = slice.actions;

// ----------------------------------------------------------------------

type GetTransactionsProps = {
  step: any;
  page: number;
  filterOrder: any;
  filterName: string;
};

export function getOrderServices({ step, page, filterName, filterOrder }: GetTransactionsProps) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/vehicle-review', {
        params: {
          index: page * step,
          step,
          filterName: filterOrder.filterName,
          filterValue: filterOrder.filterValue,
          query: filterName || undefined,
        },
      });
      dispatch(slice.actions.getOrderServicesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getOrderServicesCount() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/vehicle-review');
      dispatch(slice.actions.getOrderServicesCountSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getOrderService(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/vehicle-review/${id}`);
      dispatch(slice.actions.getOrderServiceSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createOrderService(vehicleReview: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/vehicle-review`, vehicleReview);
      dispatch(slice.actions.createOrderServiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function updateOrderService(id: string, vehicleReview: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`/vehicle-review/${id}`, vehicleReview);
      dispatch(slice.actions.updateorderServicesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteOrderService(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/vehicle-review/${id}`);
      dispatch(slice.actions.deleteOrderServiceSuccess(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
