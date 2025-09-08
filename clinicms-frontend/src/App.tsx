import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import RoleRoute from './components/auth/RoleRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Patients from './pages/admin/Patients';
import Visits from './pages/admin/Visits';
import Pharmacy from './pages/admin/Pharmacy';
import AdminReports from './pages/admin/Reports';
import SuperLayout from './pages/super/SuperLayout';
import Financials from './pages/super/Financials';
import Admins from './pages/super/Admins';
import SuperReports from './pages/super/Reports';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Index redirect based on role */}
            <Route index element={<DashboardIndexRedirect />} />

            {/* Admin nested routes */}
            <Route
              path="admin"
              element={
                <RoleRoute roles={['admin']}>
                  <AdminLayout />
                </RoleRoute>
              }
            />
            <Route
              path="admin/patients"
              element={
                <RoleRoute roles={['admin']}>
                  <Patients />
                </RoleRoute>
              }
            />
            <Route
              path="admin/visits"
              element={
                <RoleRoute roles={['admin']}>
                  <Visits />
                </RoleRoute>
              }
            />
            <Route
              path="admin/pharmacy"
              element={
                <RoleRoute roles={['admin']}>
                  <Pharmacy />
                </RoleRoute>
              }
            />
            <Route
              path="admin/reports"
              element={
                <RoleRoute roles={['admin']}>
                  <AdminReports />
                </RoleRoute>
              }
            />

            {/* Super Admin nested routes */}
            <Route
              path="super"
              element={
                <RoleRoute roles={['superadmin']}>
                  <SuperLayout />
                </RoleRoute>
              }
            />
            <Route
              path="super/financials"
              element={
                <RoleRoute roles={['superadmin']}>
                  <Financials />
                </RoleRoute>
              }
            />
            <Route
              path="super/admins"
              element={
                <RoleRoute roles={['superadmin']}>
                  <Admins />
                </RoleRoute>
              }
            />
            <Route
              path="super/reports"
              element={
                <RoleRoute roles={['superadmin']}>
                  <SuperReports />
                </RoleRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

const DashboardIndexRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'superadmin' ? '/dashboard/super' : '/dashboard/admin'} replace />;
}

export default App
