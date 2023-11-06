import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'
import 'mdb-ui-kit/css/mdb.min.css';
import { Route, Link, Switch, useHistory, NavLink } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon, MDBRippl } from 'mdb-react-ui-kit'
import classNames from 'classnames/bind'
import styles from '../../css/store.module.css'
import Detail from './Detail';
import usePagination from '../../service/usePagination ';


let cx = classNames.bind(styles);
const Store = () => {

    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedPriceOption, setSelectedPriceOption] = useState("");
    const [selectedTypeOption, setSelectedTypeOption] = useState("");


    useEffect(() => {
        getProducts();

    }, []);
    ////Hàm phân trang
    const { currentPage, totalPages, nextPage, prevPage, goToPage, paginatedData } =
        usePagination(products, 6);

    ///Hàm lọc theo Dropdown
    const handleDropdownSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(event.target.value);
        setSelectedOption(selectedValue === "" ? "" : selectedValue);
    };

    const handleDropdownSelectPrice = (event) => {
        const selectedValue = event.target.value;
        setSelectedPriceOption(selectedValue);
    };

    ///Type
    //1: áo thun
    //2: áo sơ mi
    //3: áo khoác
    //4: quần
    //5: túi
    const handleDropdownSelectType = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue)
        setSelectedTypeOption(selectedValue === "0" ? "" : selectedValue);
    };

    const filteredProducts = paginatedData
        .filter((product) =>
            (selectedOption === "Tất cả thương hiệu" || product.name_brand === selectedOption || selectedOption === "") &&
            // (selectedTypeOption === "" || product.type === selectedTypeOption || selectedTypeOption === "") &&
            (filter && typeof filter === 'string' ? product.name.toLowerCase().includes(filter.toLowerCase()) : true)
        )
        .sort((a, b) => {
            if (selectedPriceOption === "lowToHigh") {
                return a.price - b.price;
            } else if (selectedPriceOption === "highToLow") {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

    const options = [
        { id: 1, value: "Thom Browne" },
        { id: 2, value: "Amiri" },
        { id: 3, value: "Off White" },
        { id: 4, value: "Saint Laurent" },
        { id: 6, value: "Dsquared2" },
        { id: 7, value: "Tất cả thương hiệu" },
    ];

    const optionsprice = [
        { value: "lowToHigh", label: "Giá từ cao đến thấp" },
        { value: "highToLow", label: "Giá từ thấp đến cao" }
    ];
    const optionstype = [
        { id: 0, value: 0, },
        { id: 1, value: 1, },
        { id: 2, value: 2, },
        { id: 3, value: 3, },
    ];

    function getProducts() {
        axios.get('https://amiristore.rf.gd/Server/api/products/read.php').then(function (response) {
            setProducts(response.data.data);
        });
    }
    return (
        <div style={{ backgroundColor: '#eee', height: '110vh' }} >
            <div className="container text-center" >
                <div className="row" >
                    <div className="col-sm-4" style={{ marginTop: '5vh', fontFamily: 'ThanhHai' }}>

                        <h3>Cửa hàng</h3>
                        <hr />
                        <p>Thương hiệu</p>
                        <select value={selectedOption} onChange={handleDropdownSelect} className={cx('selected')}>
                            {options.map((option) => (
                                <option key={option.id} >
                                    {option.value}
                                </option>
                            ))}
                        </select>

                        <p style={{ marginTop: '3vh' }}>Giá tiền</p>
                        <select className={cx('selected')} value={selectedPriceOption} onChange={handleDropdownSelectPrice}>

                            {optionsprice.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* <p style={{ marginTop: '3vh' }} value={selectedTypeOption} onChange={handleDropdownSelectType}>Loại quần áo</p>
                        <select value={selectedTypeOption} onChange={handleDropdownSelectType} className={cx('selected')}>
                            {optionstype.map((option) => (
                                <option key={option.id} >
                                    {option.value}
                                </option>
                            ))}
                        </select> */}
                    </div>

                    <div className="col-sm-8">
                        <div className={cx('search')}>
                            <input type='text' placeholder='Tìm kiếm sản phẩm....'
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            ></input>

                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                        <div className="row row-cols-3" style={{ marginTop: '5vh' }}>
                            {
                                filteredProducts.map((item, key) => {
                                    return (
                                        <NavLink to={`/detail/${item.id}`}>
                                            <div className={cx('card')} >
                                                <div className={cx('img')}>
                                                    <img src={item.img} />
                                                </div>
                                                <div className={cx('brand')}>
                                                    <p>{item.name_brand}</p>
                                                </div>
                                                <div className={cx('title')}>
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className={cx('price')}>
                                                    <p>{item.price.toLocaleString('en-US')} vnđ</p>
                                                </div>
                                            </div>

                                        </NavLink>

                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={cx('pagination')}>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Quay lại
                        </button>

                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            Tiếp tục
                        </button>

                        <div>
                            <input
                                type="number"
                                value={currentPage}
                                onChange={(e) => goToPage(e.target.value)}
                                min="1"
                                max={totalPages}
                            />
                            <span style={{ marginLeft: '1vh' }}>tới {totalPages} </span>
                        </div>
                    </div>
                </div>
            </div>



        </div>


    )
}
export default Store;