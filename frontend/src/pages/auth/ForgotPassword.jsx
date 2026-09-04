import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { authService } from '../../services/authService.js';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { isValidEmail } from '../../utils/validators.js';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword({ email: email.trim() });
      setSent(true);
    } catch (err) {
      setApiError(err.message || 'Unable to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center mx-auto mb-4">
          <KeyRound size={22} className="text-royal-600" />
        </div>
        <h1 className="text-xl font-semibold text-navy-900">Check Your Email</h1>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          If an account exists for <span className="font-medium text-navy-700">{email}</span>, we've sent password reset instructions.
        </p>
        <Button className="w-full" onClick={() => navigate('/login')}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">Forgot Password?</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        Enter your email and we'll send you instructions to reset your password.
      </p>

      {apiError && (
        <div role="alert" className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-danger-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField label="Email" htmlFor="email" error={error} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            invalid={!!error}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <Button type="submit" loading={loading} className="w-full">
          Send Reset Instructions
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        <Link to="/login" className="text-royal-600 font-medium hover:text-royal-700">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
