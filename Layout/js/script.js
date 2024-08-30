let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function moveSlide(step) {
    slideIndex += step;

    // Wrap around to first slide if at end
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    }

    // Wrap around to last slide if at beginning
    if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

    updateSlidePosition();
}

function updateSlidePosition() {
    const offset = -slideIndex * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

// Auto move slides every 5 seconds (optional)
setInterval(() => {
    moveSlide(1);
}, 5000);


// CAPTCHA generator
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// Set CAPTCHA on page load
document.addEventListener('DOMContentLoaded', function () {
    const captchaElement = document.getElementById('captcha');
    const refreshButton = document.getElementById('refresh-captcha');

    function setCaptcha() {
        captchaElement.textContent = generateCaptcha();
    }

    setCaptcha();

    // Refresh CAPTCHA when button is clicked
    refreshButton.addEventListener('click', setCaptcha);
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const currentLeft = window.getComputedStyle(sidebar).left;
    if (currentLeft === '0px') {
        sidebar.style.left = '-250px'; // Hide sidebar
    } else {
        sidebar.style.left = '0px'; // Show sidebar
    }
}


// Bar Chart 1
const barChart1Canvas = document.getElementById('barChart1');
const barChart1Ctx = barChart1Canvas.getContext('2d');

const barData1 = [12, 19, 3, 5, 2, 3];
const barLabels1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function drawBarChart(ctx, data, labels) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const barWidth = 40;
    const barGap = 20;
    const barMaxHeight = 200;
    
    data.forEach((value, index) => {
        const barHeight = (value / Math.max(...data)) * barMaxHeight;
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(index * (barWidth + barGap), ctx.canvas.height - barHeight, barWidth, barHeight);
        ctx.fillStyle = '#000';
        ctx.fillText(labels[index], index * (barWidth + barGap) + 10, ctx.canvas.height - 5);
    });
}

drawBarChart(barChart1Ctx, barData1, barLabels1);

// Repeat for Bar Chart 2 and Bar Chart 3
const barChart2Canvas = document.getElementById('barChart2');
const barChart2Ctx = barChart2Canvas.getContext('2d');

const barData2 = [7, 15, 10, 8, 12, 5];
const barLabels2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

drawBarChart(barChart2Ctx, barData2, barLabels2);

const barChart3Canvas = document.getElementById('barChart3');
const barChart3Ctx = barChart3Canvas.getContext('2d');

const barData3 = [20, 15, 25, 18, 30, 22];
const barLabels3 = ['A', 'B', 'C', 'D', 'E', 'F'];

drawBarChart(barChart3Ctx, barData3, barLabels3);
