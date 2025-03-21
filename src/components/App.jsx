import s from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SharedLayout } from './SharedLayout/SharedLayout.jsx';
import RestrictedRoute from './RestrictedRoute.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import '../i18n/index.js';

const HomePage = lazy(() => import('./../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('./../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('./../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('./../pages/TrackerPage/TrackerPage'));
const NotFoundPage = lazy(() => import('./../pages/NotFoundPage/NotFoundPage'));
const GooglePage = lazy(() => import('./../pages/GooglePage/GooglePage'));
const ResetPasswordPage = lazy(() => import('./../pages/ResetPasswordPage/ResetPasswordPage'));
const ChangePasswordPage = lazy(() => import('./../pages/ChangePasswordPage/ChangePasswordPage'));

export function App() {
  return (
    <div className={s.main}>
      <SharedLayout>
        <Suspense fallback={null}>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  component={<HomePage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  component={<SignUpPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  component={<SignInPage />}
                  redirectTo="/tracker"
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute component={<TrackerPage />} redirectTo="/" />
              }
            />
            <Route
              path="/reset-pwd-email"
              element={
                <RestrictedRoute
                  component={<ResetPasswordPage />}
                  redirectTo="/"
                />
              }
            />
            <Route
              path="/change-pwd"
              element={
                <RestrictedRoute
                  component={<ChangePasswordPage />}
                  redirectTo="/signin"
                />
              }
            />
            <Route path="/confirm-google-oauth" element={<GooglePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </div>
  );
}
