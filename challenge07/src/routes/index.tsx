import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

const RoutesFunction: React.FC = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/import" element={<Import />} />
  </Routes>
);

export default RoutesFunction;
