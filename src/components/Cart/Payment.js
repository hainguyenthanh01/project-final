import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
import {
    MDBTable, MDBTableHead, MDBTableBody,
    MDBFile, MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRipple, MDBRow, MDBTooltip, MDBTypography,
} from "mdb-react-ui-kit";
import classNames from 'classnames/bind'
import Cookies from 'js-cookie';


import styles from '../../css/paymnet.module.css'


let cx = classNames.bind(styles);

const Paymnet = () => {



    const history = useHistory();
    const [payment, setPayment] = useState([]);

    const getIDUser = Cookies.get('id');

    const total = payment && payment.length > 0 ? payment.reduce((acc, payments) => {
        return acc + (payments.amount * payments.price);
    }, 0) : 0;

    useEffect(() => {

        getPayment();

    }, []);

    function getPayment() {
        axios.get(`https://amiristore.rf.gd/Server/api/cart/read_payment.php?getIDUser=${getIDUser}`).then(function (response) {
            setPayment(response.data.data);
        });
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


    return (
        <section style={{ backgroundColor: '#eee', width: '100%', height: '80vh' }}>
            <div className={cx('main')}>
                <div className={cx('navbar')}>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/donhangchuaduyet'>Đơn hàng chưa duyệt</NavLink>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/products'>Đơn hàng đang giao</NavLink>
                    <NavLink className={cx('nav')} activeClassName={cx('active')} to='/payment/order'>Đơn hàng đã giao</NavLink>

                </div>
                <div className={cx('content')}>
                    <Switch>
                        <Route path='/payment/donhangchuaduyet'>
                            <MDBTable align='middle'>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>Tên sản phẩm</th>
                                        <th scope='col'>Thương hiệu</th>
                                        <th scope='col'>Giá 1 cái</th>
                                        <th scope='col'>Màu</th>
                                        <th scope='col'>Size</th>
                                        <th scope='col'>Số lượng</th>
                                        <th scope='col'>Tổng giá</th>
                                        <th scope='col'>Trạng thái</th>

                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {payment == null ? <span >Hiện tại bạn chưa có thanh toán nào. Hãy tiếp tục mua hàng</span> :
                                        payment.map((item, key) => {
                                            return (

                                                <tr>

                                                    <td>
                                                        <div className='d-flex align-items-center'>
                                                            <img
                                                                src={require('../../images/items/' + item.img)}
                                                                alt=''
                                                                style={{ width: '45px', height: '45px' }}
                                                                className='rounded-circle'
                                                            />
                                                            <div className='ms-3'>
                                                                <p className='fw-bold mb-1'>{item.name}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.name_brand}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.price.toLocaleString('en-US')} VNĐ</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.color}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.size}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.amount} cái</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.total.toLocaleString('en-US')} VNĐ</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.status == '1' ? <span>Đang chuẩn bị hàng</span>
                                                            : item.status == '2' ? <span>Đang giao</span> : <span>Đã giao thành công</span>
                                                        }</p>
                                                    </td>


                                                </tr>
                                            )
                                        })
                                    }

                                </MDBTableBody>


                            </MDBTable>
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    {
                                        payment != null ? <>

                                            <p>
                                                <h4>Tổng giá</h4>
                                                <span>Đã bao gồm thuế và phí vận chuyển</span>
                                            </p>
                                            <p>
                                                <h2>{(total + (total * 0.1) + 50000).toLocaleString('en-US')} VNĐ</h2>
                                            </p>
                                        </> : <></>
                                    }

                                </MDBCardBody>
                            </MDBCard>
                        </Route>
                        <Route path='/payment/products'>
                            <h4>sefsef</h4>
                        </Route>
                    </Switch>
                </div>
            </div>



        </section >
    );
}
export default Paymnet;