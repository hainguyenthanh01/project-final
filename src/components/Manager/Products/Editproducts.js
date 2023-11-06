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
const Editproducts = () => {
    const history = useHistory()
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [name_brand, setName_brand] = useState([]);
    const [color, setColor] = useState([]);
    const [sex, setSex] = useState([]);
    const [addreas, setAddreas] = useState([]);
    const [session, setSession] = useState([]);
    const [amount, setAmount] = useState([]);
    const [img, setImg] = useState([]);
    const [type, setType] = useState([]);


    ///////////Sử lý thêm
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleNamebrand = (event) => {
        setName_brand(event.target.value);
    }
    const handleColor = (event) => {
        setColor(event.target.value);
    }
    const handleNAddreas = (event) => {
        setAddreas(event.target.value);
    }
    const handleSession = (event) => {
        setSession(event.target.value);
    }
    const handleAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }
    const handleSex = (event) => {
        setSex(event.target.value);
    }
    const img2 = '';
    const img3 = '';
    const rate = '0';

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

    const EditProducts = (id) => {
        const formData = new FormData();
        formData.append('name_brand', name_brand);
        formData.append('name', name);
        formData.append('img', img);
        formData.append('img2', img2);
        formData.append('img3', img3);
        formData.append('price', price);
        formData.append('sex', sex);
        formData.append('type', type);
        formData.append('color', color);
        formData.append('addreas', addreas);
        formData.append('session', session);
        formData.append('amount', amount);
        formData.append('rate', rate);

        axios.post(`https://amiristore.rf.gd/Server/api/products/edit.php?id=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                history.push('/manager/products')
            })
            .catch(error => console.error(error));
    }


    useEffect(() => {
        axios.get(`https://amiristore.rf.gd/Server/api/products/detail.php?id=${id}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div className={cx('main')}>
            <div className={cx('title')}>
                <h3>Chỉnh sửa sản phẩm</h3>
                <p>{products.name}</p>

                <form className='container'>

                    <MDBInput
                        className='mb-5 mt-3'
                        type='text'
                        onChange={handleName}
                        value={name}
                        name="name"
                        label='Tên sản phẩm'
                    />

                    <MDBRow className='mb-5 mt-3'>

                        <MDBCol>
                            <MDBInput onChange={handlePrice} type="number" name="price" label='Giá' />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput onChange={handleNamebrand} name="name_brand" label='Tên thương hiệu' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mb-5 mt-3'>

                        <MDBCol>
                            <MDBInput onChange={handleColor} name="color" label='Màu sắc' />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput onChange={handleNAddreas} name="addreas" label='Nơi sản xuất' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mb-5 mt-3'>

                        <MDBCol>
                            <MDBInput onChange={handleSession} name="session" label='Phiên bản' />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput onChange={handleAmount} type="number" name="amount" label='Số lượng' />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='mb-5 mt-2 '>

                        <MDBCol>
                            <select className="browser-default custom-select w-100" onChange={handleType}>
                                <option selected>Lựa chọn loại quần áo</option>
                                <option value="1">Áo thun</option>
                                <option value="2">Áo sơ mi</option>
                                <option value="3">Áo len</option>
                                <option value="4">Áo khoác</option>
                                <option value="5">Quần</option>
                                <option value="6">Túi / ví</option>
                                <option value="7">Phụ kiện</option>

                            </select>
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
                        <input type="file" name="img" label='Hình ảnh'
                            onChange={(event) => setImg(event.target.files[0])}
                        />
                    </div>
                    <NavLink to='/manager/products'>
                        <button type="button" className="btn btn-dark mt-4 m-4">Quay về</button>

                    </NavLink>
                    <button onClick={(id) => EditProducts(products.id)} type="button" className="btn btn-danger mt-4  m-4">Chỉnh sửa sản phẩm</button>
                </form>
            </div>
        </div>
    )
}
export default Editproducts;