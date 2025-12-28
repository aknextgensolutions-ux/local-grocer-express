import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export default function OtpPage() {
  const navigate = useNavigate();
  const { phone, login } = useAuthStore();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!phone) navigate('/login');
  }, [phone, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== 4) return;

    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 1500));
    
    // Mock successful verification
    login(
      { id: '1', name: 'Guest User', phone, role: 'user', created_at: new Date().toISOString() },
      'mock-jwt-token'
    );
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="px-4 py-4">
        <button onClick={() => navigate('/login')} className="flex h-10 w-10 items-center justify-center">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </header>

      <main className="flex-1 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Verify your number</h1>
          <p className="mt-2 text-muted-foreground">
            Enter the 4-digit code sent to +91 {phone}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex justify-center gap-3"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-16 w-14 rounded-xl bg-secondary text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </motion.div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Use <span className="font-bold text-foreground">1234</span> as OTP for demo
        </p>

        <Button
          size="lg"
          className="mt-8 w-full"
          onClick={handleVerify}
          disabled={otp.join('').length !== 4 || isVerifying}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Didn't receive code?{' '}
          <button className="font-semibold text-primary">Resend</button>
        </p>
      </main>
    </div>
  );
}
