import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, useParams, NavLink } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import usePagination from '../../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../../css/editcart.module.css'

let cx = classNames.bind(styles);
const Editcart = () => {
    const history = useHistory()
    const { id } = useParams();
    const [paymentdetail, setPaymentdetail] = useState([])
    const [status, setStatus] = useState('1');

    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(paymentdetail, 9);

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

    const handleOptionChange = (event) => {
        const selectedStatus = event.target.value;
        setStatus(selectedStatus);
    };
    const handleStatus = async (id, status) => {
        axios.post(`https://amiristore.rf.gd/Server/api/cart/updatepayment.php?id=${id}`, status)
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        axios.get(`https://amiristore.rf.gd/Server/api/cart/detail_payment.php?id=${id}`)
            .then(response => setPaymentdetail(response.data.data))
            .catch(error => console.error(error));

    }, [id]);

    return (
        <div className={cx('main')}>
            <div className={cx('title')}>
                <h3>Chỉnh sửa đơn hàng</h3>
                <p>{id}</p>
            </div>
            <div className='container'>
                <MDBRow data-mdb-spy="scroll"
                    data-mdb-target="#scrollspy1"
                    data-mdb-offset="0"
                    class="scrollspy">
                    <MDBCol md="12" className='scrollspy' >
                        <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <table class="table" >
                                    <thead>
                                        <tr style={{ backgroundColor: 'black', color: 'white' }}>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Thương hiệu</th>
                                            <th scope="col">Màu</th>
                                            <th scope="col">Kích cỡ</th>
                                            <th scope="col">Số lượng</th>

                                            <th scope="col">Tổng giá</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData == null ? <span >Hiện tại chưa có đơn hàng nào</span> :
                                            paginatedData.map((item, key) => {
                                                return (
                                                    <tr className="mb-2 mt-2">
                                                        <div className='d-flex align-items-center'>
                                                            <img
                                                                src={item.img}
                                                                alt=''
                                                                style={{ width: '45px', height: '45px' }}
                                                                className='rounded-circle'
                                                            />
                                                            <div className='ms-3'>
                                                                <p className='fw-bold mb-1'>{item.name}</p>
                                                            </div>
                                                        </div>
                                                        <td>{item.name_brand}</td>
                                                        <td>{item.color}</td>
                                                        <td>{item.size}</td>
                                                        <td>{item.amount} </td>
                                                        <td>{item.total.toLocaleString('en-US')} VNĐ</td>

                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>

                            </MDBCardBody>


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
                                    <span style={{ marginLeft: '' }}>tới {totalPages} </span>
                                </div>
                            </div>
                        </MDBCard>
                    </MDBCol>


                </MDBRow>
            </div>
            {/* {
                status == 0 ?
                    <div className='container mt-5'>
                        <h3 style={{ fontSize: '18px' }}>Tùy chỉnh đơn hàng số : <span style={{ fontSize: '23px' }}>{id}</span></h3>

                        <div onClick={(id, status) => handleStatus(id, status)}>
                            <button type="button" className="btn btn-dark">Xác nhận</button>

                        </div>
                    </div> :
                    <></>
            } */}

        </div>
    )
}
export default Editcart;