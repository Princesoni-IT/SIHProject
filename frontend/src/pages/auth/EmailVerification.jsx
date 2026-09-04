import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { MailCheck, CheckCircle2, XCircle } from 'lucide-react';
import { authService } from '../../services/authService.js';
import { useToast } from '../../context/ToastContext.jsx';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/common/Loader.jsx';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const location = useLocation();
  const email = location.state?.email || '';
  const navigate = useNavigate();
  const toast = useToast();

  const [status, setStatus] = useState(token ? 'verifying' : 'pending');
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    authService
      .verifyEmail({ token })
      .then(() => setStatus('success'))
      .catch((err) => {
        setError(err.message || 'This verification link is invalid or has expired.');
        setStatus('error');
      });
  }, [token]);

  async function handleResend() {
    setResending(true);
    try {
      await authService.sendEmailVerification({ email });
      toast.success('Verification email sent. Check your inbox.');
    } catch (err) {
      toast.error(err.message || 'Could not send the verification email.');
    } finally {
      setResending(false);
    }
  }

  if (status === 'verifying') {
    return <Loader label="Verifying your email..." />;
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={22} className="text-safe-600" />
        </div>
        <h1 className="text-xl font-semibold text-navy-900">Email Verified</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">Your email address has been confirmed.</p>
        <Button className="w-full" onClick={() => navigate('/login')}>
          Continue to Login
        </Button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center">
        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <XCircle size={22} className="text-danger-600" />
        </div>
        <h1 className="text-xl font-semibold text-navy-900">Verification Failed</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">{error}</p>
        <Button className="w-full" loading={resending} onClick={handleResend}>
          Resend Verification Email
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
        <MailCheck size={22} className="text-royal-600" />
      </div>
      <h1 className="text-xl font-semibold text-navy-900">Check Your Email</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        We've sent a verification link to {email ? <span className="font-medium text-navy-700">{email}</span> : 'your email address'}.
      </p>
      <Button className="w-full" loading={resending} onClick={handleResend}>
        Resend Verification Email
      </Button>
      <p className="text-center text-sm text-slate-500 mt-5">
        <Link to="/login" className="text-royal-600 font-medium hover:text-royal-700">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
