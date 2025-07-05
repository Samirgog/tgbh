import useSWR from 'swr';
import { api } from './client';
import type { User, Store, AuthResponse } from '../types/api';

// Auth hooks
export const useLogin = () => {
  const login = async (initData: string) => {
    const response = await api.post<AuthResponse>('/auth/telegram-login', { initData });
    const { accessToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return user;
  };
  return { login };
};

export const useUser = () => {
  const { data: user, error, mutate } = useSWR<User>('/auth/me', async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  });

  return {
    user,
    isLoading: !error && !user,
    isError: error,
    mutate,
  };
};

// Store hooks
export const useStores = () => {
  const { data: stores, error, mutate } = useSWR<Store[]>('/stores/my', async () => {
    const response = await api.get<Store[]>('/stores/my');
    return response.data;
  });

  return {
    stores,
    isLoading: !error && !stores,
    isError: error,
    mutate,
  };
};

export const useStore = (id: string) => {
  const { data: store, error, mutate } = useSWR<Store>(`/stores/${id}`, async () => {
    const response = await api.get<Store>(`/stores/${id}`);
    return response.data;
  });

  return {
    store,
    isLoading: !error && !store,
    isError: error,
    mutate,
  };
};

// Store mutations
export const useCreateStore = () => {
  const createStore = async (data: Partial<Store>) => {
    const response = await api.post<Store>('/stores', data);
    return response.data;
  };
  return { createStore };
};

export const useUpdateStore = () => {
  const updateStore = async (id: string, data: Partial<Store>) => {
    const response = await api.patch<Store>(`/stores/${id}`, data);
    return response.data;
  };
  return { updateStore };
};

export const useDeleteStore = () => {
  const deleteStore = async (id: string) => {
    await api.delete(`/stores/${id}`);
  };
  return { deleteStore };
}; 