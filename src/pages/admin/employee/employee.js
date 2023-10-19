import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var size = 10

const AdminEmployee = ()=>{
    return(
        <div>
        <div class="col-sm-12 header-sp">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-6">
                        <label className='lb-form lbblank'></label>
                        <a href='add-employee' className='btn btn-primary'>Thêm nhân viên</a>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <label className='lb-form'>Chọn khoa</label>
                        <select className='form-control'>
                            <option>khoa 1</option>
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <label className='lb-form lbblank'></label>
                        <button className='btn btn-primary'><i className='fa fa-filter'></i> Lọc</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="wrapper">
                    <table class="table table-striped tablefix">
                        <thead class="thead-tablefix">
                            <tr>
                                <th>id</th>
                                <th>Họ tên</th>
                                <th>Tên đăng nhập</th>
                                <th>Ngày tạo</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Căn cước</th>
                                <th class="sticky-col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody id="listuser">
                        </tbody>
                    </table>
                </div>
                <ReactPaginate 
                marginPagesDisplayed={2} 
                pageCount={23} 
                // onPageChange={handlePageClick}
                containerClassName={'pagination'} 
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

export default AdminEmployee;