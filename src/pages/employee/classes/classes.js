import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncSelect from 'react-select/async';

var size = 1;
var token = localStorage.getItem('token');
var urlAll = ""
async function loadAllClass(page, param, facultyId){
    var url = 'http://localhost:8080/api/class/employee/all?size=' + size+'&sort=classId,desc';
    if(param != null){
        url += '&search='+param;
    }
    if(facultyId != null) {url+= "&facultyId="+facultyId}
    urlAll = url;
    url += '&page='+page;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    return response;
}

async function loadAllClassByUrl(page){
    const response = await fetch(urlAll+'&page='+page, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    return response;
}

async function loadStudentByClass(classId){
    var url = 'http://localhost:8080/api/student/employee/get-student-by-class?classId='+ classId;
    const response = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    return response;
}

async function loadAllFaculty(){
    const response = await fetch('http://localhost:8080/api/faculty/all/find-all', {
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    return response;
}

async function deleteStudentOnClass(idStudent){
    var con = window.confirm("Xác nhận xóa sinh viên khỏi lớp học này?")
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/student/employee/set-null-class?id=' + idStudent;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    if(response.status < 300){
        toast.success("Xóa sinh viên thành công")
        await new Promise(resolve => setTimeout(resolve, 1500));
        document.getElementById("stdcol"+idStudent).style.display='none';
    }
    else{
        if(response.status == 417){
            var result  = await response.json();
            toast.error(result.errorMessage)
        } 
        else{
            toast.error("Xóa thất bại")
        }
    }
}

async function deleteClass(id){
    var con = window.confirm("Xác nhận xóa lớp học này?")
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/class/employee/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    if(response.status < 300){
        toast.success("Xóa lớp thành công")
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.reload();
    }
    else{
        if(response.status == 417){
            var result  = await response.json();
            toast.error(result.errorMessage)
        } 
        else{
            toast.error("Xóa thất bại")
        }
    }
}

function EmployeeClass(){
    const [items, setItems] = useState([]);
    const [itemFaculty, setItemFaculty] = useState([]);
    const [itemStudent, setItemStudent] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        const getClass = async(page) =>{
            const response = await loadAllClass(page,null,null);
            var result = await response.json();
            var totalPage = result.totalPages;
            setItems(result.content)
            setpageCount(totalPage);
        };
        getClass(0);
        const getFaculty = async() =>{
            const response = await loadAllFaculty();
            var result = await response.json();
            var first = [{facultyId:"",name:"Tất cả khoa"}]
            setItemFaculty(first.concat(result))
        };
        getFaculty();
    }, []);

    const fetchClass = async (page) => {
        const res = await loadAllClassByUrl(page);
        var result = await res.json();
        var totalPage = result.totalPages;
        setItems(result.content)
        setpageCount(totalPage);
        return result.content;
    };

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        const listClass = await fetchClass(currentPage);
        // setItems(listClass);
    }

    async function loadByFaculty(e){
        urlAll = 'http://localhost:8080/api/class/employee/all?size=' + size+'&sort=classId,desc';
        if(e.facultyId != null && e.facultyId != "") {
            urlAll+= "&facultyId="+e.facultyId
        }
        const listClass = await fetchClass(0);
    }

    async function searchByParam(e){
        var param = "";
        if(document.getElementById("searchtable")){
            param = document.getElementById("searchtable").value
        }
        urlAll = 'http://localhost:8080/api/class/employee/all?size=' + size+'&sort=classId,desc';
        var idFaculty = document.querySelector('input[name=faculty]').value
        if(idFaculty != null && idFaculty != "") {
            urlAll+= "&facultyId="+idFaculty
        }
        urlAll +='&search='+param
        const listClass = await fetchClass(0);
    }

    async function loadStudent(idclass){
        const response = await loadStudentByClass(idclass);
        var result = await response.json();
        setItemStudent(result);
    }

    return (
        <div>
        <div class="col-sm-12 header-sp">
            <div class="row">
                <div className="col-md-3 col-sm-6 col-6">
                    <a href='add-class' className='btn btn-primary'>Thêm lớp</a>
                </div>
                <div className='col-md-4 col-sm-6 col-6'>
                <AsyncSelect  name='faculty'
                onChange={loadByFaculty}
                defaultOptions={itemFaculty} 
                getOptionLabel={(itemFaculty)=>itemFaculty.name} 
                getOptionValue={(itemFaculty)=>itemFaculty.facultyId}  
                placeholder="Lọc theo khoa"/>
                </div>
            </div>
        </div>
        <div class="col-sm-12">
            <div class="wrapper">
                <div class="headertable">
                    <div class="divsearchtb">
                        <label className='lbsearch'>search:</label>
                        <input onChange={searchByParam} id="searchtable" placeholder="tìm kiếm" class="inputsearchtable" />
                    </div>
                </div>
                <table class="table table-striped tablefix">
                    <thead class="thead-tablefix">
                        <tr>
                            <th>id</th>
                            <th>Tên lớp</th>
                            <th>Giảng viên</th>
                            <th>Khoa</th>
                            <th class="sticky-col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item=>{
                            return <tr>
                                <td>{item.classId}</td>
                                <td>{item.name}</td>
                                <td>{item.lecturer==null?"":item.lecturer.user.username +"-"+item.lecturer.profile.fullname}</td>
                                <td>{item.faculty==null?"":item.faculty.name}</td>
                                <td class="sticky-col">
                                    <a href={"add-class?id="+item.classId}><i className='fa fa-edit iconaction'></i></a>
                                    <i onClick={()=>deleteClass(item.classId)} className='fa fa-trash iconaction'></i>
                                    <i onClick={()=>{loadStudent(item.classId)}} data-bs-toggle="modal" data-bs-target="#liststudent" className='fa fa-eye iconaction'></i>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <ReactPaginate 
            marginPagesDisplayed={2} 
            pageCount={pageCount} 
            onPageChange={handlePageClick}
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
        <div class="modal fade" id="liststudent" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chọn file để import</h5> <button id='btnclosemodal' type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                        <table class="table table-striped tablefix">
                        <thead class="thead-tablefix">
                            <tr>
                                <th>id</th>
                                <th>Mã sinh viên</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th class="sticky-col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {itemStudent.map(item=>{
                                return <tr id={"stdcol"+item.studentId}>
                                    <td>{item.studentId}</td>
                                    <td>{item.user.username}</td>
                                    <td>{item.profile.fullname}</td>
                                    <td>{item.profile.email}</td>
                                    <td class="sticky-col">
                                        <i onClick={()=>deleteStudentOnClass(item.studentId)} className='fa fa-trash iconaction'></i>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
}

export default EmployeeClass;