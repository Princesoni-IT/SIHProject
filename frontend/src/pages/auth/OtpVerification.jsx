import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { authService } from '../../services/authService.js';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../../components/common/Button.jsx';

const OTP_LENGTH = 6;

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const phone = location.state?.phone || '';

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [apiError, setApiError] = useState('');
  const [cooldown, setCooldown] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function handleChange(index, value) {
    const v = value.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
    if (v && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  const code = digits.join('');

  async function handleVerify(e) {
    e.preventDefault();
    setApiError('');
    if (code.length !== OTP_LENGTH) {
      setApiError('Enter the complete 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      await authService.verifyOtp({ phone, code });
      toast.success('Phone number verified.');
      navigate('/login');
    } catch (err) {
      setApiError(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setApiError('');
    try {
      await authService.sendOtp({ phone });
      toast.success('A new code has been sent.');
      setCooldown(30);
    } catch (err) {
      setApiError(err.message || 'Could not resend the code.');
    } finally {
      setResending(false);
    }
  }

  return (
    <div>
      <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center mb-4">
        <ShieldCheck size={22} className="text-royal-600" />
      </div>
      <h1 className="text-xl font-semibold text-navy-900">Verify Your Phone</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        Enter the 6-digit code sent to {phone ? <span className="font-medium text-navy-700">{phone}</span> : 'your phone number'}.
      </p>

      {apiError && (
        <div role="alert" className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-danger-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleVerify}>
        <div className="flex gap-2 justify-between mb-5" role="group" aria-label="One-time passcode">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              className="w-full aspect-square text-center text-lg font-semibold rounded-lg border border-surface-200 focus:border-royal-400 focus:ring-2 focus:ring-royal-50 outline-none"
            />
          ))}
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Verify
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-5">
        Didn't receive the code?{' '}
        {cooldown > 0 ? (
          <span className="text-slate-400">Resend in {cooldown}s</span>
        ) : (
          <button onClick={handleResend} disabled={resending} className="text-royal-600 font-medium hover:text-royal-700">
            Resend Code
          </button>
        )}
      </p>

      <p className="text-center text-sm text-slate-500 mt-2">
        <Link to="/login" className="text-royal-600 font-medium hover:text-royal-700">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
