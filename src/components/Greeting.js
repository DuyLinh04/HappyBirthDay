import React, { useEffect, useState } from 'react';
import './Greeting.css'; // Import tệp CSS mới
import { useNavigate } from 'react-router-dom'; // Dùng để điều hướng tới trang tiếp theo

const Greeting = () => {
  const [time, setTime] = useState(new Date());
  const [inputDate, setInputDate] = useState(''); // Lưu trữ giá trị ngày người dùng nhập
  const [errorMessage, setErrorMessage] = useState(''); // Lưu trữ thông báo lỗi
  const [countdown, setCountdown] = useState(null); // Lưu trữ trạng thái countdown
  const navigate = useNavigate(); // Để điều hướng

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Hủy timer khi component bị unmount
    return () => clearInterval(timer);
  }, []);

  // Định dạng ngày và giờ
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Xử lý khi người dùng nhấn submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn không cho trang reload
    if (inputDate === '10/10/2003') {
      // Nếu nhập đúng ngày sinh
      setErrorMessage(''); // Xóa thông báo lỗi nếu có
      startCountdown(); // Bắt đầu đếm ngược
    } else {
      // Nếu nhập sai ngày sinh
      setErrorMessage('Bạn không phải là Ánh!');
    }
  };

  // Bắt đầu countdown từ 5
  const startCountdown = () => {
    setCountdown(5); // Bắt đầu từ 5 giây
    let countdownValue = 5;
    const countdownTimer = setInterval(() => {
      countdownValue -= 1;
      setCountdown(countdownValue);
      if (countdownValue === 0) {
        clearInterval(countdownTimer); // Dừng countdown
        navigate('/happy-birthday'); // Chuyển đến trang HappyBirthDay.js
      }
    }, 1000);
  };

  return (
    <div className="greeting-container">
      <div className="clock-container">
        <div className="clock">
          <h2 className="time-text">{formatTime(time)}</h2>
          <p className="date-text">{formatDate(time)}</p>
        </div>
      </div>

      {/* Ô input để nhập ngày sinh */}
      <form className="birthday-form" onSubmit={handleSubmit}>
        <label htmlFor="birthday-input" className="input-label">Nhập ngày sinh của bạn (DD/MM/YYYY):</label>
        <input
          id="birthday-input"
          type="text"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="birthday-input"
          placeholder="DD/MM/YYYY"
        />
        <button type="submit" className="submit-button">Xác nhận</button>
      </form>

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Hiển thị countdown nếu người dùng nhập đúng ngày */}
      {countdown !== null && (
        <div className="countdown-box">
          <p className="countdown-text">21 năm trước vào ngày này tháng này bạn chuẩn bị oe oe trong: {countdown}</p>
        </div>
      )}

      <p className="caption">Ô mai gọt! 🎂🎉</p>
    </div>
  );
};

export default Greeting;
