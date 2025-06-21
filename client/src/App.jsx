import { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { useAuthStore } from './store/useAuthStore';
import apiInstance from './lib/apiInstance';

function App() {
  const {
    user,
    token,
    isRefreshing,
    setToken,
    setUser,
    setIsRefreshing,
    clearAuth,
  } = useAuthStore();

  useEffect(() => {
    function getAccessToken() {
      setIsRefreshing(true);

      apiInstance
        .get('/auth/refresh-token', { withCredentials: true })
        .then((res) => {
          const { accessToken } = res.data;
          setToken(accessToken);
          setUser('data');
        })
        .catch((err) => clearAuth())
        .finally(() => setIsRefreshing(false));
    }

    if (!user || !token) getAccessToken();
  }, []);

  if (isRefreshing) return <div className="fixed inset-0 bg-white z-50" />;

  return <AppRoutes />;
}

export default App;
