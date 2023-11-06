import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit'
import Swal from 'sweetalert2';
import axios from 'axios'
import Cookies from 'js-cookie';

import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, Switch, useHistory } from "react-router-dom";


import classNames from 'classnames/bind'
import styles from '../../css/login.module.css'

let cx = classNames.bind(styles);

const Login = () => {

    const history = useHistory()
    const [email, SetEmail] = useState([]);
    const [password, SetPassword] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        const savedId = Cookies.get('id');
        if (savedId) {
            setId(savedId);
        }
    }, []);

    const handleEmail = (event) => {
        SetEmail(event.target.value);
    }
    const handlePassword = (event) => {
        SetPassword(event.target.value);
    }
    const LoginUser = async () => {

        try {
            const response = await axios.post('https://amiristore.rf.gd/Server/api/users/auth.php', { email, password });
            if (response.data.success) {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                setLoggedIn(true);
                Cookies.set('id', response.data.session.id, { expires: 3600 });
                Cookies.set('fullname', response.data.session.fullname, { expires: 3600 });
                Cookies.set('email', response.data.session.email, { expires: 3600 });
                Cookies.set('phone', response.data.session.phone, { expires: 3600 });
                Cookies.set('addreas', response.data.session.addreas, { expires: 3600 });
                Cookies.set('point', response.data.session.point, { expires: 3600 });
                Cookies.set('sex', response.data.session.sex, { expires: 3600 });
                Cookies.set('role', response.data.session.role, { expires: 3600 });
                Cookies.set('avatar', response.data.session.avatar, { expires: 3600 });

                history.push('/home')
                window.location.reload();

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
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBContainer fluid>

                    <MDBCard className='text-black m-5 mt-10 mb-12' style={{ borderRadius: '10px', marginBottom: '10vh', marginTop: '5vh', boxShadow: 'none' }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng nhập</p>



                                    <div className="d-flex flex-row align-items-center mb-4 w-50">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput label='Địa chỉ email'
                                            type="email" name="email" onChange={handleEmail}
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput label='Mật khẩu' type="password" name="password" onChange={handlePassword} />
                                    </div>





                                    <button onClick={LoginUser}

                                        style={{ padding: '10px', color: 'white', backgroundColor: 'black', border: 'none' }}>Đăng nhập</button>

                                </MDBCol>

                                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                    <MDBCardImage src='https://insideretail.asia/wp-content/uploads/2022/07/1658580812384.jpeg' fluid />
                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                </MDBContainer>
            </MDBContainer>
        </section>

    );

}
export default Login;