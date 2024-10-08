import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/login'; // Adjust the path as necessary
import UserInfor from './components/userinfo'; // Adjust the path as necessary
import Home from './components/home'; // Adjust the path as necessary
import Register from './components/register';
import Admin from './components/admin';
import RegisterProduct from './components/registerProduct';
import ViewProduct from './components/viewProducts';
import ViewCategorie from './components/viewCategories';
import RegisterCategorie from './components/registerCategorie';
import UpdateCategory from './components/updateCategory';
import UpdateProduct from './components/updateProduct';
import Dashboard from './components/dashboard';
import ViewKits from './components/kits';
import ViewCart from './components/cart';
import ViewSales from './components/viewSales';

export function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/userInfo" element={Cookies.get('loggedUser') != undefined ? <UserInfor/> : <Login/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/registerProduct' element={<RegisterProduct/>} />
        <Route path='/viewProducts' element={<ViewProduct/>} />
        <Route path='/viewCategories' element={<ViewCategorie/>} /> 
        <Route path='/registerCategorie' element={<RegisterCategorie/>} />
        <Route path='/updateCategory' element={<UpdateCategory/>} />
        <Route path='/updateProduct' element={<UpdateProduct/>} />
        <Route path='/viewKits' element={<ViewKits/>} />
        <Route path='/viewCart' element={<ViewCart/>} />
        <Route path='/viewSales' element={<ViewSales/>} />
      </Routes>
    </Router>
  );
}