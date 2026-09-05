import { useState, type FormEvent } from "react";
import {useNavigate} from "react-router-dom";
import {
  Droplet,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import cityImage from "../../assets/rainy-city.png";

type Mode = "login" | "register";
type VerifyStatus = "idle" | "sending" | "sent" | "verifying" | "verified"| "error";


/* ---------------- Illustration ---------------- */

function IllustrationPanel() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-blue-50">
      <img
        src={cityImage}
        alt="Rainy city street with drainage"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center shadow">
          <Droplet className="text-white" size={18} fill="white" />
        </div>
        <div>
          <p className="font-extrabold text-slate-900 leading-none drop-shadow-sm">
            Aqua<span className="text-blue-600">Alert</span>
          </p>
          <p className="text-[11px] text-slate-600 leading-none mt-1">
            Safer Cities, Brighter Tomorrows
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- OTP verify field ---------------- */

function VerifyField({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  status,
  onSendOtp,
  otpValue,
  onOtpChange,
  onConfirmOtp,
}: {
  label: string;
  icon: any;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  status: VerifyStatus;
  onSendOtp: () => void;
  otpValue: string;
  onOtpChange: (v: string) => void;
  onConfirmOtp: () => void;
}) {
  const verified = status === "verified";
  const otpStage = status === "sent" || status === "verifying";

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="flex gap-2">
        <div
          className={`flex-1 flex items-center gap-2.5 h-12 px-3.5 border rounded-lg bg-white transition-colors ${
            verified ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200"
          }`}
        >
          <Icon size={18} className="text-slate-400 shrink-0" />
          <input
            type={type}
            value={value}
            disabled={verified || otpStage}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm outline-none disabled:text-slate-500"
          />
          {verified && (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          )}
        </div>

        <button
          type="button"
          onClick={onSendOtp}
          disabled={verified || status === "sending" || !value}
          className="shrink-0 px-4 h-12 rounded-lg text-sm font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          {status === "sending" && <Loader2 size={14} className="animate-spin" />}
          {verified ? "Verified" : status === "sending" ? "Sending..." : otpStage ? "Resend" : "Verify"}
        </button>
      </div>

      {otpStage && (
        <div className="mt-2.5 flex gap-2 items-center">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otpValue}
            onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit OTP"
            className="w-40 h-10 px-3 border border-slate-200 rounded-lg text-sm tracking-widest outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={onConfirmOtp}
            disabled={otpValue.length !== 6 || status === "verifying"}
            className="px-4 h-10 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
          >
            {status === "verifying" && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Login form ---------------- */

function LoginFields() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email/phone aur password dono fill karo.");
      return;
    }
    setLoading(true);
   try {
  const response = await fetch(
    "http://localhost:5000/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Login fail ho gaya. Dobara try karo."
    );
  }

  // Login successful
  if (response.status === 200 && data?.success) {
    const user= data.data.user;
    // Store JWT token
    localStorage.setItem(
      "accessToken",
      data.data.token
    );

    // Store user information
    localStorage.setItem(
      "user",
      JSON.stringify(data.data.user)
    );
    //redirect based on role
    if(user.role==="admin"){
      navigate("/admin-dashboard");
    }else{

    // Redirect to user dashboard
    navigate("/user-dashboard");
    }
  }
} catch (err: any) {
  setError(
    err?.message || "Login fail ho gaya. Dobara try karo."
  );
} finally {
  setLoading(false);
  navigate("/user-dashboard");
}
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Email or Mobile Number
        </label>
        <div className="flex items-center gap-2.5 h-12 px-3.5 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-colors">
          <Mail size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email or mobile number"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Password
        </label>
        <div className="flex items-center gap-2.5 h-12 px-3.5 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-colors">
          <Lock size={18} className="text-slate-400 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded accent-blue-600"
          />
          Remember me
        </label>
        <a href="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold transition-colors"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

/* ---------------- Register form ---------------- */

function RegisterFields({ onSuccess }: { onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [phoneStatus, setPhoneStatus] = useState<VerifyStatus>("idle");
  const [emailStatus, setEmailStatus] = useState<VerifyStatus>("idle");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sendOtp = async (field: "phone" | "email") => {
  const setStatus =
    field === "phone" ? setPhoneStatus : setEmailStatus;

  // Phone OTP verification is skipped for now
  if (field === "phone") {
    setStatus("sent");
    return;
  }

  // Email OTP
  if (!email) {
    setStatus("error");
    return;
  }

  setStatus("sending");

  try {
    const response = await fetch(
      "http://localhost:5000/api/otp/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || "Failed to send OTP"
      );
    }

    setStatus("sent");
  } catch (error) {
    console.error("Send OTP error:", error);
    setStatus("error");
  }
};

  const confirmOtp = async (field: "phone" | "email") => {
  const setStatus =
    field === "phone" ? setPhoneStatus : setEmailStatus;

  const otp = field === "phone" ? phoneOtp : emailOtp;

  if (otp.length !== 6) return;

  // Skip phone OTP verification for now
  if (field === "phone") {
    setStatus("verified");
    return;
  }

  setStatus("verifying");

  try {
    const response = await fetch(
      "http://localhost:5000/api/otp/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      }
    );

    const data = await response.json();

     if (!response.ok || !data?.success) {
      setStatus("error");
      return;
    }

    // Only backend-confirmed OTP can become verified
    setStatus("verified");
  } catch (error) {
    console.error("OTP verification error:", error);
    setStatus("error");
  }
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (phoneStatus !== "verified" || emailStatus !== "verified") {
      setError("Phone aur Email dono verify karna zaroori h.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password aur Confirm Password match nahi kar rahe.");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: apna create-account API call yahan lagao (POST /api/auth/register)
     
      fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone, email, password })
      }); 
    } catch (err: any) {
      setError(err?.message || "Account create nahi ho paya. Dobara try karo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <VerifyField
        label="Phone Number"
        icon={Phone}
        type="tel"
        placeholder="Enter your mobile number"
        value={phone}
        onChange={setPhone}
        status={phoneStatus}
        onSendOtp={() => sendOtp("phone")}
        otpValue={phoneOtp}
        onOtpChange={setPhoneOtp}
        onConfirmOtp={() => confirmOtp("phone")}
      />

      <VerifyField
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        status={emailStatus}
        onSendOtp={() => sendOtp("email")}
        otpValue={emailOtp}
        onOtpChange={setEmailOtp}
        onConfirmOtp={() => confirmOtp("email")}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
        <div className="flex items-center gap-2.5 h-12 px-3.5 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-colors">
          <Lock size={18} className="text-slate-400 shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-slate-400 hover:text-slate-600">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
        <div className="flex items-center gap-2.5 h-12 px-3.5 border border-slate-200 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-colors">
          <Lock size={18} className="text-slate-400 shrink-0" />
          <input
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="w-full bg-transparent text-sm outline-none"
          />
          <button type="button" onClick={() => setShowConfirm((s) => !s)} className="text-slate-400 hover:text-slate-600">
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold transition-colors"
      >
        {submitting ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}

/* ---------------- Page ---------------- */

export default function Registration() {
  const [mode, setMode] = useState<Mode>("register");
  const [registered, setRegistered] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden lg:h-[680px]">
        {/* Desktop: sliding split panel */}
        <div className="hidden lg:block absolute inset-0">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 ease-in-out ${
              mode === "register" ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <IllustrationPanel />
          </div>

          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-y-auto transition-transform duration-700 ease-in-out ${
              mode === "register" ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="h-full flex flex-col justify-center px-10 py-10">
              {registered ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="text-emerald-500 mx-auto" size={48} />
                  <h2 className="text-xl font-bold text-slate-900 mt-4">Account created!</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    Phone aur email dono verify ho gaye — ab login kar sakte ho.
                  </p>
                  <button
                    onClick={() => {
                      setMode("login");
                      setRegistered(false);
                    }}
                    className="mt-6 h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                  >
                    Go to Login
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex border-b border-slate-100 mb-8">
                    <button
                      onClick={() => setMode("login")}
                      className={`flex-1 pb-3 text-sm font-semibold relative ${mode === "login" ? "text-blue-600" : "text-slate-400"}`}
                    >
                      Login
                      {mode === "login" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                    </button>
                    <button
                      onClick={() => setMode("register")}
                      className={`flex-1 pb-3 text-sm font-semibold relative ${mode === "register" ? "text-blue-600" : "text-slate-400"}`}
                    >
                      Sign Up
                      {mode === "register" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
                    </button>
                  </div>

                  <div className="text-center mb-7">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      {mode === "login" ? "Welcome Back!" : "Create Your Account"}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      {mode === "login" ? "Login to continue" : "Verify your phone & email to get started"}
                    </p>
                  </div>

                  {mode === "login" ? <LoginFields /> : <RegisterFields onSuccess={() => setRegistered(true)} />}

                  <p className="text-center text-sm text-slate-500 mt-6">
                    {mode === "login" ? (
                      <>
                        Don&apos;t have an account?{" "}
                        <button onClick={() => setMode("register")} className="text-blue-600 font-medium hover:underline">
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button onClick={() => setMode("login")} className="text-blue-600 font-medium hover:underline">
                          Login
                        </button>
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: no illustration, no slide animation */}
        <div className="lg:hidden px-6 py-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 flex items-center justify-center mb-2">
              <Droplet className="text-white" size={22} fill="white" />
            </div>
            <p className="font-extrabold text-xl text-slate-900">
              Aqua<span className="text-blue-600">Alert</span>
            </p>
          </div>

          <div className="flex border-b border-slate-100 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 pb-3 text-sm font-semibold relative ${mode === "login" ? "text-blue-600" : "text-slate-400"}`}
            >
              Login
              {mode === "login" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 pb-3 text-sm font-semibold relative ${mode === "register" ? "text-blue-600" : "text-slate-400"}`}
            >
              Sign Up
              {mode === "register" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
            </button>
          </div>

          {mode === "login" ? <LoginFields /> : <RegisterFields onSuccess={() => setRegistered(true)} />}
        </div>
      </div>
    </div>
  );
}