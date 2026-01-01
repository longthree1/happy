const wishes = [
    "Chúc bạn năm mới vạn sự như ý, tỷ sự như mơ!",
    "Chúc mừng năm mới 2026: An khang thịnh vượng, mã đáo thành công!",
    "Tết đến gia đình hạnh phúc, lộc vào đầy nhà, vạn thọ vô biên.",
    "Chúc bạn năm mới sức khỏe dồi dào, công việc hanh thông, tấn tài tấn lộc.",
    "Chúc bạn 12 tháng phú quý, 365 ngày phát lộc, 8760 giờ sung túc.",
    "Năm mới Bính Ngọ: Tiền vào như nước, tiền ra nhỏ giọt như cà phê phin.",
    "Chúc bạn luôn hoan hỉ, sức khỏe bền bỉ, tiền vào bạc tỷ, vạn sự như ý.",
    "Chúc năm mới: Đa lộc, đa tài, đa phú quý. Đắc thời, đắc thắng, đắc nhân tâm.",
    "Năm mới chúc bạn công thành danh toại, trẻ mãi không già, phúc lộc đầy nhà.",
    "Chúc mừng xuân 2026: Hạnh phúc bình an, tiền tài viên mãn."
    // Bạn có thể copy thêm đủ 20 câu tại đây
];

function startApp() {
    const name = document.getElementById('userName').value;
    if (!name) {
        alert("Bạn hãy nhập tên nhé!");
        return;
    }

    // Gửi dữ liệu về Server (sau đó server gửi cho Telegram)
    fetch('/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            browser: navigator.userAgent
        })
    });

    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('wish-section').classList.remove('hidden');
    document.getElementById('greeting').innerText = `Chào ${name}, chúc bạn một năm mới rạng rỡ!`;
}

function openLixi() {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    const wishBox = document.getElementById('final-wish');
    wishBox.innerText = randomWish;
    wishBox.classList.remove('hidden');
    document.querySelector('.lixi-card').style.display = 'none';
}
// ... (Các phần code cũ của bạn ở trên: mảng wishes, hàm startApp, openLixi) ...

/* --- HIỆU ỨNG HOA RƠI --- */

const flowerContainer = document.getElementById('flower-container');
const flowerImages = ['mai.png', 'dao.png']; // Tên 2 file ảnh bạn đã lưu

function createFlower() {
    const flower = document.createElement('img');
    
    // Chọn ngẫu nhiên hoa mai hoặc đào
    const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    flower.src = randomImage;
    flower.classList.add('falling-flower');

    // --- Ngẫu nhiên hóa các thuộc tính ---

    // 1. Vị trí xuất hiện ngang (từ 0% đến 100% chiều rộng màn hình)
    flower.style.left = Math.random() * 100 + 'vw';

    // 2. Kích thước ngẫu nhiên (từ 20px đến 50px)
    const size = Math.random() * 30 + 20;
    flower.style.width = size + 'px';
    flower.style.height = size + 'px';

    // 3. Thời gian rơi ngẫu nhiên (từ 5 giây đến 12 giây) - Tạo độ sâu
    const duration = Math.random() * 7 + 5;
    flower.style.animationDuration = duration + 's';

    // 4. Độ trễ ngẫu nhiên một chút để không xuất hiện cùng lúc
    flower.style.animationDelay = Math.random() * 2 + 's';

    // Thêm hoa vào container
    flowerContainer.appendChild(flower);

    // QUAN TRỌNG: Xóa bông hoa sau khi nó rơi xong để tránh nặng máy
    // Thời gian xóa = thời gian rơi + thời gian trễ + 1 giây dư
    setTimeout(() => {
        flower.remove();
    }, (duration + 3) * 1000);
}

// --- Kích hoạt hiệu ứng ---
// Tạo hoa liên tục. Số 200 nghĩa là cứ 200ms (0.2 giây) tạo 1 bông.
// Muốn nhiều hoa hơn thì giảm số này (ví dụ 100). Muốn ít hơn thì tăng lên (ví dụ 500).
setInterval(createFlower, 200);

// Tạo ngay một vài bông lúc đầu cho đỡ trống
for(let i = 0; i < 15; i++) {
    setTimeout(createFlower, Math.random() * 1000);
}