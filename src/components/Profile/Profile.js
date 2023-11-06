import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
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
import { Route, Redirect, useParams, NavLink, useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import usePagination from '../../service/usePagination ';
import classNames from 'classnames/bind'
import styles from '../../css/profile.module.css'
let cx = classNames.bind(styles);

const Profile = ({ }) => {

    const { getIDUser } = useParams();


    const myID = Cookies.get('id');

    const [user, setUser] = useState(null);
    const [payment, setPayment] = useState([]);

    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(payment, 9);


    function getPayment() {
        axios.get(`https://amiristore.rf.gd/Server/api/cart/read_payment.php?getIDUser=${getIDUser}`).then(function (response) {
            setPayment(response.data.data);
        });
    }
    useEffect(() => {
        axios.get(`https://amiristore.rf.gd/Server/api/users/read_user.php?getIDUser=${getIDUser}`)
            .then(response => setUser(response.data))
            .catch(error => console.error(error));

        getPayment()
    }, user);


    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                {user && <><MDBCardImage
                                    src={user.avatar}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '140px', height: '17vh' }}
                                    fluid /></>}

                                <p className="text-muted mb-1 mt-3"> {user && user.fullname}</p>
                                <p className="text-muted mb-4"> {user && user.addreas}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <div> {user && user.role == '1' ? <button type="button" class="btn btn-primary" >Khách hàng</button>
                                        : <button type="button" class="btn btn-danger">Quản lý</button>
                                    }</div>
                                </div>
                                <div className="d-flex justify-content-center mb-2">
                                    {myID == getIDUser ?
                                        <>
                                            <NavLink to={`/editprfile/${myID}`}>
                                                <button type="button" class="btn btn-success">Chỉnh sửa thông tin</button>
                                            </NavLink>
                                        </> : <></>}

                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />Điểm uy tín
                                        <MDBCardText> {user && user.point} điểm</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />Số đơn đã mua
                                        {payment && payment.length > 0 ? <MDBCardText>{payment.length} đơn</MDBCardText> : <MDBCardText>Chưa có đơn</MDBCardText>}



                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Họ và tên</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {user && user.fullname}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {user && user.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Giới tính</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {user && user.sex == '1' ? <span>Nam</span> : <span>Nữ</span>}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Số điện thoại</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {user && user.phone}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Địa chỉ</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {user && user.addreas}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow style={{ overflow: 'hidden', height: '100vh', overflowX: 'scroll' }} data-mdb-spy="scroll"
                            data-mdb-target="#scrollspy1"
                            data-mdb-offset="0"
                            class="scrollspy">
                            <MDBCol md="12" className='scrollspy' >
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Đơn hàng của hàng</span></MDBCardText>
                                        <table class="table" >
                                            <thead>
                                                <tr style={{ backgroundColor: 'black', color: 'white' }}>
                                                    <th scope="col">Mã đơn hàng</th>
                                                    <th scope="col">Ngày tạo</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Tùy chọn</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedData == null ? <span >Hiện tại chưa có đơn hàng nào</span> :
                                                    paginatedData.map((item, key) => {
                                                        return (
                                                            <tr className="mb-2 mt-2">
                                                                <td>{item.id_payment_detail}</td>
                                                                <td>{item.create_at}</td>
                                                                <td>{item.status == 0 ? <span>Đơn hàng đã xác nhận</span> : <></>} </td>
                                                                <td>
                                                                    <NavLink to={`/detailorder/${item.id_payment_detail}`}>
                                                                        <button type="button" className="btn btn-dark">Chi tiết đơn hàng</button>

                                                                    </NavLink>
                                                                </td>
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
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
export default Profile;