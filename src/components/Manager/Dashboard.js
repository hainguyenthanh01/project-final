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
import usePagination from '../../service/usePagination ';


import classNames from 'classnames/bind'
import styles from '../../css/dashboard.module.css'
import Users from './Users/Users';
import Products from './Products/Products';
import Editproducts from './Products/Editproducts';
import Cart from './Cart/Cart';


let cx = classNames.bind(styles);
const Dashboard = () => {
    const history = useHistory()
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
        <div className={cx('main')}>
            <div className={cx('navbar')}>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/users'>Danh sách người dùng</NavLink>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/products'>Danh sách sản phẩm</NavLink>
                <NavLink className={cx('nav')} activeClassName={cx('active')} to='/manager/order'>Quản lý đơn hàng</NavLink>

            </div>
            <div className={cx('content')}>
                <Switch>
                    <Redirect exact from="/" to="/manager/users" />

                    <Route path='/manager/users'>
                        <button type="button" className="btn btn-light">Danh sách người dùng</button>
                        <Users />

                    </Route>
                    <Route path='/manager/products'>
                        <button type="button" className="btn btn-light">Danh sách sản phẩm</button>
                        <Products />
                    </Route>

                    <Route path='/manager/order'>
                        <button type="button" className="btn btn-light">Danh sách đơn hàng</button>

                        <Cart />


                    </Route>
                </Switch>
            </div>
        </div>
    )
}
export default Dashboard
