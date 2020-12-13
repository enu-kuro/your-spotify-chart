import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import MySpotifyChart from 'Pages/MySpotifyChart';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MySpotifyChart />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
