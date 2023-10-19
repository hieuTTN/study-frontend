import { useState, useEffect } from 'react'
import {loadAllUser,lockOrUnlock} from '../../../services/admin/user'
import ReactPaginate from 'react-paginate';

var size = 10
function AdminUser(){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        const getUser = async(page, role) =>{
            const response = await loadAllUser(page, size,role);
            var result = await response.json();
            var totalPage = result.totalPages;
            var totalElements = result.totalElements;
            setItems(result.content)
            setpageCount(totalPage);
        };
        getUser(0, "");
    }, []);

    const fetchUsers = async (page, role) => {
        const res = await loadAllUser(page, size,role);
        var result = await res.json();
        var totalPage = result.totalPages;
        setpageCount(totalPage);
        return result.content;
    };


    const handlePageClick = async (data)=>{
        var roles = "";
        if(document.getElementById("role")){
            roles = document.getElementById("role").value
        }
        var currentPage = data.selected
        const listUser = await fetchUsers(currentPage,roles);
        setItems(listUser);
    }

    async function loadByRole(){
        var roles = "";
        if(document.getElementById("role")){
            roles = document.getElementById("role").value
        }
        const listUser = await fetchUsers(0, roles)
        console.log(listUser)
        setItems(listUser);
    }


    return (
        <div>
            <div class="col-sm-12 header-sp">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-6">
                            <label className='lbblock lb-form'>&Thinspace</label><br/>
                            <a data-bs-toggle="modal" data-bs-target="#addtk" class="btn btn-success"><i class="fa fa-plus"></i> Thêm admin</a>
                        </div>
                        <div class="col-md-3 col-sm-6 col-6">
                            <label class="lb-form">Chọn quyền</label>
                            <select onChange={loadByRole} id="role" class="form-control">
                                <option value="">Tất cả quyền</option>
                                <option value="ROLE_ADMIN">Tài khoản admin</option>
                                <option value="ROLE_TEACHER">Tài khoản giảng viên</option>
                                <option value="ROLE_EMPLOYEE">Tài khoản nhân viên</option>
                                <option value="ROLE_STUDENT">Tài khoản sinh viên</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="wrapper">
                        <table class="table table-striped tablefix">
                            <thead class="thead-tablefix">
                                <tr>
                                    <th>id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Ngày tạo</th>
                                    <th>Quyền</th>
                                    <th class="sticky-col">Khóa</th>
                                </tr>
                            </thead>
                            <tbody id="listuser">
                                {items.map((item=>{
                                    return <tr>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.authorities.name}
                                    <i className='fa fa-edit faicon'></i></td>
                                    <td class="sticky-col">
                                    {item.actived == true?
                                    <button onClick={()=>lockOrUnlock(item.id, 1) } className='btn btn-primary'>Khóa</button>:
                                    <button onClick={()=>lockOrUnlock(item.id, 0) } className='btn btn-danger'>Mở khóa</button>} 
                                    </td>
                                </tr>
                                }))}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate 
                    marginPagesDisplayed={2} 
                    pageCount={pageCount} 
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'} 
                    pageClassName={'page-item'} 
                    pageLinkClassName={'page-link'}
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'  
                    activeClassName='active'/>
                </div>
        </div>
    );
}

export default AdminUser;