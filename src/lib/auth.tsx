import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
  quickSwitchPersona: (role: 'admin' | 'customer' | 'none') => void;
}

const AUTH_USER_STORAGE_KEY = 'sudhakar_repairs_current_user_v1';
const USERS_DB_STORAGE_KEY = 'sudhakar_repairs_users_db_v1';

// Seed demo credentials
const DEFAULT_USERS: Array<UserProfile & { passwordHash: string }> = [
  {
    id: 'user_admin_sudhakar',
    email: 'admin@sudhakarrepairs.in',
    name: 'Sudhakar (Technician / Admin)',
    phone: '+91 1029384756',
    role: 'admin',
    passwordHash: 'admin123',
  },
  {
    id: 'user_cust_rahul',
    email: 'rahul.sharma@example.com',
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    role: 'customer',
    passwordHash: 'password123',
  },
  {
    id: 'user_cust_priya',
    email: 'priya.reddy@example.com',
    name: 'Priya Reddy',
    phone: '+91 9822334455',
    role: 'customer',
    passwordHash: 'password123',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session & ensure users DB exists
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_DB_STORAGE_KEY);
      if (!storedUsers) {
        localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      }

      const activeSession = localStorage.getItem(AUTH_USER_STORAGE_KEY);
      if (activeSession) {
        setUser(JSON.parse(activeSession));
      }
    } catch (e) {
      console.error('Error initializing auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    try {
      const rawUsers = localStorage.getItem(USERS_DB_STORAGE_KEY) || JSON.stringify(DEFAULT_USERS);
      const users: Array<UserProfile & { passwordHash: string }> = JSON.parse(rawUsers);
      
      const found = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        return { success: false, error: 'No account found with this email. Please check spelling or register.' };
      }

      if (found.passwordHash !== cleanPass) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const sessionUser: UserProfile = {
        id: found.id,
        email: found.email,
        name: found.name,
        phone: found.phone,
        role: found.role,
      };

      setUser(sessionUser);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(sessionUser));
      return { success: true };
    } catch {
      return { success: false, error: 'Authentication service temporarily unavailable.' };
    }
  };

  const register = async (name: string, email: string, pass: string, phone?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanName) return { success: false, error: 'Full name is required.' };
    if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, error: 'A valid email address is required.' };
    if (cleanPass.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

    try {
      const rawUsers = localStorage.getItem(USERS_DB_STORAGE_KEY) || JSON.stringify(DEFAULT_USERS);
      const users: Array<UserProfile & { passwordHash: string }> = JSON.parse(rawUsers);

      if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email already exists. Please log in.' };
      }

      // Security guarantee: Public self-registration ALWAYS creates a customer account, never admin
      const newUser: UserProfile & { passwordHash: string } = {
        id: `user_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        phone: phone?.trim(),
        role: 'customer',
        passwordHash: cleanPass,
      };

      users.push(newUser);
      localStorage.setItem(USERS_DB_STORAGE_KEY, JSON.stringify(users));

      const sessionUser: UserProfile = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
      };

      setUser(sessionUser);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(sessionUser));
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed due to storage error.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  };

  const resetPasswordRequest = async (email: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please provide a valid email address.' };
    }
    // Simulation of secure tokenized reset
    return {
      success: true,
      message: `If an account exists for ${cleanEmail}, password reset instructions have been dispatched. For local testing, default password is "password123".`,
    };
  };

  const quickSwitchPersona = (role: 'admin' | 'customer' | 'none') => {
    if (role === 'none') {
      logout();
      return;
    }

    if (role === 'admin') {
      const admin = DEFAULT_USERS[0];
      const sessionUser: UserProfile = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        phone: admin.phone,
        role: admin.role,
      };
      setUser(sessionUser);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(sessionUser));
    } else {
      const customer = DEFAULT_USERS[1];
      const sessionUser: UserProfile = {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        role: customer.role,
      };
      setUser(sessionUser);
      localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(sessionUser));
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        login,
        register,
        logout,
        resetPasswordRequest,
        quickSwitchPersona,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
