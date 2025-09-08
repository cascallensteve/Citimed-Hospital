import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on initial load
    const checkAuth = async () => {
      try {
        // TODO: Implement token verification with backend
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          // const response = await verifyToken(token);
          // setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await loginUser(email, password);
      // localStorage.setItem('token', response.token);
      // setUser(response.user);
      
      // Mock response for now
      const mockUser = {
        id: '1',
        email,
        role: email.includes('super') ? 'superadmin' : 'admin' as const,
      };
      
      setUser(mockUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
