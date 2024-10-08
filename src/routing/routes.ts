// import { FirebaseLogin } from '../features/auth/SessionRoutes';
import Default404Page from "../features/404/Default404Page"; 
import { RouteInterface } from '../interface/interface';
import Dashboard from '../features/dashboard/Dashboard';
import Orders from "../features/orders";
import Products from "../features/products";
import Shops from "../features/shops";
import Users from "../features/users";
import User from "../features/users/User";
import Promos from "../features/promos";
import Vouchers from "../features/vouchers";
import SignIn from "../features/Authentication/SignIn";
import MyProfile from "../features/profile";


// Define all routes for the app here.
const routes : RouteInterface[]
 = [
  {
    path: '/',
    component: Dashboard,
    isDefault: true,
  },
  {
    path: '/404/',
    component: Default404Page,
    //isDefault: true,
  },
  {
    path: '/orders/',
    component: Orders

  },
  {
    path:'/products/',
    component: Products
  },
  {
    path: '/shops/',
    component: Shops
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/users/:id',
    component: User
  },
  {
    path: '/promos',
    component: Promos 
  },
  {
    path: 'vouchers',
    component: Vouchers
  },
  {
    path: '/SignIn',
    component: SignIn
  },
  {
    path: '/profile',
    component: MyProfile
  }
 
];

export default routes;
