import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function handleLogin(event) {
    event.preventDefault();
    const payload = {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value
    };
    const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    var result = await res.json()
    console.log(result);
    if (res?.status == 417) {
        toast.error(result.errorMessage);
    }
    if(res.status < 300){
        toast.success('Đăng nhập thành công!');
        await new Promise(resolve => setTimeout(resolve, 1500));
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        if (result.user.authorities.name === "ROLE_ADMIN") {
            window.location.href = 'admin/home';
        }
        if (result.user.authorities.name === "ROLE_EMPLOYEE") {
            window.location.href = 'employee/home';
        }
        if (result.user.authorities.name === "ROLE_STUDENT") {
            window.location.href = '/';
        }
        if (result.user.authorities.name === "ROLE_TEACHER") {
            window.location.href = '/';
        }
    }
};


export {handleLogin}