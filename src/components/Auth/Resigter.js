import React, { useEffect, useState } from 'react';
import { MDBRadio, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, Switch, NavLink, useHistory } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';
import classNames from 'classnames/bind'
import styles from '../../css/resigter.module.css'

let cx = classNames.bind(styles);

const Resigter = () => {
    const history = useHistory()
    const [username, SetUsername] = useState([]);
    const [email, SetEmail] = useState([]);
    const [password, SetPassword] = useState([]);
    const [phone, SetPhone] = useState([]);
    const [addreas, SetAddreas] = useState([]);
    const [sex, SetSex] = useState([]);
    const [checked, SetChecked] = useState([]);

    const role = 1;
    const avatar = 'https://i.imgur.com/r1mYK7m.jpeg';
    const point = 0;

    const handleUserName = (event) => {
        SetUsername(event.target.value);

    }
    const handleEmail = (event) => {
        SetEmail(event.target.value);
    }
    const handlePassword = (event) => {
        SetPassword(event.target.value);
    }
    const handlePhone = (event) => {
        SetPhone(event.target.value);
    }
    const handleAddeas = (event) => {
        SetAddreas(event.target.value);
    }
    const handleSex = (event) => {
        SetSex(event.target.value);
    }
    const handleisChecked = (event) => {
        SetChecked(event.target.value);
    }
    const registerUser = async () => {

        try {
            const response = await axios.post('https://amiristore.rf.gd/Server/api/users/register.php', { username, email, password, phone, addreas, sex, role, avatar, point });
            if (response.data.success) {
                Toast.fire({ icon: 'success', title: `${response.data.success}` });
                history.push('/login')

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

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>

                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="user me-3" size='lg' />
                                        <MDBInput
                                            label='Họ và tên'
                                            type="text"
                                            name="name"
                                            onChange={handleUserName}
                                            className='w-100'
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="envelope me-3" size='lg' />
                                        <MDBInput label='Địa chỉ email'

                                            type="email" name="email" onChange={handleEmail}
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="lock me-3" size='lg' />
                                        <MDBInput label='Mật khẩu'
                                            type="password" name="password" onChange={handlePassword}
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="phone-alt" size='lg' style={{ paddingRight: '1.6vh' }} />
                                        <MDBInput label='Số điện thoại'
                                            type="phone" name="phone" onChange={handlePhone}
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="map-marked-alt" size='lg' style={{ paddingRight: '1.6vh' }} />
                                        <MDBInput label='Địa chỉ'
                                            type="addreas" name="addreas" onChange={handleAddeas}
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4  w-50">
                                        <MDBIcon fas icon="transgender" size='lg' style={{ paddingRight: '1.6vh' }} />
                                        <label style={{ marginLeft: '3vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <input
                                                type="radio"
                                                value="1"
                                                checked={sex === "1"}
                                                onChange={handleSex}
                                            />
                                            <span style={{ marginLeft: '1vh' }}>Nam</span>
                                        </label>
                                        <br />
                                        <label style={{ marginLeft: '7vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <input
                                                type="radio"
                                                value="2"
                                                checked={sex === "2"}
                                                onChange={handleSex}
                                            />
                                            <span style={{ marginLeft: '1vh' }}>Nữ</span>

                                        </label>
                                    </div>






                                    <button
                                        onClick={registerUser}
                                        style={{ padding: '10px', color: 'white', backgroundColor: 'black', border: 'none' }}>Đăng ký</button>

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
export default Resigter;