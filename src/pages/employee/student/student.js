import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncSelect from 'react-select/async';

var size = 10;
var token = localStorage.getItem('token');
var urlAll = ""
async function loadAllStudent(page, param, facultyId){
    var url = 'http://localhost:8080/api/student/employee/get-all-student-by-faculty?size=' + size+'&sort=studentId,desc';
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

async function loadAllStudentByUrl(page){
    const response = await fetch(urlAll+'&page='+page, {
        method: 'GET',
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

async function loadClassByFaculty(id){
    const response = await fetch('http://localhost:8080/api/class/employee/class-by-faculty?facultyId='+id, {
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    return response;
}

async function readExcel(){
    document.getElementById("loading").style.display = 'block'

    const filePath = document.getElementById('fileEx')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    if(Number(filePath.files.length) == Number(0)){
        return;
    }
    var con = window.confirm("Xác nhận nhập file sinh viên?")
    if (con == false) {
        return;
    }
    var curyear = document.getElementById("curyear").value
    var url = 'http://localhost:8080/api/student/employee/save-by-file?year='+curyear;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
        body: formData
    });
    if(response.status < 300){
        toast.success("Thành công")
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.reload();
    }
    else{
        if(response.status == 417){
            var result  = await response.json();
            toast.error(result.errorMessage)
        } 
        else{
            toast.error("Thất bại")
        }
    }
    document.getElementById("loading").style.display = 'none'
}



function EmployeeStudent(){
    const [items, setItems] = useState([]);
    const [studentInfor, setStudentInfor] = useState(null);
    const [pageCount, setpageCount] = useState(0);
    const [itemFaculty, setItemFaculty] = useState([]);
    const [itemClass, setItemClass] = useState([]);
    useEffect(()=>{
        const getStudent = async(page) =>{
            const response = await loadAllStudent(page,null,null);
            var result = await response.json();
            var totalPage = result.totalPages;
            setItems(result.content)
            setpageCount(totalPage);
        };
        getStudent(0,null,null);

        const getFaculty = async() =>{
            const response = await loadAllFaculty();
            var result = await response.json();
            var first = [{facultyId:"",name:"Tất cả khoa"}]
            setItemFaculty(first.concat(result))
        };
        getFaculty();
    }, []);


    const fetchStudent = async (page) => {
        const res = await loadAllStudentByUrl(page);
        var result = await res.json();
        var totalPage = result.totalPages;
        setItems(result.content)
        setpageCount(totalPage);
        return result.content;
    };

    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        const listStudent = await fetchStudent(currentPage);
        setItems(listStudent);
    }

    function setStdModal(std){
        setStudentInfor(std);
    }

    function searchByParam(){
        var param = "";
        if(document.getElementById("searchtable")){
            param = document.getElementById("searchtable").value
        }
        var idFaculty = document.querySelector('input[name=faculty]').value
        var idClasses = document.querySelector('input[name=classes]').value
        urlAll = 'http://localhost:8080/api/student/employee/get-all-student-by-faculty?size=' + size+'&sort=studentId,desc';
        urlAll += '&search='+param
        if(idFaculty != "" && idFaculty != null){
            urlAll += '&facultyId='+idFaculty
        }
        if(idClasses != "" && idClasses != null){
            urlAll += '&classId='+idClasses
        }
        console.log(urlAll)
        fetchStudent(0);
    }

    async function hanleOnchangeFaculty(e){
        const response = await loadClassByFaculty(e.facultyId);
        var result = await response.json();
        setItemClass(result)
        urlAll = 'http://localhost:8080/api/student/employee/get-all-student-by-faculty?size=' + size+'&sort=studentId,desc';
        if(e.facultyId != "" && e.facultyId != null){
            urlAll += '&facultyId='+e.facultyId
        }
        else{
            setItemClass([])
        }
        fetchStudent(0);
    }

    async function hanleOnchangeClass(e){
        urlAll = 'http://localhost:8080/api/student/employee/get-all-student-by-faculty?size=' + size+'&sort=studentId,desc';
        if(e.classId != "" && e.classId != null){
            urlAll += '&classId='+e.classId
        }
        fetchStudent(0);
    }



    return (
        <div>
        <div class="col-sm-12 header-sp">
                <div class="row">
                    <div class="col-md-3 col-sm-6 col-6">
                        <a href='add-student' className='btn btn-primary'>Thêm sinh viên</a>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <button data-bs-toggle="modal" data-bs-target="#chooseFile" className='btn btn-primary'><i className='fa fa-file-excel'></i> Chọn file excel</button>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <AsyncSelect
                        name='faculty'
                        onChange={hanleOnchangeFaculty}
                        defaultOptions={itemFaculty} 
                        getOptionLabel={(itemFaculty)=>itemFaculty.name} 
                        getOptionValue={(itemFaculty)=>itemFaculty.facultyId} 
                        placeholder='chọn khoa'/>
                    </div>
                    <div class="col-md-3 col-sm-6 col-6">
                        <AsyncSelect
                        name='classes'
                        onChange={hanleOnchangeClass}
                        defaultOptions={itemClass} 
                        getOptionLabel={(itemClass)=>itemClass.name} 
                        getOptionValue={(itemClass)=>itemClass.classId} 
                        placeholder='chọn lớp'/>
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
                                <th>Mã sinh viên</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Lớp</th>
                                <th>Khoa</th>
                                <th class="sticky-col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item=>{
                                return <tr>
                                    <td>{item.studentId}</td>
                                    <td className='stdcode' onClick={()=>setStdModal(item.studentInfor)} 
                                    data-bs-toggle="modal" data-bs-target="#studentinfor">
                                        {item.user.username}
                                    </td>
                                    <td>{item.profile.fullname}</td>
                                    <td>{item.profile.email}</td>
                                    <td>{item.profile.dob?.split("T")[0]}</td>
                                    <td>{item.profile.gender==true?"Nam":"Nữ"}</td>
                                    <td>{item.profile.phone}</td>
                                    <td>{item.profile.address}</td>
                                    <td>{item.profile.classes!=null?item.profile.classes.name:""}</td>
                                    <td>{item.facultyName}</td>
                                    <td class="sticky-col">
                                        <a href={"add-student?id="+item.studentId}><i className='fa fa-edit iconaction'></i></a>
                                        <i className='fa fa-trash iconaction'></i>
                                        <i onClick={()=>setStdModal(item.studentInfor)} data-bs-toggle="modal" data-bs-target="#studentinfor" className='fa fa-eye iconaction'></i>
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
            <div class="modal fade" id="studentinfor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chi tiết chúng tuyển</h5> <button id='btnclosemodal' type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                        <table class="table table-striped tablefix">
                            <thead class="thead-tablefix">
                                <tr>
                                    <th>Tổ hợp chúng tuyển</th>
                                    <th>Thứ tự nguyện vọng</th>
                                    <th>Môn trúng tuyển</th>
                                    <th>Điểm ưu tiên</th>
                                    <th>Khu vực ưu tiên</th>
                                    <th>Năm tốt nghiệp</th>
                                    <th>Lực học</th>
                                    <th>Hạnh kiểm</th>
                                    <th>Điểm trung bình</th>
                                    <th>Mã tỉnh</th>
                                    <th>Mã trường</th>
                                    <th>Nơi sinh</th>
                                    <th>Dân tộc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{studentInfor==null?"":studentInfor.combinationCode}</td>
                                    <td>{studentInfor==null?"":studentInfor.orderWish}</td>
                                    <td>{studentInfor==null?"":
                                    studentInfor.firstSubjectName+": "+studentInfor.firstMark+", "+
                                    studentInfor.secondSubjectName+": "+studentInfor.secondMark+", "+
                                    studentInfor.thirdSubjectName+": "+studentInfor.thirdMark+", "}</td>
                                    <td>{studentInfor==null?"":studentInfor.priorityMark}</td>
                                    <td>{studentInfor==null?"":studentInfor.priorityArea}</td>
                                    <td>{studentInfor==null?"":studentInfor.graduationYear}</td>
                                    <td>{studentInfor==null?"":studentInfor.rankedAcademic}</td>
                                    <td>{studentInfor==null?"":studentInfor.rankConduct}</td>
                                    <td>{studentInfor==null?"":studentInfor.avgMark}</td>
                                    <td>{studentInfor==null?"":studentInfor.provinceCode}</td>
                                    <td>{studentInfor==null?"":studentInfor.schoolCode}</td>
                                    <td>{studentInfor==null?"":studentInfor.placeOfBirth}</td>
                                    <td>{studentInfor==null?"":studentInfor.ethnicity}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="chooseFile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Chọn file để import</h5> <button id='btnclosemodal' type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                        <div class="modal-body row">
                            <label>Năm học</label>
                            <input id='curyear' type='number' className='form-control'/>
                            <label>Chọn file excel</label>
                            <input id='fileEx' type='file' className='form-control'/>
                            <br/><br/>
                            <div id="loading">
                                <div class="bar1 bar"></div>
                            </div>
                            <br/><br/><br/><button onClick={readExcel} className='btn btn-primary form-control'>Nhập sinh viên</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
}
export default EmployeeStudent;