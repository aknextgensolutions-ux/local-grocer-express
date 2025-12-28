import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Address } from '@/types';
import { mockAddresses } from '@/data/mockData';

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  isLoading: boolean;
  
  // Actions
  setAddresses: (addresses: Address[]) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => Address | undefined;
  getDefaultAddress: () => Address | undefined;
  loadAddresses: () => Promise<void>;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,
      isLoading: false,

      setAddresses: (addresses) => set({ addresses }),

      addAddress: (addressData) => {
        const newAddress: Address = {
          ...addressData,
          id: `addr-${Date.now()}`,
        };
        
        const addresses = get().addresses;
        
        // If this is the first address or marked as default, update others
        if (newAddress.is_default || addresses.length === 0) {
          const updatedAddresses = addresses.map(a => ({ ...a, is_default: false }));
          set({ 
            addresses: [...updatedAddresses, { ...newAddress, is_default: true }],
            selectedAddressId: newAddress.id,
          });
        } else {
          set({ addresses: [...addresses, newAddress] });
        }
      },

      updateAddress: (id, data) => {
        const addresses = get().addresses.map(addr =>
          addr.id === id ? { ...addr, ...data } : addr
        );
        set({ addresses });
      },

      deleteAddress: (id) => {
        const addresses = get().addresses.filter(addr => addr.id !== id);
        const selectedId = get().selectedAddressId;
        
        // If deleted address was selected, select default or first
        if (selectedId === id) {
          const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
          set({ 
            addresses, 
            selectedAddressId: defaultAddr?.id || null,
          });
        } else {
          set({ addresses });
        }
      },

      setDefaultAddress: (id) => {
        const addresses = get().addresses.map(addr => ({
          ...addr,
          is_default: addr.id === id,
        }));
        set({ addresses, selectedAddressId: id });
      },

      selectAddress: (id) => set({ selectedAddressId: id }),

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        if (selectedAddressId) {
          return addresses.find(a => a.id === selectedAddressId);
        }
        return addresses.find(a => a.is_default) || addresses[0];
      },

      getDefaultAddress: () => {
        return get().addresses.find(a => a.is_default);
      },

      loadAddresses: async () => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        const addresses = get().addresses;
        if (addresses.length === 0) {
          set({ addresses: mockAddresses, selectedAddressId: mockAddresses[0]?.id });
        }
        set({ isLoading: false });
      },
    }),
    {
      name: 'kiranafresh-addresses',
    }
  )
);
