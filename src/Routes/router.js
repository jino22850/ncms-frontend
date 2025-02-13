import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Correspondent from '../pages/correspondent';
import Coverage from '../pages/coverage';
import Payment from '../pages/payment';
import Layout from '../component/layout/layout';
import Login from '../component/login/login';
import Signup from '../component/Signup/Signup';
import ViewCoverage from '../pages/ViewCoverage';
import Category from '../pages/category';
import Subcategory from '../pages/subcategory';
import Event from '../pages/event';
import ViewPayment from '../pages/ViewPayment';
import PaymentReport from '../pages/paymentReport';
import CoverageReport from '../pages/coverageReport';
import CorrespondentReport from '../pages/correspondentReport';
import Summery from '../pages/summery';
import ProtectedRoute from '../component/ProtectedRoute';
import DistrictCoverage from '../pages/districcoverageReport'
import CoveragePayment from '../pages/CoveragePayment';

function Router() {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/login" />} />


        
        <Route
          path="/Dashboard"
          element={
             <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute> 
          }
        />
        <Route
          path="/correspondent"
          element={
             <ProtectedRoute>
              <Correspondent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coverage"
          element={
            <ProtectedRoute>
              <Coverage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subcategory"
          element={
            <ProtectedRoute>
              <Subcategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <Event />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcoverage"
          element={
            <ProtectedRoute>
              <ViewCoverage />
            </ProtectedRoute>
          }
        />

<Route
          path="/coveragepayment"
          element={
            <ProtectedRoute>
              <CoveragePayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewPayments"
          element={
            <ProtectedRoute>
              <ViewPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coverage/:coverageNumber"
          element={
            <ProtectedRoute>
              <Coverage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentReport"
          element={
            <ProtectedRoute>
              <PaymentReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coverageReport"
          element={
            <ProtectedRoute>
              <CoverageReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/correspondentReport"
          element={
            <ProtectedRoute>
              <CorrespondentReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/districtCoverage"
          element={
            <ProtectedRoute>
              <DistrictCoverage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summery"
          element={
            <ProtectedRoute>
              <Summery />
            </ProtectedRoute>
          }
        />

<Route
          path="/signup"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
    
  );
}

export default Router;
