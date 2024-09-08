import React from 'react';
import './DiscountPopup.css';

const DiscountPopup: React.FC = () => {
  return (
    <div className="popup-overlay">
      <div className="discount-container">
        <div className="logo">
          <img src="logo.PNG" alt="Logo" />
        </div> {/* โลโก้ */}
        <div className="coupon-image">
          <img src="Discount.PNG" alt="Coupon" /> {/* รูปภาพคูปอง */}
        </div>
        <div className="discount-description">ส่วนลดมูลค่า 100 บาท</div> {/* คำอธิบาย */}
        <button className="button back-btn">BACK TO REWARD</button> {/* ปุ่มกลับ */}
      </div>
    </div>
  );
}

export default DiscountPopup;
