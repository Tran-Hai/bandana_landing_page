
// --- CẤU HÌNH API GOOGLE APPS SCRIPT ---
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpAulmiaCJotb7dKnhBz_p3vlEuNPRUAD8lyiJ4JKW-6Ztvmk2ZTnBnmuJquSnaTNLHQ/exec"; 
// ------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedback-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Đang gửi...';

        const formData = new FormData(form);
        
        // Thêm tham số để xác định sheet
        formData.append('sheetName', 'ĐÁNH GIÁ');

        fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if(data.result === 'success') {
                alert('Cảm ơn bạn đã gửi đánh giá!');
                form.reset();
            } else {
                throw new Error(data.error || 'Lỗi không xác định');
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Đã có lỗi xảy ra, vui lòng thử lại.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });
});
