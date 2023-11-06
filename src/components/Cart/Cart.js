import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Route, Redirect, Switch, useHistory, NavLink } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRipple, MDBRow, MDBTooltip, MDBTypography, } from "mdb-react-ui-kit";
import classNames from 'classnames/bind'
import Cookies from 'js-cookie';


import styles from '../../css/cart.module.css'


let cx = classNames.bind(styles);

const Cart = () => {
    const history = useHistory()
    const [orders, setOrders] = useState([]);

    // const [totalOneItem, setTotalOneItem] = useState(0);

    const getIDUser = Cookies.get('id');

    // Tính tổng tiền các đơn hàng
    const total = orders && orders.length > 0 ? orders.reduce((acc, order) => {
        return acc + (order.amount * order.price);
    }, 0) : 0;



    useEffect(() => {
        getOrder();
    }, [orders]);

    function getOrder() {
        axios.get(`https://amiristore.rf.gd/Server/api/cart/order.php?getIDUser=${getIDUser}`).then(function (response) {
            setOrders(response.data.data);

        });
    }
    const handleRemoveAmount = async (id, amount) => {
        const formData = new FormData();

        formData.append('amount', amount - 1);
        const response = await axios.post(`https://amiristore.rf.gd/Server/api/cart/removeamount.php?id=${id}`, formData)

        if (response.data.success) {
            getOrder();

        }
        else {
            // Toast.fire({ icon: 'error', title: `${response.data.error}` });
        }

    }

    const handleAddAmount = (id, amount) => {
        const formData = new FormData();

        formData.append('amount', amount + 1);
        axios.post(`https://amiristore.rf.gd/Server/api/cart/updateamount.php?id=${id}`, formData)
            .then(response => {
                getOrder();
            })
            .catch(error => console.error(error));
    }
    const handleRemoveCart = (id) => {

        axios.post(`https://amiristore.rf.gd/Server/api/cart/removecartitem.php?id=${id}`)
            .then(response => {
                getOrder();
            })
            .catch(error => console.error(error));
    }

    const handlePayment = () => {
        const data = {
            getIDUser: getIDUser,
            orders: JSON.stringify(orders),
        };
        axios.post('https://amiristore.rf.gd/Server/api/cart/payment.php', data)
            .then(response => {
                if (response.data.success) {
                    Toast.fire({ icon: 'success', title: `${response.data.success}` });
                    history.push(`/profile/${getIDUser}`);
                } else {
                    Toast.fire({ icon: 'error', title: `${response.data.error}` });
                }
            })
            .catch(error => console.error(error));
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
        <section className="h-100 gradient-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    {orders !== undefined && orders.length > 0 ? <span >Hiện có :{orders.length} sản phẩm</span> : <span className={cx('count')}></span>}
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                {orders == null ? <span>Giỏ hàng hiện không có sản phẩm </span> :
                                    orders.map((item, key) => {
                                        return (
                                            <MDBRow>
                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                    <MDBRipple rippleTag="div" rippleColor="light"
                                                        className="bg-image rounded hover-zoom hover-overlay">
                                                        <img
                                                            src={item.img}
                                                            className="w-100" />
                                                        <a href="#!">
                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                            </div>
                                                        </a>
                                                    </MDBRipple>

                                                </MDBCol>

                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                    <p>
                                                        <strong>{item.name}</strong>
                                                    </p>
                                                    <p>Color: {item.color}</p>
                                                    <p>Size: {item.size}</p>

                                                    <button className="btn btn-primary px-3 me-2" onClick={(id) => handleRemoveCart(item.id)}
                                                        title="Xóa khỏi giỏ hàng">
                                                        <MDBIcon fas icon="trash" />
                                                    </button>


                                                </MDBCol>
                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                    <div className="d-flex mb-4 mt-4" style={{ maxWidth: "300px" }}>
                                                        <button className="btn btn-primary px-3 me-2" onClick={(id, amount) => handleRemoveAmount(item.id, item.amount)}>
                                                            <MDBIcon fas icon="minus" />
                                                        </button>

                                                        <MDBInput min='0' value={item.amount} type="number" label="Số lượng" />

                                                        <button className="btn btn-primary px-3 ms-2" onClick={(id, amount) => handleAddAmount(item.id, item.amount)}>
                                                            <MDBIcon fas icon="plus" />
                                                        </button>
                                                    </div>

                                                    <p className="text-start text-md-center">
                                                        {/* <strong>{(totalPriceItems).toLocaleString('en-US')} VNĐ</strong> */}
                                                        <strong>{(item.amount * item.price).toLocaleString('en-US')} VNĐ</strong>

                                                    </p>
                                                </MDBCol>
                                                <hr className='mt-3' />

                                            </MDBRow>
                                        )
                                    })
                                }
                            </MDBCardBody>
                        </MDBCard>


                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBTypography tag="h5" className="mb-0">
                                    Tổng cộng
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup >
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Tổng tiền sản phẩm
                                        <strong>{total.toLocaleString('en-US')} VNĐ</strong>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Phí vận chuyển
                                        <span>50,000 VNĐ</span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Vận chuyển
                                        <span>Gojeck</span>
                                    </MDBListGroupItem>

                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Tổng thanh toán</strong>
                                            <strong>
                                                <p className="mb-0">(Bao gồm VAT 10%)</p>
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>{(total + (total * 0.1) + 50000).toLocaleString('en-US')} VNĐ</strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>


                                {
                                    getIDUser == null ?
                                        <button className='btn btn-success w-100 disabled' block size="lg" onClick={handlePayment}>
                                            Thanh toán
                                        </button> :
                                        <button className='btn btn-success w-100' block size="lg" onClick={handlePayment}>
                                            Thanh toán
                                        </button>
                                }

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section >
    );
}
export default Cart;