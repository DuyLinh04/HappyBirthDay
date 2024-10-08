import React, { useState, useEffect, useRef } from 'react';
import './HappyBirthDay.css';
import backgroundMusic from './birthdaySong.mp3'; // Âm thanh nền riêng
import cardMusic from './5904431981504.mp3'; // Âm thanh trong thiệp riêng
import Anhcm from './anh/z5891584336444_b3810afdf8f7d0284543950102930b30.jpg';
import anh1 from './anh/tải xuống (1).jpg';
import anh2 from './anh/tải xuống (2).jpg';
import anh3 from './anh/tải xuống (3).jpg';
import anh4 from './anh/tải xuống (4).jpg';
import anh5 from './anh/tải xuống (5).jpg';
import anh6 from './anh/tải xuống.jpg';
import anh7 from './anh/419732472_3647659035510632_5655741169154985478_n.jpg';
import anh8 from './anh/419874730_386860103737147_1774591954121401850_n.jpg';
import anh9 from './anh/426545047_375412881863108_552223444374922122_n.jpg';
import anh10 from './anh/429757687_369780765930274_160539925270951672_n.jpg';
import videoAnya from './anh/Anya1.mp4';

const HappyBirthDay = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [fallingItems, setFallingItems] = useState([]);
  const backgroundAudioRef = useRef(null);
  const cardAudioRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFallingItems((prevItems) => {
        if (prevItems.length > 5) {
          return prevItems.slice(1);
        }
        return [
          ...prevItems,
          {
            id: Date.now(),
            emoji: getRandomEmoji(),
            xPosition: Math.random() * 100,
            xDirection: Math.random() > 0.5 ? 1 : -1,
          },
        ];
      });
    }, 4000);

    // Tự động phát nhạc nền khi trang tải
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play();
    }

    // Lắng nghe sự kiện nhấp chuột để đóng thiệp khi nhấn vào khoảng trống
    const handleClickOutside = (event) => {
      if (isCardOpen && cardRef.current && !cardRef.current.contains(event.target)) {
        setIsCardOpen(false);
        cardAudioRef.current.pause();
        cardAudioRef.current.currentTime = 0;
        backgroundAudioRef.current.play();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      clearInterval(interval);
    };
  }, [isCardOpen]);

  const getRandomEmoji = () => {
    const emojis = ['🎉', '🎊', '🎁', '🎈', '🎀', '🪁', '🎶', '🥇', '🧨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const toggleCard = (e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện nhấp chuột lan ra ngoài
    setIsCardOpen((prevState) => !prevState);

    if (!isCardOpen) {
      // Khi mở thiệp, dừng nhạc nền và phát nhạc trong thiệp
      backgroundAudioRef.current.pause();
      cardAudioRef.current.play();
    } else {
      // Khi đóng thiệp, dừng nhạc trong thiệp và phát lại nhạc nền
      cardAudioRef.current.pause();
      cardAudioRef.current.currentTime = 0;
      backgroundAudioRef.current.play();
    }
  };

  return (
    <div className="birthday-container">
      {/* Video background */}
      <video autoPlay muted loop className="background-video">
        <source src={videoAnya} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Âm thanh nền */}
      <audio ref={backgroundAudioRef} loop>
        <source src={backgroundMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Âm thanh trong thiệp */}
      <audio ref={cardAudioRef}>
        <source src={cardMusic} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Hình bánh sinh nhật với nến đặt giữa */}
      <div className="cake-container">
        <img
          src="https://alo.flowers/wp-content/uploads/2021/12/banh-sinh-nhat-nen5d030aa7665a8_18dc6580f71bcd70b1a0ed4a02983019.gif"
          alt="Bánh sinh nhật"
          className="birthday-cake"
        />
      </div>

      {/* Nút mở thiệp */}
      <div className="open-button-container">
        <button className="open-button" onClick={toggleCard}>
          {isCardOpen ? 'CLOSE' : 'OPEN'}
        </button>
      </div>

      {/* Nội dung chúc mừng sau khi mở thiệp */}
      {isCardOpen && (
        <div className="greeting-card" ref={cardRef} onClick={(e) => e.stopPropagation()}>
          <div className="card-content">
            <div className="message-section">
              <h2>🎉 Chúc mừng sinh nhật! 🎉</h2>
              <p>Chúc bạn một tuổi mới luôn vui vẻ hạnh phúc, phúc như Đông Hải, Thọ tỷ Nam Sơn 🎉🪇🎁🎀🎊✨😎😁 và đặc biệt sẽ thành công trong con đường phía trước nhóe My Friend 🎉</p>
            </div>
            <div className="image-section">
              <img src={Anhcm} alt="Hình ảnh chúc mừng" className="greeting-image" />
            </div>
          </div>
        </div>
      )}

      {/* Hình ảnh trang trí phía dưới */}
      <div className="image-carousel">
        <div className="image-track">
          {[anh1, anh2, anh3, anh4, anh5, anh6, anh7, anh8, anh9, anh10].map((src, index) => (
            <img key={index} src={src} alt={`Trang trí tiệc ${index + 1}`} className="party-image" />
          ))}
        </div>
      </div>

      {/* Hiển thị các biểu tượng rơi */}
      {fallingItems.map((item) => (
        <span
          key={item.id}
          className="falling-item"
          style={{
            left: `${item.xPosition}%`,
            '--x-direction': item.xDirection,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
};

export default HappyBirthDay;
