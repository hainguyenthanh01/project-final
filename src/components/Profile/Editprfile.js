import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, useParams, NavLink } from "react-router-dom";
import {
    MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBIcon,
    MDBFile
} from 'mdb-react-ui-kit';


import classNames from 'classnames/bind'
import styles from '../../css/edituser.module.css'

let cx = classNames.bind(styles);
const Editprfile = () => {
    const history = useHistory()
    const { id } = useParams();

    const [user, setUser] = useState([]);

    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [addreas, setAddreas] = useState();
    const [phone, setPhone] = useState();
    const [sex, setSex] = useState();
    const [avatar, setAvatar] = useState();

    ///////////Sử lý thêm
    const handleFullname = (event) => {
        setFullname(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleAddreas = (event) => {
        setAddreas(event.target.value);
    }
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }
    const handleSex = (event) => {
        setSex(event.target.value);
    }


    const Toast = Swal.mixin({
        toast: true,
        position: 'center-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });

    const Edituser = (id) => {
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('avatar', avatar);
        formData.append('phone', phone);
        formData.append('addreas', addreas);
        formData.append('sex', sex);

        axios.post(`https://amiristore.rf.gd/Server/api/users/editprofile.php?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                history.push(`/profile/${id}`)
            })
            .catch(error => console.error(error));
    }


    useEffect(() => {
        axios.get(`https://amiristore.rf.gd/Server/api/users/read_user.php?getIDUser=${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));
    }, [id]);


    return (
        <div className={cx('main')}>
            <div className={cx('title')}>
                <p>Chỉnh sửa người dùng</p>
                <h3>{user.fullname}</h3>

                <form className='container'>

                    <MDBInput
                        className='mb-5 mt-3'
                        type='text'
                        onChange={handleFullname}
                        name="fullname"
                        id='fullname'
                        label='Tên của bạn'
                    />
                    <MDBRow className='mb-5 mt-3'>

                        <MDBCol>
                            <MDBInput onChange={handleEmail} type="email" name="email" id='email' label='Nhập email của bạn' />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput onChange={handleAddreas} name="addreas" label='Nhập địa chỉ của bạn' />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow className='mb-5 mt-3'>

                        <MDBCol>
                            <MDBInput onChange={handlePhone} name="phone" label='Số điện thoại' />
                        </MDBCol>
                        <MDBCol>
                            <select className="browser-default custom-select  w-100" onChange={handleSex}>
                                <option selected>Giới tính</option>
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>


                            </select>
                        </MDBCol>
                    </MDBRow>



                    <div style={{ width: '100%', fontSize: '15px' }}>
                        <input type="file" name="img" label='Ảnh đại diện'
                            onChange={(event) => setAvatar(event.target.files[0])}
                        />
                    </div>
                    <NavLink to={`/profile/${id}`}>
                        <button type="button" className="btn btn-dark mt-4 m-4">Quay về</button>

                    </NavLink>
                    <button onClick={(id) => Edituser(user.id)} type="button" className="btn btn-danger mt-4  m-4">Chỉnh sửa người dùng</button>
                </form>
            </div>
        </div>
    )
}
export default Editprfile;