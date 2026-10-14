import React, { useState } from 'react';
import { useAuth } from '../lib/auth';
import { X, Lock, Mail, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, register, resetPasswordRequest, quickSwitchPersona } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Status
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || 'Failed to log in.');
        } else {
          if (onSuccess) onSuccess();
          onClose();
        }
      } else if (mode === 'register') {
        const res = await register(name, email, password, phone);
        if (!res.success) {
          setError(res.error || 'Registration failed.');
        } else {
          if (onSuccess) onSuccess();
          onClose();
        }
      } else if (mode === 'forgot') {
        const res = await resetPasswordRequest(email);
        setInfoMessage(res.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="liquid-glass liquid-glass-specular rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-white/80">
        
        {/* Top Header in Liquid Glass Dark */}
        <div className="liquid-glass-dark text-white px-6 py-4.5 flex items-center justify-between border-b border-white/10">
          <div>
            <h3 className="text-base font-bold tracking-tight">
              {mode === 'login' && 'Sign In to Sudhakar Repairs'}
              {mode === 'register' && 'Create Customer Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-300">
              {mode === 'login' && 'Access your repair history & real-time updates'}
              {mode === 'register' && 'Register to manage current and past repair tickets'}
              {mode === 'forgot' && 'Enter your account email to receive reset instructions'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Persona Switcher Banner for Quick Inspection */}
        <div className="bg-blue-50/70 backdrop-blur-xs border-b border-blue-100/60 p-3.5 text-xs text-blue-900">
          <p className="font-semibold mb-1">Quick Demo Credentials:</p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => {
                quickSwitchPersona('customer');
                onClose();
              }}
              className="px-2.5 py-1 liquid-glass-pill text-blue-700 hover:bg-white font-medium shadow-2xs"
            >
              Test as Customer (Rahul)
            </button>
            <button
              type="button"
              onClick={() => {
                quickSwitchPersona('admin');
                onClose();
              }}
              className="px-2.5 py-1 liquid-glass-pill text-blue-700 hover:bg-white font-medium shadow-2xs"
            >
              Test as Sudhakar (Admin)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">Mobile Number (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                    }}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                'Processing...'
              ) : mode === 'login' ? (
                'Sign In'
              ) : mode === 'register' ? (
                'Create Account'
              ) : (
                'Send Reset Link'
              )}
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
            {mode === 'login' && (
              <p>
                Don’t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Return to sign in
                </button>
              </p>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};
