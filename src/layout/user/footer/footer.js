import StyleFooter from './footer.scss'

function footer(){
    return(
        <footer className="footer" id="footer">
<div className="footer-main py-5">
    <div className="container">
      <div className="row gy-5 g-md-4 align-items-start lh-lg mb-5">
        <div className="col-md-3">
          <a className="footer-logo" href="https://dinotech.edu.vn">
            <img className="img-fluid" src="https://dinotech.edu.vn/images/logo-white.png" alt=""/>
          </a>
          <div className="card-body p-4">
            <h6 className="card-title">VĂN PHÒNG HÀ NỘI</h6>
            <ul className="list list-icons list-gap-2 mb-2 pb-1">
              <li className="list-item">
                26 Nguyễn Thị Định, Trung Hòa, Cầu Giấy, Hà Nội
              </li>
              <li className="list-item">
                <a href="tel:02462947586">02462947586</a>
              </li>
              <li className="list-item">
                <a href="tel:0867196779">dinotechschool@imap.edu.vn</a>
              </li>
            </ul>
          </div>
          <div className="social" >
            <a className="social-item" href="">
              <img className="img-fluid social-icon" src="https://dinotech.edu.vn/images/icons/facebook-circle.svg"
                alt="" />
            </a>
            <a className="social-item" href="https://www.youtube.com/channel/UCE-WfKHFlC3-fKJvl0dLSVQ">
              <img className="img-fluid social-icon" src="https://dinotech.edu.vn/images/icons/youtube-circle.svg" alt=""/>
            </a>
            <a className="social-item" href="https://www.tiktok.com/@laptrinhnhi.dinotech">
              <img className="img-fluid social-icon" src="https://dinotech.edu.vn/images/icons/tiktok-circle.svg" alt=""/>
            </a>
          </div>
        </div>
        <div className="col-md-3 d-grid gap-5 gap-md-3">
          <div className="card-body p-4">
            <h6 className="card-title">VỀ DINOTECH</h6>
            <ul className="list list-icons list-gap-2 mb-2 pb-1">
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/gioi-thieu.html">Về Dinotech</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/chuyen-gia.html">Đội ngũ chuyên gia</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/mo-hinh-dao-tao.html">Mô hình đào tạo</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/triet-ly-dao-tao.html">Triết lý đào tạo</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/phuong-phap-dao-tao.html">Phương pháp đào đạo</a>
              </li>
              <li className="mb-2">
                <a href="#">Báo chí</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/lich-khai-giang.html">Hệ thống cơ sở</a>
              </li>
              <li className="mb-2">
                <a href="#">Đối tác</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body p-4">
            <h6 className="card-title">CHƯƠNG TRÌNH HỌC</h6>
            <ul className="list list-icons list-gap-2 mb-2 pb-1">
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/kindy_cd13.html">Kindy</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/kids_cd7.html">Kids</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/teen_cd8.html">Teen</a>
              </li>
              <li className="mb-2">
                <a href="https://dinotech.edu.vn/youngs_cd9.html">Youngs</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-3 d-grid gap-5 gap-md-3">
          <div className="card-body p-4">
            <h6 className="card-title">CHÍNH SÁCH, QUY ĐỊNH</h6>
            <ul className="list list-icons list-gap-2 mb-2 pb-1">
              <li className="mb-2">
                <a href="#">Chính sách, quy định chung</a>
              </li>
              <li className="mb-2">
                <a href="#">Quy trình cung ứng dịch vụ</a>
              </li>
              <li className="mb-2">
                <a href="#">Phương thức thanh toán</a>
              </li>
              <li className="mb-2">
                <a href="#">Chính sách bảo vệ thông tin</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </footer>
    );
}

export default footer;