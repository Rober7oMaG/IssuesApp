import { FC } from 'react';
import { Outlet } from 'react-router';

export const App: FC = () => {
  return (
    <div className="container mt-3">
    <h1>Git Issues <small>Issues tracking</small></h1>
      <Outlet />
    </div>
  );
};
