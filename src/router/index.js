import layoutAdmin from '../layout/admin/Layout'
import homeAdmin from '../pages/admin/home/home'

const publicRoutes = [
   
];

const privateRoutes = [
    
];

const adminRoutes = [
    { path: "/admin/home", component: homeAdmin, layout: layoutAdmin }
];

export { publicRoutes, privateRoutes, adminRoutes };
