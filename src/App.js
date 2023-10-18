import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import {Routes, Route,BrowserRouter as Router} from 'react-router-dom'
import styleApp from './styles/App.scss'
import Home from './pages/public/home/home'
import Header from './layout/user/header/header';
import { publicRoutes, privateRoutes, adminRoutes } from './router/index';
import AdminLayout from './layout/admin/Layout'

function App() {
  // let checkAdmin = window.location.pathname.startsWith("/admin")
  // let checkEmployee = window.location.pathname.startsWith("/employee")
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='/' element={<Home/>} />


            {adminRoutes.map((route, index) => {
              const Layout = route.layout || AdminLayout
              const Page = route.component
              return <Route key={index} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            })}
          </Routes>
      </div>
    </Router>
);

}

export default App;
