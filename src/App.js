import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Userlist from './user/Userlist';
import Portal from './Portal';
import UserCreate from './user/UserCreate';
import UserView from './user/UserView';
import UserEdit from './user/UserEdit';
import Servicelist from './servicelist/Servicelist';
import ServiceCreate from './servicelist/ServiceCreate';
import ServiceEdit from './servicelist/serviceEdit';
import Categorylist from './category/Categorylist';
import CategoryCreate from './category/CategoryCreate';
import CategoryEdit from './category/CategoryEdit';
import DPlist from './deliverypartner/DPlist';
import DPCreate from './deliverypartner/DPCreate';
import DPView from './deliverypartner/DPView';
import DPEdit from './deliverypartner/DPEdit';
import Customerlist from './customer/Customerlist';
import CustomerView from './customer/CustomerView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />}/>
        
        <Route path='/portal' element={<Portal />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='service-list' element={<Servicelist />}/>
          <Route path='service-create' element={<ServiceCreate/>}/>
          <Route path='service-edit/:id' element={<ServiceEdit />} />
          <Route path='category-list' element={<Categorylist />}/>
          <Route path='category-create' element={<CategoryCreate/>}/>
          <Route path='category-edit/:id' element={<CategoryEdit />} />
          <Route path='dp-list' element={<DPlist />} />
          <Route path='create-dp' element={<DPCreate />} />
          <Route path='dp-view/:id' element={<DPView />} />
          <Route path='dp-edit/:id' element={<DPEdit />} />
          <Route path='customer-list' element={<Customerlist />} />
          <Route path='customer-view/:id' element={<CustomerView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
