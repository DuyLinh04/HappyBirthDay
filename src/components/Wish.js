import React, { useState, useEffect } from 'react';
import './Wish.css';

export default function Wish() {
  const [wish, setWish] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    createFallingStars(100); // Tạo 100 ngôi sao rơi lơ lửng khi component được render
  }, []);

  const createFallingStars = (numStars) => {
    const container = document.querySelector('.wish-container');
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('falling-star');
      star.style.left = Math.random() * 100 + 'vw';
      star.style.animationDuration = (Math.random() * 5 + 3) + 's';
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
    }
  };

  const handleWishChange = (event) => {
    setWish(event.target.value);
  };

  const handleWishClick = () => {
    setButtonHidden(true);
    setTimeout(() => {
      setShowPaper(true);
    }, 500); // Hiển thị tờ giấy sau khi mở hộp quà
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFlying(true);
    setTimeout(() => {
      setSubmitted(true);
      setShowPaper(false);
    }, 3000); // Hiệu ứng bay kéo dài 3 giây
  };

  return (
    <div className="wish-container">
      {!buttonHidden && (
        <div className="gift-box-container">
          <button className="wish-button" onClick={handleWishClick}>
            Make a Wish 🎂
          </button>
          <div className="gift-box">
            <div className="lid"></div>
            <div className="box"></div>
          </div>
        </div>
      )}

      {showPaper && !submitted && (
        <form className={`wish-form ${isFlying ? 'flying' : ''}`} onSubmit={handleSubmit}>
          <textarea
            value={wish}
            onChange={handleWishChange}
            placeholder="Write your birthday wish here..."
            className="wish-textarea"
            required
          />
          <button type="submit" className="submit-button">
            Send your wish 🎈
          </button>
        </form>
      )}

      {submitted && (
        <div className="thank-you-message">
          <h2>Điều ước của bạn sẽ được chuyển lên trời😁🎊🎂</h2>
          <p>☆*: .｡. o(≧▽≦)o .｡.:*☆ 🌠</p>
        </div>
      )}
    </div>
  );
}
