import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const About = () => {
    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className='container'>
                <div style={{ fontSize: '20px', height: 'fit-content', padding: '3vh' }}>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>Họ và tên: <span style={{ fontSize: '19px', fontFamily: 'ThanhHai' }}>Nguyễn Thanh Hải</span></p>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>MSSV: <span style={{ fontSize: '19px', fontFamily: 'ThanhHai' }}>70DCTT21299</span></p>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>Tên đồ án: <span style={{ fontSize: '19px', fontFamily: 'ThanhHai' }}>Website bán hàng thời trang cho cửa hàng BULI</span></p>
                </div>

                <div style={{ fontSize: '20px', height: 'fit-content', padding: '3vh', fontFamily: 'ThanhHai' }}>
                    <h4>Giới Thiệu</h4>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>Ra đời từ 2015 với tên gọi Sneaker Club, tuy mang cùng mục đích với mong muốn mang đến cho người Việt Nam một không gian mua sắm khác biệt khi mang đến thương hiệu đẳng cấp nhất Thế giới, nhưng những hoài nghi về tên gọi đã thôi thúc chúng tôi thay đổi mình để tạo ra sự khác biệt giữa vô vàn các cửa hàng trên toàn quốc.</p>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>AMIRI từ đó mà ra đời, với mong muốn mang lại một không gian hòa trộn giữa nghệ thuật và mua sắm – tựa như chính dòng chữ cách điệu “Galeria” được cách tân lại từ “Gallery”, một gian phòng trưng bày nơi chứa đựng những tinh hoa của ngành thời trang Thế giới.</p>

                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>AMIRI tự hào sẽ mang đến một cơ hội trải nghiệm khác biệt khi các bạn đến tham quan, mua sắm trực tiếp tại Việt Nam với hàng loạt các thương hiệu cao cấp khác nhau từ các kinh đô thời trang như Milan, Paris, New York hay London mà không phải mất quá nhiều thời gian trong việc di chuyển để mua sắm. Hàng loạt các nhãn hiệu tầm cỡ như Saint Laurent; Gucci; Marcelo Burlon; Fendi;Rick Owens… đều được chúng tôi mang về và đã sẵn sàng để những tín đồ thời trang có thể trải nghiệm nhanh chóng.</p>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>Và với những khách hàng thiên về sự phóng khoáng và mạnh mẽ, AMIRI xin gợi ý đến những cái tên nổi bật của làng thời trang đường phố như Off-White; Supreme; A Bathing Ape; Anti Social Social Club,…chắc chắn sẽ giúp bạn thỏa mãn cơn nghiện mua sắm của bạn một cách nhanh chóng nhất khi không phải tốn thời gian chờ đợi một món đồ cũng như no sợ về món đồ của mình có phải là thật hay không</p>
                    <p style={{ fontSize: '16px', fontFamily: 'ThanhHai' }}>AMIRI chúng tôi mang lại cho bạn trải nghiệm shopping hàng hiệu chưa bao giờ là nhanh chóng và thoải mãi đến vậy ở Việt Nam, bạn có thể ghé mua sản phẩm ngay ở khu vực Quận 01 Trung tâm Thành Phố Hồ Chí Minh. Hay chỉ mở điện thoại và vào website của chúng tôi mua hàng và được chuyển tới tận nhận một cách nhanh chóng bạn chưa từng nghĩ mình sẽ mua được hàng hiệu tại Việt Nam dễ đến thế.</p>
                </div>
            </div>
        </div>
    );
}
export default About;