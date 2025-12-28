import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setPhone } = useAuthStore();
  const [phone, setPhoneInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    
    setIsLoading(true);
    setPhone(phone);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    navigate('/otp');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-foreground">KiranaFresh</h1>
          <p className="mt-2 text-muted-foreground">Fresh groceries delivered in minutes</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-12"
        >
          <label className="text-sm font-medium text-foreground">Mobile Number</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-secondary p-1">
            <div className="flex h-12 items-center gap-2 rounded-lg bg-card px-3">
              <span className="text-lg">🇮🇳</span>
              <span className="font-medium text-foreground">+91</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter mobile number"
              className="flex-1 bg-transparent px-2 py-3 text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full gap-2"
            disabled={phone.length !== 10 || isLoading}
          >
            {isLoading ? 'Sending OTP...' : 'Continue'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
