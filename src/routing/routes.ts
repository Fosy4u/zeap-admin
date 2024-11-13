// import { FirebaseLogin } from '../features/auth/SessionRoutes';
import Default404Page from '../features/404/Default404Page';
import { RouteInterface } from '../interface/interface';
import Dashboard from '../features/dashboard/Dashboard';
import Orders from '../features/orders';
import Products from '../features/products';
import Shops from '../features/shops';
import Users from '../features/users';
import User from '../features/users/User';
import Promos from '../features/promos';
import Vouchers from '../features/vouchers';
import SignIn from '../features/Authentication/SignIn';
import MyProfile from '../features/profile';
import Shop from '../features/shops/Shop';
import AddProduct from '../features/products/view/AddProduct';
import AddReadyMadeCloth from '../features/products/view/AddReadyMadeCloth';
import AddReadyMadeShoe from '../features/products/view/AddReadyMadeShoe';
import AddAccessorie from '../features/products/view/AddAccessories';
import Product from '../features/products/components/Product';

// Define all routes for the app here.
const routes: RouteInterface[] = [
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
    component: Orders,
  },
  {
    path: '/product/:id',
    component: Product,
  },
  {
    path: '/products/',
    component: Products,
  },
  {
    path: '/products/:status',
    component: Products,
  },
  {
    path: '/products/:shopId/add-product',
    component: AddProduct,
  },
  {
    path: '/products/:shopId/add-product/readyMadeCloth',
    component: AddReadyMadeCloth,
  },
  {
    path: '/products/:shopId/add-product/readyMadeCloth/:id',
    component: AddReadyMadeCloth,
  },
  {
    path: '/products/:shopId/add-product/readyMadeShoe',
    component: AddReadyMadeShoe,
  },
  {
    path: '/products/:shopId/add-product/readyMadeShoe/:id',
    component: AddReadyMadeShoe,
  },
  {
    path: '/products/:shopId/add-product/accessory',
    component: AddAccessorie,
  },
  {
    path: '/products/:shopId/add-product/accessory/:id',
    component: AddAccessorie,
  },
  {
    path: '/products/table',
    component: Products,
  },
  {
    path: '/shops/',
    component: Shops,
  },
  {
    path: '/shops/:id',
    component: Shop,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/users/table',
    component: Users,
  },
  {
    path: '/users/:id',
    component: User,
  },
  {
    path: '/promos',
    component: Promos,
  },
  {
    path: 'vouchers',
    component: Vouchers,
  },
  {
    path: '/SignIn',
    component: SignIn,
  },
  {
    path: '/profile',
    component: MyProfile,
  },
];

export default routes;
