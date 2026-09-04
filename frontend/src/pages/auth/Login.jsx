import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import { isValidEmailOrPhone } from '../../utils/validators.js';
import { ROLE_HOME_ROUTE } from '../../utils/constants.js';

export default function Login() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ identifier: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function validate() {
    const next = {};
    if (!form.identifier.trim()) next.identifier = 'Email or phone number is required.';
    else if (!isValidEmailOrPhone(form.identifier)) next.identifier = 'Enter a valid email or phone number.';
    if (!form.password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login({ identifier: form.identifier.trim(), password: form.password, remember: form.remember });
      toast.success('Logged in successfully.');
      const redirectTo = location.state?.from?.pathname || ROLE_HOME_ROUTE[user?.role] || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Unable to log in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-navy-900">Welcome Back</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Login to your account to continue</p>

      {apiError && (
        <div role="alert" className="mb-4 px-3.5 py-2.5 rounded-lg bg-red-50 text-danger-600 text-sm">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField label="Email / Phone" htmlFor="identifier" error={errors.identifier} required>
          <Input
            id="identifier"
            type="text"
            autoComplete="username"
            placeholder="you@example.com or 98xxxxxxxx"
            value={form.identifier}
            invalid={!!errors.identifier}
            onChange={(e) => setForm((f) => ({ ...f, identifier: e.target.value }))}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password} required>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={form.password}
              invalid={!!errors.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center justify-between text-sm -mt-1">
          <label className="flex items-center gap-2 text-navy-700">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              className="rounded border-surface-200 text-royal-600 focus:ring-royal-400"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-royal-600 font-medium hover:text-royal-700">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full mt-1" icon={loading ? undefined : ArrowRight}>
          Login
        </Button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="h-px bg-surface-200 flex-1" />
        <span className="text-xs text-slate-400 font-medium">OR</span>
        <div className="h-px bg-surface-200 flex-1" />
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => toast.info('Google sign-in will be enabled once the backend provides an OAuth endpoint.')}
      >
        Continue with Google
      </Button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-royal-600 font-medium hover:text-royal-700">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
