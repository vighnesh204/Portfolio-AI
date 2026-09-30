import { Outlet } from 'react-router-dom';

// RootLayout wraps every page.
// Add shared UI here in later phases (Header, Nav, PageTransition, etc.).

function RootLayout() {
  return (
    <Outlet />
  );
}

export default RootLayout;
