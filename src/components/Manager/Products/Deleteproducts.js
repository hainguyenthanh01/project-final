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
const Deleteproducts = () => {
    const history = useHistory()
    const { id } = useParams();

    const [products, setProducts] = useState([]);


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


    const DeleteProducts = (id) => {
        axios.delete(`https://amiristore.rf.gd/Server/api/products/delete.php?id=${id}`)
            .then(response => {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                history.push('/manager/products');
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
                <h5>Bạn có chắc chắn xóa sản phẩm này.</h5>
                <p style={{ fontSize: '20px' }}>{products.name}</p>
                <NavLink to='/manager/products'>
                    <button type="button" className="btn btn-dark mt-4 m-4">Quay về</button>

                </NavLink>
                <button onClick={(id) => DeleteProducts(products.id)} type="button" className="btn btn-danger mt-4  m-4">Xóa sản phẩm</button>


            </div>
        </div>
    )
}
export default Deleteproducts;