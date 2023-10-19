import layoutAdmin from '../layout/admin/Layout'
import layoutEmployee from '../layout/employee/LayoutEmployee'
import layoutLogin from '../layout/user/loginlayout/login'

//admin
import homeAdmin from '../pages/admin/home/home'
import userAdmin from '../pages/admin/user/user'
import employeeAdmin from '../pages/admin/employee/employee'
import addEmployeeAdmin from '../pages/admin/employee/addemployee'

//employee
import homeEmployee from '../pages/employee/home/home'

//public
import login from '../pages/public/login/login'
import home from '../pages/public/home/home'

const publicRoutes = [
    { path: "/", component: home},
    { path: "/login", component: login, layout: layoutLogin }
];

const privateRoutes = [
    
];

const adminRoutes = [
    { path: "/admin/home", component: homeAdmin, layout: layoutAdmin },
    { path: "/admin/user", component: userAdmin, layout: layoutAdmin },
    { path: "/admin/employee", component: employeeAdmin, layout: layoutAdmin },
    { path: "/admin/add-employee", component: addEmployeeAdmin, layout: layoutAdmin },
];

const employeeRoutes = [
    { path: "/employee/home", component: homeEmployee, layout: layoutEmployee }
];

export { publicRoutes, privateRoutes, adminRoutes, employeeRoutes};
