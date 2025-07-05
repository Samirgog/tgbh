import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_WITH_TELEGRAM } from '../../api/graphql/mutations';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

export const TelegramLogin: React.FC = () => {
  const [login, { loading, error }] = useMutation(LOGIN_WITH_TELEGRAM, {
    onCompleted: (data) => {
      const { accessToken } = data.loginWithTelegram;
      localStorage.setItem('accessToken', accessToken);
      window.location.href = '/dashboard';
    },
  });

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!window.Telegram?.WebApp?.initData) {
        throw new Error('Telegram WebApp not initialized');
      }

      await login({
        variables: {
          initData: window.Telegram.WebApp.initData,
        },
      });
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (show message to user)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to TGBH</h1>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login with Telegram'}
        </button>
        {error && (
          <p className="mt-4 text-red-500 text-center">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}; 