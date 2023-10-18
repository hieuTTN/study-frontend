import styles from './layout.scss';

function header({ children }){
    return(
        <div class="sb-nav-fixed">
            <nav id="top" class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a class="navbar-brand ps-3" href="#">Quản trị hệ thống</a>
                <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
                <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
                <ul id="menuleft" class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                </ul>
            </nav>
            
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav">
                                <a class="nav-link" href="index.html">
                                    <div class="sb-nav-link-icon"><i class="fa fa-database iconmenu"></i></div>
                                    Tổng quan
                                </a>
                                <a onclick="dangXuat()" class="nav-link" href="#">
                                    <div class="sb-nav-link-icon"><i class="fas fa-sign-out-alt iconmenu"></i></div>
                                    Đăng xuất
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main class="main">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default header;