import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Factory, Zap, Mail, Lock, User, Phone, Building, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

const THEME_VARS = `
  /* LIGHT — premium white + blue only (per instructor's spec) */
  [data-theme="light"] {
    --bg: #ffffff;
    --bg-soft: #f8fafc;
    --bg-soft-2: #eef4ff;
    --surface: #ffffff;
    --surface-2: #f5f9ff;
    --text: #0f172a;
    --text-soft: #5b6b82;
    --text-muted: #8291a6;
    --accent: #2563eb;
    --accent-strong: #1d4ed8;
    --accent-strong-alt: #1e40af;
    --accent-soft: #60a5fa;
    --accent-deep: #1e3a8a;
    --card-1: #2563eb;
    --card-2: #1d4ed8;
    --card-3: #3b82f6;
    --card-4: #1e3a8a;
    --accent-tint: rgba(37, 99, 235, 0.08);
    --accent-tint-strong: rgba(37, 99, 235, 0.14);
    --border: rgba(37, 99, 235, 0.14);
    --border-strong: rgba(37, 99, 235, 0.3);
    --hero-from: #eff6ff;
    --hero-via: #ffffff;
    --hero-to: #ffffff;
    --nav-bg: rgba(255, 255, 255, 0.85);
    --shadow-color: rgba(30, 64, 175, 0.12);
    --pill-text: #1d4ed8;
    --success: #2563eb;
    --btn-text: #ffffff;
  }

  /* DARK — original AtomOne palette, unchanged: navy bg, cyan + gold + green */
  [data-theme="dark"] {
    --bg: #0f172a;
    --bg-soft: #1e293b;
    --bg-soft-2: #172554;
    --surface: #1e293b;
    --surface-2: #172554;
    --text: #f1f5f9;
    --text-soft: #94a3b8;
    --text-muted: #94a3b8;
    --accent: #06b6d4;
    --accent-strong: #fbbf24;
    --accent-strong-alt: #f59e0b;
    --accent-soft: #10b981;
    --accent-deep: #a78bfa;
    --card-1: #f97316;
    --card-2: #38bdf8;
    --card-3: #22c55e;
    --card-4: #a78bfa;
    --accent-tint: rgba(6, 182, 212, 0.1);
    --accent-tint-strong: rgba(6, 182, 212, 0.18);
    --border: rgba(6, 182, 212, 0.2);
    --border-strong: rgba(6, 182, 212, 0.4);
    --hero-from: #1e3a8a;
    --hero-via: #1e293b;
    --hero-to: #0f172a;
    --nav-bg: rgba(15, 23, 42, 0);
    --shadow-color: rgba(0, 0, 0, 0.4);
    --pill-text: #06b6d4;
    --success: #06b6d4;
    --btn-text: #0f172a;
  }
`;

export default function SignUpPage({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Initialize theme from localStorage to match landing page exactly
  const [theme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("atomone-theme") || "light";
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (onLogin) {
      console.log('📝 SignUp - Setting auth TRUE');
      onLogin();
    }
    
    navigate('/dashboard');
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-[var(--bg)] relative overflow-hidden flex flex-col lg:flex-row transition-colors duration-300">
      <style>{THEME_VARS}</style>

      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, var(--accent-tint) 0%, transparent 70%)'
                : 'radial-gradient(circle, var(--accent-tint-strong) 0%, transparent 70%)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Left Panel */}
    {/* Left Panel */}
<div className="hidden lg:flex lg:w-1/2 relative z-10">
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] transition-colors duration-300" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNMTggMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTAgMTJjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmYmJmMjQiIHN0cm9rZS13aWR0aD0iMC4zIiBvcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-10" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] shadow-lg shadow-[var(--accent)]/20 flex items-center justify-center">
                <Factory className="w-9 h-9 text-white" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-strong)] shadow-lg shadow-[var(--accent-strong)]/20 flex items-center justify-center">
                <Zap className="w-9 h-9 text-[var(--btn-text)]" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] bg-clip-text text-transparent">
              AtomOne Technologies
            </h1>
            
            <div className="backdrop-blur-xl bg-[var(--surface)]/60 rounded-3xl p-8 border border-[var(--border)] shadow-[0_8px_30px_var(--shadow-color)]">
              <p className="text-[var(--text)] font-medium italic mb-4">
                "Innovation doesn’t follow — it creates the path."
              </p>
              <p className="text-[var(--text-soft)]">- Steve Jobs</p>
            </div>

            <div className="mt-12">
              <div className="backdrop-blur-xl bg-[var(--bg-soft)] rounded-2xl p-6 border border-[var(--border)] shadow-[0_8px_30px_var(--shadow-color)]">
                <h3 className="text-[var(--accent)] mb-4 text-lg font-bold">Join Our Smart Factory Revolution</h3>
                <ul className="space-y-3 text-left text-[var(--text-soft)] font-medium">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[var(--accent-strong)] flex-shrink-0 mt-0.5" />
                    <span>Real-time machine monitoring & analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>AI-powered quality inspection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[var(--accent-strong)] flex-shrink-0 mt-0.5" />
                    <span>Automated alert system</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md my-8"
        >
          <div className="backdrop-blur-xl bg-[var(--surface)]/80 rounded-3xl p-6 sm:p-8 border border-[var(--border-strong)] shadow-[0_20px_80px_var(--shadow-color)]">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-strong)] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[var(--btn-text)]" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--text)] to-[var(--accent-strong)] bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-[var(--text-soft)] text-sm sm:text-base font-medium">Join the Industry 4.0 revolution</p>
            </div>

            {/* Form - NATIVE INPUT ELEMENTS */}
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Please Enter your name"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)] pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Please Enter your Email.id"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-strong)] pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="+91 Enter your number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-strong)] focus:ring-1 focus:ring-[var(--accent-strong)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Company/Department</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-strong)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-strong)] focus:ring-1 focus:ring-[var(--accent-strong)] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)] pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full pl-11 pr-11 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[var(--text)] text-sm font-medium block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent)] pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="w-full pl-11 pr-11 py-2.5 bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent-strong-alt)] hover:shadow-lg hover:shadow-[var(--accent-strong)]/30 text-[var(--btn-text)] font-bold h-12 mt-6 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                Create Account
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border-strong)]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[var(--surface)] text-[var(--text-soft)] font-medium rounded-full">Or</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center text-sm font-medium">
                <span className="text-[var(--text-soft)]">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[var(--accent)] hover:text-[var(--accent-strong)] transition-colors font-bold"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}