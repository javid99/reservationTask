import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'avishan-panel-user';

export default function App() {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));

  const handleLogin = (email: string) => {
    localStorage.setItem(STORAGE_KEY, email);
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
