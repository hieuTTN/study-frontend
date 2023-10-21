import {toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import 'react-toastify/dist/ReactToastify.css';

var token = localStorage.getItem('token');

var uls = new URL(document.URL)
var id = uls.searchParams.get("id");

async function loadAllFaculty(){
    const response = await fetch('http://localhost:8080/api/faculty/all/find-all', {
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    return response;
}
async function loadAllLecture(){
    const response = await fetch('http://localhost:8080/api/lecture/employee/find-All', {
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    return response;
}


async function loadClass(){
    if(id != null){
        var url = 'http://localhost:8080/api/class/employee/find-by-id?id='+id
        const response = await fetch(url, {
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        return response;
    }
    return null;
}

async function loadStudentByFacultyName(facultyname, hasClass){
    const response = await fetch('http://localhost:8080/api/student/employee/get-student-by-facultyname?facultyName='+facultyname+'&hasClass='+hasClass, {
        headers: new Headers({ 'Authorization': 'Bearer ' + token })
    });
    return response;
}

async function saveClass(event){
    event.preventDefault();
    var listStudent = event.target.elements.student;
    var arrStudentId = [];
    var i=0;
    for(i=0; i<listStudent.length; i++){
        arrStudentId.push(listStudent[i].value)
    }
    const payload = { 
        name:event.target.elements.className.value,
        lecturerId:event.target.elements.lecturer.value,
        facultyId:event.target.elements.faculty.value,
        listIdStudent:arrStudentId,
    }
    var url = 'http://localhost:8080/api/class/employee/create'
    if(id != null){
        url = 'http://localhost:8080/api/class/employee/update/'+id;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });
    if (response.status < 300) {
        toast.success("Thành công");
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = 'class';
    }
    if (response.status == 417) {
        var result = await response.json()
        toast.warning(result.errorMessage);
    }
}



const AdminAddEmployee = ()=>{
    const [itemLecture, setLecture] = useState([]);
    const [itemFaculty, setFaculty] = useState([]);
    const [itemStudent, setItemStudent] = useState([]);
    const [initLecture, setInitLecture] = useState({});
    const [initFaculty, setInitFaculty] = useState(null);
    const [classes, setClassess] = useState(null);
    useEffect(()=>{
        const getFaculty = async() =>{
            const response = await loadAllFaculty();
            var result = await response.json();
            setFaculty(result)
        };
        getFaculty();
        const getLecture = async() =>{
            const response = await loadAllLecture();
            var result = await response.json();
            setLecture(result)
        };
        getLecture();


        const loadInit = async() =>{
            if(id != null){
                const response = await loadClass();
                var result = await response.json();
                setClassess(result)
                if(result.faculty != null){
                    setInitFaculty({facultyId:result.faculty.facultyId,name:result.faculty.name})
                }
                if(result.lecturer != null){
                    setInitLecture({lecturerId:result.lecturer.lecturerId,
                       username:result.lecturer.user.username+"-"+result.lecturer.profile.fullname})
                }
            }
        };
        loadInit();
    },[]);
    console.log(initFaculty)

    async function loadStudentByFaculty(e){
        var facultyName = e.name;
        var hasClass = document.getElementById("hasclass").checked;
        const response = await loadStudentByFacultyName(facultyName, hasClass);
        var result = await response.json();
        setItemStudent(result)
    }

    return(
        <form onSubmit={saveClass} className='row' method='post'>
            <h4>Thêm/ cập nhật lớp</h4>
            <div className="col-sm-5">
                <label className="lb-form">Tên lớp</label>
                <input defaultValue={classes==null?"":classes.name} name="className" className="form-control" />
                <label className="lb-form">Giảng viên</label>
                <AsyncSelect 
                value={initLecture}
                onChange={(item) => {
                    setInitLecture(item);
                  }}
                defaultOptions={itemLecture} 
                getOptionLabel={(itemLecture)=>itemLecture.user?itemLecture.user.username+"-"+itemLecture.profile.fullname:""} 
                getOptionValue={(itemLecture)=>itemLecture.lecturerId} 
                name='lecturer' placeholder='Chọn giảng viên cho lớp' />
                <label className="lb-form">Khoa</label>
                <AsyncSelect
                value={initFaculty}
                onChange={(item) => {
                    setInitFaculty(item);
                  }}
                defaultOptions={itemFaculty} 
                getOptionLabel={(itemFaculty)=>itemFaculty.name} 
                getOptionValue={(itemFaculty)=>itemFaculty.facultyId} 
                name='faculty' placeholder='Chọn khoa cho lớp' />
            </div>
            <div className="col-sm-7">
                <label className="lb-form">Lọc sinh viên theo khoa</label>
                <AsyncSelect 
                onChange={loadStudentByFaculty}
                 defaultOptions={itemFaculty} 
                 getOptionLabel={(itemFaculty)=>itemFaculty.name} 
                 getOptionValue={(itemFaculty)=>itemFaculty.name} 
                placeholder='Lọc sinh viên theo khoa' />
                <label class="checkbox-custom">Sinh viên chưa có lớp
                    <input id='hasclass' type="checkbox" />
                    <span class="checkmark-checkbox"></span>
                </label><br/>
                <label className="lb-form">Chọn sinh viên</label>
                <AsyncSelect 
                name='student'
                defaultOptions={itemStudent} 
                getOptionLabel={(itemStudent)=>itemStudent.user.username+"-"+itemStudent.profile.fullname} 
                getOptionValue={(itemStudent)=>itemStudent.studentId} 
                isMulti placeholder='Chọn giảng viên cho lớp' />
                <br/>
                <button className='btn btn-primary form-control'>Thêm/ cập nhật lớp</button>
            </div>
        </form>
    );
}

export default AdminAddEmployee;