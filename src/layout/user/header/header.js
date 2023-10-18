import styles from './header.scss';
import logo from '../../../assest/images/logo.png';

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('/login')
}

function header (){
    var token = localStorage.getItem('token');
    var authen = <li className="nav-item"><a className="nav-link" href="/login">Đăng nhập</a></li>
    if(token != null){
        authen = <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Tài khoản
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="account.html">Tài khoản</a></li>
                    <li><a className="dropdown-item logoutitem" onClick={logout}>Đăng xuất</a></li>
                    </ul>
                </li>
    }
    return(
        <div>
            <div className="menutop">
            <div className="container listmenutop">
            <img src={logo} className="imglogo" />
            <div className="searchheader">
                <form className="input-group">
                <input className="inputsearchheader" placeholder="Tìm kiếm" name="title" />
                <button className="btnsearchheader">
                    <i className="fa fa-search iconsearchheader"></i>
                </button>
                </form>
            </div>
            <div className="d-lg-flex ms-auto">
                <a className="hotline-item itemphone" href="tel:02462947586">
                <i className="fa fa-phone"></i>
                <span className="d-none d-xl-inline ms-2">02462947586</span>
                </a>
                <a className="hotline-item" href="mailto:dinotechschool@imap.edu.vn">
                <i className="fa fa-envelope"></i>
                <span className="d-none d-xl-inline ms-2">dinotechschool@imap.edu.vn</span>
                </a>
            </div>
            </div>
            </div>


        <div id="navigation">
            <div className="container menubottom">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav navbar-nav-hover navbar-nav-effect">
                    <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Trang chủ</a></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Về chúng tôi
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="#">Sản phẩm học viên</a></li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Khóa học
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item"><a className="nav-link" href="/intro">Lịch khai giảng</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Tài liệu</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Tin tức</a></li>
                    {authen}
                    </ul>
                </div>
                </div>
            </nav>
            </div>
        </div>
        </div>
    );

    
}

export default header;