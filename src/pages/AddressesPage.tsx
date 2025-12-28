import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Check, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/BottomNav';
import { useAddressStore } from '@/store/addressStore';

export default function AddressesPage() {
  const navigate = useNavigate();
  const { addresses, selectedAddressId, selectAddress, setDefaultAddress, deleteAddress } = useAddressStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    label: '', full_address: '', landmark: '', city: '', pincode: '',
  });
  const { addAddress } = useAddressStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ ...formData, user_id: '1', is_default: addresses.length === 0 });
    setShowForm(false);
    setFormData({ label: '', full_address: '', landmark: '', city: '', pincode: '' });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center">
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">My Addresses</h1>
          </div>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </header>

      <main className="px-4 py-4">
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="mb-4 rounded-2xl bg-card p-4 shadow-card space-y-3"
          >
            <input
              placeholder="Label (Home, Office...)"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full rounded-xl bg-secondary px-4 py-3 text-sm"
              required
            />
            <textarea
              placeholder="Full Address"
              value={formData.full_address}
              onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
              className="w-full rounded-xl bg-secondary px-4 py-3 text-sm"
              rows={2}
              required
            />
            <div className="flex gap-2">
              <input
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="flex-1 rounded-xl bg-secondary px-4 py-3 text-sm"
                required
              />
              <input
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-28 rounded-xl bg-secondary px-4 py-3 text-sm"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">Save Address</Button>
            </div>
          </motion.form>
        )}

        <div className="space-y-3">
          {addresses.map((address) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl bg-card p-4 shadow-card border-2 transition-colors ${
                selectedAddressId === address.id ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <button
                  onClick={() => selectAddress(address.id)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">{address.label}</span>
                    {address.is_default && (
                      <span className="rounded bg-primary-light px-2 py-0.5 text-xs font-medium text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{address.full_address}</p>
                  <p className="text-xs text-muted-foreground">{address.city} - {address.pincode}</p>
                </button>
                <div className="flex gap-1">
                  {selectedAddressId === address.id && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
