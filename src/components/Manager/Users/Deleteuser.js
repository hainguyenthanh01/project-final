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
import usePagination from '../../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../../css/editproducts.module.css'

let cx = classNames.bind(styles);
const Deleteuser = () => {
    const history = useHistory()
    const { id } = useParams();

    const [user, setUser] = useState([]);


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


    const DeleteUser = (id) => {
        axios.delete(`https://amiristore.rf.gd/Server/api/users/deleteuser.php?id=${id}`)
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                history.push('/manager/users');
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
                <h3>Xóa người dùng</h3>
                <h5>Bạn có chắc chắn người dùng này.</h5>
                <p style={{ fontSize: '20px' }}>{user.fullname}</p>
                <NavLink to='/manager/users'>
                    <button type="button" className="btn btn-dark mt-4 m-4">Quay về</button>

                </NavLink>
                <button onClick={(id) => DeleteUser(user.id)} type="button" className="btn btn-danger mt-4  m-4">Xóa người dùng</button>


            </div>
        </div>
    )
}
export default Deleteuser;