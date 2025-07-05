import React from 'react';
import { useStores } from '../../api/hooks';
import type { Store } from '../../types/api';

export const StoreList: React.FC = () => {
  const { stores, isLoading, isError } = useStores();

  if (isLoading) {
    return <div>Loading stores...</div>;
  }

  if (isError) {
    return <div>Error loading stores</div>;
  }

  if (!stores?.length) {
    return <div>No stores found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {store.bannerUrl && (
        <img
          src={store.bannerUrl}
          alt={store.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
        {store.description && (
          <p className="text-gray-600 mb-4">{store.description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
            {store.status}
          </span>
          <button
            onClick={() => window.location.href = `/stores/${store.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Store
          </button>
        </div>
      </div>
    </div>
  );
}; 