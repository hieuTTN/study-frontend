import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './login.scss'
import logologin from '../../assest/images/logo.png'
import { loginAct } from '../../../services/auth';
import Header from '../../../layout/user/header/header'


function login(){
    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value
        };
        const res = await loginAct(payload);
        var result = await res.json()
        console.log(result);
        if (res?.status == 417) {
            toast.error(result.errorMessage);
        }
        if(res.status < 300){
            toast.success('Đăng nhập thành công!');
            await new Promise(resolve => setTimeout(resolve, 3000));
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            if (result.user.authorities.name === "ROLE_ADMIN") {
                window.location.href = 'admin/index';
            }
            if (result.user.authorities.name === "ROLE_EMPLOYEE") {
                window.location.href = 'employee/index';
            }
            if (result.user.authorities.name === "ROLE_STUDENT") {
                window.location.href = '/';
            }
            if (result.user.authorities.name === "ROLE_TEACHER") {
                window.location.href = '/';
            }
        }
    };


    return(
        
        <div className="login-form">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <img src={logologin} className="img-login" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 content-login">
                <form onSubmit={handleSubmit} method='post'>
                    <h4 className='center-text'>Đăng Nhập</h4>
                    <label>Tên đăng nhập</label>
                    <input required name='username' id="username" type="text" placeholder="Tên đăng nhập" className="form-control"/>
                    <label>Mật khẩu</label>
                    <input required name='password' id="password" type="password" placeholder="******" className="form-control"/>
                    <button type='submit' className="btn-login">Đăng nhập</button>
                    <a className="forgot-password" data-bs-toggle="modal" data-bs-target="#exampleModalhocvien">Quên mật khẩu</a>
                </form>
                </div>
            </div>
        </div>
        
    );
}
export default login;