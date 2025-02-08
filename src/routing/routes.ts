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
import PromoProducts from '../features/promos/view/PromoProducts';
import AddBespokeCloth from '../features/products/view/AddBespokeCloth';
import AddBespokeShoe from '../features/products/view/AddBespokeShoe';
import Baskets from '../features/basket';
import UnitOrdersIndex from '../features/orders/views/UnitOrdersIndex';
import ProductOrderOptions from '../features/orders/views/ProductOrderOptions';
import ProductOrders from '../features/orders/views/ProductOrders';
import Payments from '../features/payments';
import Payment from '../features/payments/Payment';
import ProductOrder from '../features/orders/views/ProductOrder';
import NewFeature from '../features/NewFeature';
import BodyMeasurement from '../features/controlPanel/bodymeasurement.tsx';
import DeliveryFee from '../features/controlPanel/deliveryFee';
import ExchangeRate from '../features/controlPanel/exchangeRate';
import BodyMeasurementGuideLayout from '../features/controlPanel/bodymeasurement.tsx/components/BodyMeasurementGuideLayout';
import Welcome from '../features/controlPanel/emailTemplate/view/Welcome';

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
    path: '/baskets/',
    component: Baskets,
  },
  {
    path: '/orders/',
    component: Orders,
  },
  {
    path: '/orders/unitOrders',
    component: UnitOrdersIndex,
  },
  {
    path: '/orders/product-orders',
    component: ProductOrderOptions,
  },
  {
    path: '/orders/product-order/:productOrder_id',
    component: ProductOrder,
  },
  {
    path: '/orders/product-orders/:status',
    component: ProductOrders,
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
    path: '/products/:shopId/add-product/bespokeCloth',
    component: AddBespokeCloth,
  },
  {
    path: '/products/:shopId/add-product/bespokeCloth/:id',
    component: AddBespokeCloth,
  },
  {
    path: '/products/:shopId/add-product/bespokeShoe',
    component: AddBespokeShoe,
  },
  {
    path: '/products/:shopId/add-product/bespokeShoe/:id',
    component: AddBespokeShoe,
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
    path: '/promo/:promoId/products',
    component: PromoProducts,
  },
  {
    path: 'vouchers',
    component: Vouchers,
  },
  {
    path: 'payments',
    component: Payments,
  },
  {
    path: 'payment/:reference',
    component: Payment,
  },
  {
    path: '/control-panel/body-measurement',
    component: BodyMeasurement,
  },
  {
    path: '/control-panel/body-measurement/:gender',
    component: BodyMeasurementGuideLayout,
  },
  {
    path: '/control-panel/delivery-fee',
    component: DeliveryFee,
  },
  {
    path: '/control-panel/exchange-rate',
    component: ExchangeRate,
  },
  {
    path: '/control-panel/welcome-email',
    component: Welcome,
  },

  {
    path: '/SignIn',
    component: SignIn,
  },
  {
    path: '/profile',
    component: MyProfile,
  },
  {
    path: '/reports',
    component: NewFeature,
  },
  {
    path: '/marketplace',
    component: NewFeature,
  },
  {
    path: '/helpDesk',
    component: NewFeature,
  },
];

export default routes;
