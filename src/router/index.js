import routes from '../config/routes';
import Admin from '../layouts/Admin/Admin';
import AdminPage from '../pages/AdminPage';
import Users from '../pages/AdminPage/Users/Customers/Customers';
import Categories from '../pages/AdminPage/Categories/Categories';
import Category from '../pages/Category';
import Contact from '../pages/Contact';
import DetailService from '../pages/DetailService/DetailService';
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register/Register';
import Search from '../pages/Search/Search';
import Services from '../pages/Servicers/Services';
import VerifyAccount from '../pages/Auth/VerifyAccount/VerifyAccount';
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword';
import AccountInfor from '../pages/AccountInfor/AccountInfor';
import Staffs from '../pages/AdminPage/Users/Staffs/Staffs';
import ManagerServices from '../pages/AdminPage/ManagerServices/ManagerServices';
import OwnerRevenue from '../pages/AdminPage/OwnerRevenue/OwnerRevenue';
import ManagerOrders from '../pages/AdminPage/ManagerOrders/ManagerOrders';
import StoreService from '../pages/AdminPage/StoreService/StoreService';
import DetailCombo from '../pages/DetailCombo/DetailCombo';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import LoginLayout from '../layouts/LoginLayout/LoginLayout';
import Managers from '../pages/AdminPage/Users/Managers/Managers';
import Partners from '../pages/AdminPage/Users/Partners/Partners';
import StoreOwners from '../pages/AdminPage/Users/StoreOwners/StoreOwners';
import AccountSetting from '../pages/AdminPage/AccountSetting/AccountSetting';
import OwnerVouchers from '../pages/AdminPage/OwnerVouchers/OwnerVouchers';
import OrderDetail from '../pages/OrderDetail/OrderDetail';
import OwnerServices from '../pages/AdminPage/OwnerServices/OwnerServices';
import ManagerComboServices from '../pages/AdminPage/ManagerComboServices/ManagerComboServices';
import ManagerStaffs from '../pages/AdminPage/ManagerStaffs/ManagerStaffs';
import ManagerTask from '../pages/AdminPage/ManagerTasks/ManagerTask';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.login, component: Login, layout: LoginLayout },
    { path: routes.verifyAccount, component: VerifyAccount, layout: LoginLayout },
    { path: routes.resetPassword, component: ResetPassword, layout: LoginLayout },
    { path: routes.register, component: Register, layout: LoginLayout },
    { path: routes.introduce, component: Introduce },
    { path: routes.service, component: Category },
    { path: routes.contact, component: Contact },
    { path: routes.detailService, component: DetailService },
    { path: routes.search, component: Search },
    { path: routes.services, component: Services },
    { path: routes.detailCombo, component: DetailCombo },
    { path: routes.cart, component: Cart },
];

const privateRoutes = [
    { path: routes.account, component: AccountInfor },
    { path: routes.checkout, component: Checkout, layout: Checkout },
    { path: routes.storeService, component: StoreService },
    { path: routes.orderHistory, component: OrderHistory },
    { path: routes.orderDetail, component: OrderDetail },
];

const adminRoutes = [
    // { path: routes.admin, component: AdminLogin, layout: AdminLoginLayout },
    // { path: routes.admin, component: AdminPage, layout: Admin },
    { path: routes.accountSetting, component: AccountSetting, layout: Admin },
    { path: routes.adminUsers, component: Users, layout: Admin },
    { path: routes.adminStaffs, component: Staffs, layout: Admin },
    { path: routes.adminManager, component: Managers, layout: Admin },
    { path: routes.adminPartners, component: Partners, layout: Admin },
    { path: routes.adminStoreOwner, component: StoreOwners, layout: Admin },
    { path: routes.adminCategories, component: Categories, layout: Admin },
    { path: routes.managerCategories, component: ManagerServices, layout: Admin },
    { path: routes.ownerServices, component: OwnerServices, layout: Admin },
    { path: routes.ownerRevenue, component: OwnerRevenue, layout: Admin },
    { path: routes.ownerVouchers, component: OwnerVouchers, layout: Admin },
    { path: routes.managerCombo, component: ManagerComboServices, layout: Admin },
    { path: routes.managerOrders, component: ManagerOrders, layout: Admin },
    { path: routes.managerRevenue, component: OwnerRevenue, layout: Admin },
    { path: routes.managerStaffs, component: ManagerStaffs, layout: Admin },
    { path: routes.managerTask, component: ManagerTask, layout: Admin },
];

export { publicRoutes, privateRoutes, adminRoutes };
