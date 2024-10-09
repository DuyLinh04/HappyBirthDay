import $ from 'jquery';
import { gsap } from 'gsap';

// Khai báo và lưu trữ các biến
let w, container, carousel, item, radius, itemLength, rY, ticker, fps;
let mouseX = 0;
let mouseY = 0;
let mouseZ = 0;
let addX = 0;

// Đối tượng fps_counter để theo dõi FPS
const fps_counter = {
    tick: function () {
        // Sao chép mảng mỗi lần tick để các đối tượng riêng biệt không chia sẻ trạng thái
        this.times = this.times.concat(+new Date());
        let times = this.times;

        if (times.length > this.span + 1) {
            times.shift(); // Bỏ đi thời gian cũ nhất
            const seconds = (times[times.length - 1] - times[0]) / 1000;
            return Math.round(this.span / seconds);
        } else return null;
    },
    times: [],
    span: 20
};
const counter = Object.create(fps_counter);

$(document).ready(init);

function init() {
    w = $(window);
    container = $('#contentContainer');
    carousel = $('#carouselContainer');
    item = $('.carouselItem');
    itemLength = item.length;
    fps = $('#fps');
    rY = 360 / itemLength;
    radius = Math.round(250 / Math.tan(Math.PI / itemLength));

    // Đặt các thuộc tính 3D cho container
    TweenMax.set(container, { perspective: 600 });
    TweenMax.set(carousel, { z: -radius });

    // Tạo các thuộc tính cho từng mục của carousel
    item.each((index, element) => {
        const $item = $(element);
        const $block = $item.find('.carouselItemInner');
        TweenMax.set($item, { rotationY: rY * index, z: radius, transformOrigin: "50% 50% " + -radius + "px" });
        animateIn($item, $block);
    });

    // Đặt các thuộc tính cho di chuyển chuột và ticker lặp
    window.addEventListener("mousemove", onMouseMove, false);
    ticker = setInterval(looper, 1000 / 60);
}

function animateIn($item, $block) {
    const $nrX = 360 * getRandomInt(2);
    const $nrY = 360 * getRandomInt(2);

    const $nx = -2000 + getRandomInt(4000);
    const $ny = -2000 + getRandomInt(4000);
    const $nz = -4000 + getRandomInt(4000);

    const $s = 1.5 + (getRandomInt(10) * 0.1);
    const $d = 1 - (getRandomInt(8) * 0.1);

    TweenMax.set($item, { autoAlpha: 1, delay: $d });
    TweenMax.set($block, { z: $nz, rotationY: $nrY, rotationX: $nrX, x: $nx, y: $ny, autoAlpha: 0 });
    TweenMax.to($block, $s, { delay: $d, rotationY: 0, rotationX: 0, z: 0, ease: Expo.easeInOut });
    TweenMax.to($block, $s - 0.5, { delay: $d, x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut });
}

function onMouseMove(event) {
    mouseX = -(-(window.innerWidth * 0.5) + event.pageX) * 0.0025;
    mouseY = -(-(window.innerHeight * 0.5) + event.pageY) * 0.01;
    mouseZ = -radius - (Math.abs(-(window.innerHeight * 0.5) + event.pageY) - 200);
}

// Lặp lại và đặt các thuộc tính 3D của carousel
function looper() {
    addX += mouseX;
    TweenMax.to(carousel, 1, { rotationY: addX, rotationX: mouseY, ease: Quint.easeOut });
    TweenMax.set(carousel, { z: mouseZ });
    fps.text('Framerate: ' + counter.tick() + '/60 FPS');
}

function getRandomInt($n) {
    return Math.floor(Math.random() * $n + 1);
}
