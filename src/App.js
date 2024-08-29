import logo from './logo.svg';
import './App.css';
import { Suspense, useEffect, useState } from 'react';
import Loader from './components/_loader';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { isAuthenticated } from './helpers/localstorage';
import { ToastContainer } from 'react-toastify'
import Login from './views/creator/auth/login';
import Register from './views/creator/auth/register';
import ForgotPassword from './views/creator/auth/forgot_password';
import CreatorLayout from './views/creator/layout';
import GeneralLayout from './views/layout';
import ResetPassword from './views/creator/auth/reset_password';
import AdminLogin from './views/admin/auth/login';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [auth, setAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      setIsAuth(true);
      setAuth({
        user: isAuthenticated()
      })
    }
  }, [location])

  useEffect(() => {
    if (isAuth) {
      setIsAuth(true);
      setAuth({
        user: isAuthenticated()
      })
    }
  }, [isAuth])
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          {!isAuth && (
            <>
              <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password/:token' element={<ResetPassword />} />
              <Route path='/admin/login' element={<AdminLogin setIsAuth={setIsAuth} setAuth={setAuth} />} />
            </>
          )}

          {/* Authenticated Routes */}
          {isAuth && auth && auth.user && (
            <>
              {auth.user.role === 'creator' && (
                <Route path='/creator/*' element={<CreatorLayout />} />
              )}
              <Route path='/login' element={<Navigate to={'/'} />} />
              <Route path='/admin/login' element={<Navigate to={'/'} />} />

            </>
          )}

          <Route exact path='*' element={<GeneralLayout />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
