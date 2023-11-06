import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
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
import styles from '../../../css/dashboard.module.css'


let cx = classNames.bind(styles);
const Users = () => {
    const [users, setUsers] = useState([]);
    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(users, 8);


    useEffect(() => {
        getUsers();
    }, []);


    function getUsers() {
        axios.get('https://amiristore.rf.gd/Server/api/users/users.php').then(function (response) {
            setUsers(response.data.data);
        });
    }
    return (
        <>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Họ và tên</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Số điện thoại</th>
                        <th scope='col'>Giới tính</th>
                        <th scope='col'>Vai trò</th>
                        <th scope='col'>Tùy chỉnh</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        users.map((item, key) => {
                            return (
                                <tr>
                                    <td style={{ width: '10vh' }}>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src={item.avatar}
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-2'>
                                                <p className='fw-bold mb-1'>{item.fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ width: '10vh' }}>
                                        <p className='fw-normal mb-1'>{item.email}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.phone}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.sex == '1' ? <span>Nam</span> : <span>Nữ</span>}</p>
                                    </td>

                                    <td style={{ width: '20vh' }}>
                                        {item.role == '1' ? <span>

                                            <div style={{ textAlign: 'center', padding: '7px', backgroundColor: 'white', color: 'black', borderRadius: '5px' }}>
                                                Khách hàng
                                            </div>
                                        </span> : <span>
                                            <div style={{ textAlign: 'center', padding: '7px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>
                                                Quản lý
                                            </div></span>}

                                    </td>
                                    <td style={{ width: '20vh' }}>
                                        <NavLink to={`/manager/users/edituser/${item.id}`}>
                                            <button type="button" className="btn btn-success" style={{ marginLeft: '2vh' }}>
                                                Chỉnh sửa
                                            </button>
                                        </NavLink>
                                        <NavLink to={`/manager/users/deleteuser/${item.id}`}>
                                            <button style={{ marginLeft: '2vh' }} type="button" className="btn btn-info mt-2">Xóa</button>

                                        </NavLink>

                                    </td>
                                </tr>
                            )
                        })
                    }
                    <div className={cx('pagination')}>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Quay lại
                        </button>

                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Tiếp tục
                        </button>

                        <div>
                            <input
                                style={{ border: 'none', outline: 'none' }}
                                type="number"
                                value={currentPage}
                                onChange={(e) => goToPage(e.target.value)}
                                min="1"
                                max={totalPages}
                            />
                            <span style={{ marginLeft: '2vh' }}>tới {totalPages} </span>
                        </div>
                    </div>

                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default Users;