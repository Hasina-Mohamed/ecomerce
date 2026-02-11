import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext'
import ProtectedRoute from './components/ProtectedRoute'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import ShopLayout from './layouts/ShopLayout'

// Shop Pages
import Home from './pages/shop/Home'
import Shop from './pages/shop/Shop'
import Categories from './pages/shop/Categories'
import ProductList from './pages/shop/ProductList'
import ProductDetails from './pages/shop/ProductDetails'
import Collections from './pages/shop/Collections'
import OurStory from './pages/shop/OurStory'
import Journal from './pages/shop/Journal'
import Contact from './pages/shop/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Cart from './pages/shop/Cart'
import Checkout from './pages/shop/Checkout'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProductManagement from './pages/admin/ProductManagement'
import OrderHistory from './pages/admin/OrderHistory'
import CustomerBase from './pages/admin/CustomerBase'
import Reports from './pages/admin/Reports'
import PaymentHistory from './pages/admin/PaymentHistory'

function App() {
  return (
    <BrowserRouter>
      <ShopContextProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Shop Routes - Public */}
          <Route element={<ShopLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* Admin Routes - Protected (Admin Only) */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="customers" element={<CustomerBase />} />
            <Route path="reports" element={<Reports />} />
            <Route path="payments" element={<PaymentHistory />} />
          </Route>

          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ShopContextProvider>
    </BrowserRouter>
  )
}

export default App
