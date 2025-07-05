import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphql/client';
import { TelegramLogin } from './components/auth/TelegramLogin';
import { StoreList } from './components/store/StoreList';
import { useUser } from './api/hooks';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<TelegramLogin />} />
          <Route
            path="/stores"
            element={
              <PrivateRoute>
                <StoreList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/stores" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}; 