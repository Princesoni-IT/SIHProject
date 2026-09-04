import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { authService } from '../../services/authService.js';
import { useToast } from '../../context/ToastContext.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { isValidEmail, isValidPhone } from '../../utils/validators.js';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Phone number is required.';
    else if (!isValidPhone(form.phone)) next.phone = 'Enter a valid phone number.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      await authService.register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      await authService.sendOtp({ phone: form.phone.trim() });
      toast.success('Account created. Verify your phone number to continue.');
      navigate('/verify-otp', { state: { phone: form.phone.trim() } });
    } catch (err) {
      setApiError(err.message || 'Unable to create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">Create Account</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Sign up to report and track issues in your city</p>

      {apiError && (
        <div role="alert" className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-danger-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField label="Full Name" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            invalid={!!errors.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            invalid={!!errors.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </FormField>

        <FormField label="Phone Number" htmlFor="phone" error={errors.phone} required>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="98xxxxxxxx"
            value={form.phone}
            invalid={!!errors.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password} required>
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

        <FormField label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword} required>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            invalid={!!errors.confirmPassword}
            onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
          />
        </FormField>

        <Button type="submit" loading={loading} className="w-full mt-1" icon={loading ? undefined : ArrowRight}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-royal-600 font-medium hover:text-royal-700">
          Log In
        </Link>
      </p>
    </div>
  );
}
