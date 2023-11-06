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
const Cart = () => {
    const history = useHistory()

    const [payment, setPayment] = useState([]);

    function getPayment() {
        axios.get(`https://amiristore.rf.gd/Server/api/cart/read_payment_admin.php`).then(function (response) {
            setPayment(response.data.data);
        });
    }

    useEffect(() => {
        getPayment();
    }, []);

    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(payment, 6);

    return (
        <div >
            <MDBTable >
                <MDBTableHead>
                    <tr style={{ textAlign: 'start' }}>
                        <th scope='col'>Mã đơn hàng</th>
                        <th scope='col'>Chủ nhân</th>
                        <th scope='col'>Ngày tạo</th>
                        <th scope='col'>Trạng thái</th>
                        <th scope='col'>Tùy chỉnh</th>

                    </tr>
                </MDBTableHead>
                <MDBTableBody >
                    {paginatedData == null ? <span >Hiện tại chưa có đơn hàng nào</span> :
                        paginatedData.map((item, key) => {
                            return (

                                <tr style={{ textAlign: 'start' }}>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.id_payment_detail}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.fullname}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{item.create_at}</p>
                                    </td>
                                    <td>
                                        <td>{item.status == 0 ? <span>Đơn hàng đã xác nhận</span> : <></>} </td>
                                    </td>
                                    <td >
                                        <NavLink to={`/manager/products/Editcart/${item.id_payment_detail}`}>
                                            <button className='btn btn-dark' style={{ marginLeft: '2vh' }} >Chi tiết đơn hàng</button>

                                        </NavLink>

                                    </td>

                                </tr>
                            )
                        })
                    }

                </MDBTableBody>
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
                        <span style={{ marginLeft: '-2vh' }}>tới {totalPages} </span>
                    </div>
                </div>

            </MDBTable>
        </div>
    )
}
export default Cart
