import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, useParams, useHistory, NavLink } from "react-router-dom";
import {
    MDBBtn, MDBTextArea, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon,
    MDBContainer,
    MDBTypography
} from 'mdb-react-ui-kit'
import Cookies from 'js-cookie';

import classNames from 'classnames/bind'
import styles from '../../css/detail.module.css'


let cx = classNames.bind(styles);
const Detail = ({ props }) => {


    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState('');
    const [amountProducts, setSmountProducts] = useState(1);

    const getIDUser = Cookies.get('id');

    useEffect(() => {
        axios.get(`https://amiristore.rf.gd/Server/api/products/detail.php?id=${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error(error));
    }, [id]);
    if (!product) {
        return <div>Loading...</div>;
    }
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }
    const handleAmountChange = (event) => {
        setSmountProducts(event.target.value);
    }


    const addCart = async (name_brand, name, img, price, color, session) => {



        const formData = new FormData();
        formData.append('id_user', getIDUser);
        formData.append('name_brand', name_brand);
        formData.append('name', name);
        formData.append('img', img);
        formData.append('price', price);
        formData.append('color', color);
        formData.append('session', session);
        formData.append('size', size);
        formData.append('amount', amountProducts);

        try {
            const response = await axios.post('https://amiristore.rf.gd/Server/api/cart/addcart.php', formData);
            if (response.data.success) {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
            }
            else {
                Toast.fire({ icon: 'error', title: `${response.data.error}` });
            }

        } catch (error) {
            console.error(error);
        }
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
        <div style={{ backgroundColor: '#eee' }}>
            <div className="container " style={{ fontFamily: 'ThanhHai' }}>

                <div className="row" >
                    <div className="col-4" style={{ marginBottom: '1vh', marginTop: '10vh' }}>
                        <img src={product.img} style={{ width: '100%' }} />
                    </div>
                    <div className="col-6" style={{ marginBottom: '1vh', marginTop: '10vh', marginLeft: '5vh' }}>
                        <p style={{ fontSize: '20px', fontFamily: 'ThanhHai' }}>{product.name_brand}</p>
                        <h3 style={{ fontSize: '29px', fontFamily: 'monospace' }}>{product.name}</h3>
                        <p style={{ fontSize: '18px', fontFamily: 'monospace' }}>{product.price.toLocaleString('en-US')} VNĐ</p>


                        <p style={{ fontSize: '16px' }}>Trong kho :<span style={{ color: 'red', fontSize: '19px' }}>
                            {
                                product.amount != '' ? <span> {product.amount} cái</span> : <span>Hết hàng</span>
                            }
                        </span></p>


                        <p style={{ fontSize: '16px' }}>Dành cho: <span style={{ color: 'black', fontSize: '19px' }}>

                            {
                                product.sex == '1' ? <span>Nam</span> : <span>Nữ</span>
                            }
                        </span></p>

                        <p style={{ fontSize: '16px' }}>Màu sắc: <span style={{ color: 'black', fontSize: '19px' }}>
                            {product.color}
                        </span></p>
                        <p style={{ fontSize: '16px' }}>Nơi sản xuất: <span style={{ color: 'black', fontSize: '19px' }}>{product.addreas}</span></p>
                        <p style={{ fontSize: '16px' }}>Phiên bản: <span style={{ color: 'black', fontSize: '19px' }}>{product.session}</span></p>

                        <p style={{ fontSize: '16px' }}>
                            Đánh giá: Đang cập nhật

                        </p>

                        <label style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                            <span>Chọn SIZE:</span>
                            <input style={{ marginLeft: '2vh' }}
                                type="radio"
                                value="M"
                                checked={size === "M"}
                                onChange={handleSizeChange}
                            />
                            <span style={{ marginLeft: '1vh' }}>M</span>
                            <input style={{ marginLeft: '2vh' }}
                                type="radio"
                                value="L"
                                checked={size === "L"}
                                onChange={handleSizeChange}
                            />
                            <span style={{ marginLeft: '1vh' }}>L</span>
                            <input style={{ marginLeft: '2vh' }}
                                type="radio"
                                value="XL"
                                checked={size === "XL"}
                                onChange={handleSizeChange}
                            />
                            <span style={{ marginLeft: '1vh' }}>XL</span>
                        </label>

                        <div className="d-flex mb-4 mt-4" style={{ maxWidth: "300px" }}>


                            <MDBInput min={0} max={50} value={amountProducts} onChange={handleAmountChange} type="number" label="Số lượng" />


                        </div>
                        {
                            getIDUser == null ?
                                <button type="button" className="btn btn-primary mt-3 disabled"
                                    onClick={(name_brand, name, img, price, color, session, amountProducts) => addCart(product.name_brand, product.name, product.img, product.price, product.color, product.session, amountProducts)}

                                >Thêm vào giỏ hàng</button> :
                                <button type="button" className="btn btn-primary mt-3"
                                    onClick={(name_brand, name, img, price, color, session, amountProducts) => addCart(product.name_brand, product.name, product.img, product.price, product.color, product.session, amountProducts)}

                                >Thêm vào giỏ hàng</button>
                        }


                        <br />


                        <NavLink to='/store' >
                            <button style={{ marginTop: '2vh' }} type="button" class="btn btn-danger">
                                Quay lại
                            </button>
                        </NavLink>


                    </div>
                    <div style={{ marginBottom: '10vh', marginTop: '3vh', padding: '10px', }}>
                        {/* <h3 style={{ color: 'black' }}  >Đánh giá sản phẩm: </h3>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                            />
                        </div>
                        <button style={{ marginTop: '1vh' }} type="button" class="btn btn-success">
                            Đăng
                        </button> */}
                    </div>

                </div>
            </div>
        </div >


    )
}
export default Detail;
