import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'staff';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'client' | 'staff') => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, type: 'client' | 'staff'): Promise<boolean> => {
    // Mock login validation (SQL injection prevention would happen server-side)
    const sanitizedEmail = email.trim().toLowerCase();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: sanitizedEmail.split('@')[0],
      email: sanitizedEmail,
      type
    });
    
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration with validation
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedName = name.trim();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful registration
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: sanitizedName,
      email: sanitizedEmail,
      type: 'client'
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
