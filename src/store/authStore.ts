import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { setAuthToken } from '@/services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  phone: string;
  
  // Actions
  setPhone: (phone: string) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      phone: '',

      setPhone: (phone) => set({ phone }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      login: (user, token) => {
        setAuthToken(token);
        set({ user, token, isAuthenticated: true, isLoading: false });
      },
      
      logout: () => {
        setAuthToken(null);
        set({ user: null, token: null, isAuthenticated: false, phone: '' });
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      },
    }),
    {
      name: 'kiranafresh-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
