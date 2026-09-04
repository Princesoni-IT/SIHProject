import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService.js';
import { useToast } from '../../context/ToastContext.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    if (!token) {
      setApiError('This reset link is missing or invalid. Please request a new one.');
      return;
    }
    if (!validate()) return;

    setLoading(true);
    try {
      await authService.resetPassword({ token, password: form.password });
      toast.success('Password reset successfully. You can now log in.');
      navigate('/login');
    } catch (err) {
      setApiError(err.message || 'Unable to reset your password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">Set a New Password</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Choose a strong password you haven't used before.</p>

      {apiError && (
        <div role="alert" className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-danger-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField label="New Password" htmlFor="password" error={errors.password} required>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={form.password}
            invalid={!!errors.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
        </FormField>
        <FormField label="Confirm New Password" htmlFor="confirmPassword" error={errors.confirmPassword} required>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your new password"
            value={form.confirmPassword}
            invalid={!!errors.confirmPassword}
            onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
          />
        </FormField>
        <Button type="submit" loading={loading} className="w-full">
          Reset Password
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
