// --- CẤU HÌNH API GOOGLE APPS SCRIPT ---
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfQKGNrfd74kTI5Me7jV72DEsTPUoqoVAvin-FvlrNANlj31i_9K9smicTjmMZzn7CRg/exec"; 
// ------------------------------------------

// MOCK DATA: Giả lập cơ sở dữ liệu cho các câu chuyện của khăn
const productStories = {
    'Nguyệt Sắc': {
        image: 'media/patern 3.png', 
        subImages: [
            'media/patern 3.png',
            'media/xoan sac nui/DSC05215.jpg',
            'media/xoan sac nui/DSC05256.jpg',
            'media/xoan sac nui/DSC05275.jpg',
            'media/xoan sac nui/DSC05305.jpg',
        ],
        price: 129000,
        // Story đã được chuyển sang story.html
    },
    'Cánh Én Mùa Xuân': {
        image: 'media/patern 2.png',
        subImages: [
            'media/patern 2.png', 
            'media/canh en/DSC05173.jpg',
            'media/canh en/DSC05247.jpg',
            'media/canh en/DSC05265.jpg',
            'media/canh en/DSC05299.jpg',
        ],
        price: 129000,
        // Story đã được chuyển sang story.html
    },
    'Xoắn Sắc Núi': {
        image: 'media/Pattern 1.png',
        subImages: [
            'media/Pattern 1.png',
            'media/nguyet sac/DSC05198.jpg',
            'media/nguyet sac/DSC05252.jpg',
            'media/nguyet sac/DSC05281.jpg',
            'media/nguyet sac/DSC05311.jpg',
        ],
        price: 129000,
    }
};

// Dữ liệu TĨNH cho phần "Về Chúng Tớ"
const aboutContent = [
    {
        title: 'Bản Sắc Việt Từ Màu Sắc',
        content: 'Mỗi vùng miền, mỗi dân tộc Việt Nam đều mang trong mình một bảng màu, một hoa văn đặc trưng, tựa như dấu vân tay của văn hóa. Sắc màu ấy không chỉ nằm trên thổ cẩm Tây Bắc, trên tà áo dài Hà Đông hay những mái ngói rêu phong của Hội An, mà còn sống động trong từng nếp sinh hoạt, trong ký ức của mỗi con người. <b>"Sắc"</b> được khai sinh từ khát vọng gìn giữ và lan tỏa bản sắc văn hóa Việt theo một cách mới mẻ, gần gũi và hợp thời.'
    },
    {
        title: 'Tác Phẩm Văn Hóa Thu Nhỏ',
        content: 'Với chúng tớ, một chiếc khăn bandana không đơn thuần là phụ kiện thời trang, mà là một tác phẩm văn hóa thu nhỏ. Ở đó, người trẻ có thể vừa “mặc” vừa “kể” một câu chuyện về vùng đất, con người, và tinh thần Việt Nam. Điểm khác biệt của <b>"Sắc"</b> nằm ở việc không chỉ in hoa văn đẹp mắt, mà còn gắn với ngữ cảnh và câu chuyện văn hóa. Mỗi chiếc khăn được thiết kế như một mảnh ghép mang tính biểu tượng, vừa có giá trị sử dụng trong đời sống thường ngày, vừa mang giá trị tinh thần như một tấm hộ chiếu văn hóa mà ai cũng có thể mang theo.'
    },
    {
        title: 'Thời Trang Kể Chuyện (Storytelling Fashion)',
        content: 'Trong bối cảnh storytelling fashion (thời trang kể chuyện) đang trở thành xu hướng, người trẻ không còn muốn dừng lại ở “mặc đẹp”, mà muốn “mặc ý nghĩa”, “mặc câu chuyện”. <b>"Sắc"</b> chính là lời đáp cho xu hướng ấy: một thương hiệu giúp họ tìm về văn hóa truyền thống nhưng được thể hiện bằng hình thức hiện đại, tinh tế và sáng tạo. Hơn cả một phụ kiện, <b>"Sắc"</b> là nơi bản sắc dân tộc được thổi hồn, để mỗi bước chân người trẻ đều mang theo một phần câu chuyện Việt Nam.'
    }
];

// --- GLOBAL UI ELEMENTS ---
const cartCountDisplay = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartSummaryMessage = document.getElementById('cart-message');
const submitCartButton = document.getElementById('submit-cart-button');
const cartLoadingSpinner = document.getElementById('cart-loading-spinner');
const cartMessageBox = document.getElementById('cart-message-box');
const cartOrderForm = document.getElementById('cart-order-form');
const totalSummaryLabel = document.getElementById('total-summary-label');
const totalPriceDisplay = document.getElementById('total-price');

const sideCart = document.getElementById('side-cart');
const sideCartOverlay = document.getElementById('side-cart-overlay');

const aboutContentDiv = document.getElementById('about-content'); 

// --- TRẠNG THÁI GIỎ HÀNG (Sử dụng LocalStorage để giữ lại giỏ hàng khi F5) ---
let cart = JSON.parse(localStorage.getItem('bandanaCart')) || [];

// --- HÀM HỖ TRỢ ĐỊNH DẠNG TIỀN TỆ ---
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// --- HÀM CUỘN MƯỢT ---
function smoothScroll(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        return true;
    }
    return false;
}

function renderSubImages() {
    // Logic render ảnh phụ vẫn giữ nguyên
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.getAttribute('data-product-name');
        const productId = card.getAttribute('data-product-id');
        const storyData = productStories[productName];
        
        if (storyData && storyData.subImages) {
            let imagesHtml = '';
            storyData.subImages.forEach((imgUrl, index) => {
                imagesHtml += `
                    <img 
                        src="${imgUrl}" 
                        alt="Ảnh phụ ${index + 1} ${productName}" 
                        data-main-image-id="${productId}"
                        class="w-16 h-16 object-cover rounded-md border border-gray-300 hover:border-secondary transition duration-200 cursor-pointer flex-shrink-0 sub-image"
                        onerror="this.src='https://placehold.co/100x100/CCCCCC/333333?text=P${index + 1}'" 
                    />
                `;
            });

            const subImageContainer = card.querySelector('.sub-image-gallery');
            if (subImageContainer) {
                subImageContainer.innerHTML = imagesHtml;
            }

            card.querySelectorAll('.sub-image').forEach(subImage => {
                subImage.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-main-image-id');
                    const newSrc = this.getAttribute('src');
                    const targetImage = document.getElementById(`main-image-${targetId}`);
                    
                    if (targetImage) {
                        targetImage.src = newSrc;
                    }
                });
            });
        }
    });
}

function renderAboutContent() {
    let contentHtml = '';
    
    aboutContent.forEach((item, index) => {
        contentHtml += `
            <div class="bg-neutral p-6 rounded-xl shadow-lg border-t-4 border-primary transition duration-300 hover:shadow-xl">
                <span class="text-4xl font-extrabold text-primary opacity-50 block mb-3">${index + 1}</span> 
                <h3 class="text-xl md:text-2xl font-semibold text-secondary mb-4">
                    ${item.title}
                </h3>
                <p class="leading-relaxed text-base text-dark-text/90">${item.content}</p>
            </div>
        `;
    });
    aboutContentDiv.innerHTML = contentHtml;
}

// --- LOGIC GIỎ HÀNG ---

// Hàm cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountDisplay.textContent = totalItems;
    submitCartButton.disabled = totalItems === 0;
    if (totalItems > 0) {
        cartSummaryMessage.classList.add('hidden');
    } else {
        cartSummaryMessage.classList.remove('hidden');
    }
}

// Hàm lưu giỏ hàng vào Local Storage
function saveCart() {
    localStorage.setItem('bandanaCart', JSON.stringify(cart));
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName) {
    const product = cart.find(item => item.name === productName);
    const productData = productStories[productName];

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productData.price,
            image: productData.image,
            quantity: 1
        });
    }

    saveCart();
    renderCartItems();
    updateCartCount();
    toggleSideCart(true); // Mở giỏ hàng sau khi thêm
}

// Hàm thay đổi số lượng
function changeQuantity(productName, delta) {
    const product = cart.find(item => item.name === productName);
    
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            // Xóa nếu số lượng bằng 0
            cart = cart.filter(item => item.name !== productName);
        }
    }
    saveCart();
    renderCartItems();
    updateCartCount();
}

// Hàm xóa sản phẩm khỏi giỏ
function removeItem(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart();
    renderCartItems();
    updateCartCount();
}

// Hàm render nội dung giỏ hàng
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalItemCount = 0;
    let totalCartPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="text-center p-6 italic text-dark-text/70">Giỏ hàng đang trống.</div>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalCartPrice += itemTotal;
            totalItemCount += item.quantity;

            const itemHtml = `
                <div class="flex items-center bg-background p-3 rounded-lg shadow-sm border border-neutral-300">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md flex-shrink-0 mr-3" onerror="this.src='https://placehold.co/64x64/A31D1D/FFFFFF?text=Sản+Phẩm'">
                    <div class="flex-grow">
                        <h5 class="text-dark-text font-semibold text-base">${item.name}</h5>
                        <p class="text-sm text-secondary font-bold">${formatCurrency(item.price)}</p>
                    </div>
                    <div class="flex items-center space-x-2 flex-shrink-0">
                        <button onclick="changeQuantity('${item.name}', -1)" class="w-6 h-6 bg-primary text-white rounded-full text-sm hover:bg-secondary transition duration-200 disabled:opacity-50" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="font-bold text-dark-text w-4 text-center">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.name}', 1)" class="w-6 h-6 bg-primary text-white rounded-full text-sm hover:bg-secondary transition duration-200">+</button>
                        <button onclick="removeItem('${item.name}')" class="text-gray-400 hover:text-red-500 transition duration-200 ml-2">
                            <i class="fas fa-trash-alt text-lg"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHtml;
        });
    }

    // Cập nhật tổng cộng
    totalSummaryLabel.textContent = `Tổng cộng (${totalItemCount} sản phẩm):`; 
    totalPriceDisplay.textContent = formatCurrency(totalCartPrice);
    updateCartCount();
}

// Hàm đóng/mở Side Cart
function toggleSideCart(forceOpen = false) {
    const isOpen = sideCart.classList.contains('translate-x-0');

    if (isOpen && !forceOpen) {
        // Đóng Cart
        sideCart.classList.remove('translate-x-0');
        sideCart.classList.add('translate-x-full');
        sideCartOverlay.classList.add('hidden');
        document.body.style.overflow = ''; // Cho phép cuộn lại
        cartMessageBox.classList.add('hidden'); // Ẩn thông báo lỗi/thành công khi đóng
    } else if (!isOpen) {
        // Mở Cart
        renderCartItems(); // Render lại nội dung trước khi mở
        sideCart.classList.remove('translate-x-full');
        sideCart.classList.add('translate-x-0');
        sideCartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Ngăn cuộn body
    }
}

// Hiển thị thông báo (trong sidebar)
function showCartMessage(text, isSuccess) {
    cartMessageBox.textContent = text;
    cartMessageBox.classList.remove('hidden', 'bg-green-500', 'bg-red-500');
    if (isSuccess) {
        cartMessageBox.classList.add('bg-green-500');
    } else {
        cartMessageBox.classList.add('bg-red-500');
    }
}

// Xử lý sự kiện gửi form
cartOrderForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showCartMessage("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm!", false);
        return;
    }

    if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_URL_HERE") {
        showCartMessage("LỖI: Vui lòng thay thế 'YOUR_APPS_SCRIPT_URL_HERE' bằng URL Web App của bạn.", false);
        return;
    }

    // 1. Lấy thông tin khách hàng từ form MỘT LẦN VÀ TRƯỚC VÒNG LẶP
    const formData = new FormData(cartOrderForm);
    const customerName = formData.get('tenKhach');
    const sdt = formData.get('sdt');
    const diaChi = formData.get('diaChi');
    const ghiChu = formData.get('ghiChu') || 'Không có ghi chú';

    // 2. Hiển thị loading và vô hiệu hóa nút submit
    submitCartButton.classList.add('hidden');
    cartLoadingSpinner.classList.remove('hidden');
    
    try {
        
        const timeStamp = new Date().toLocaleString('vi-VN');
        
        const fetchPromises = [];

        // 3. Lặp qua giỏ hàng và tạo từng request riêng lẻ cho mỗi sản phẩm (mỗi dòng trong sheet)
        cart.forEach(item => {
            
            // CẤU TRÚC DỮ LIỆU ĐÃ ĐƯỢC ĐIỀU CHỈNH LẠI
            const itemData = {
                thoiGian: encodeURIComponent(timeStamp),            // 1. THỜI GIAN (A)
                tenSanPham: encodeURIComponent(item.name),          // 2. SẢN PHẨM (B)
                soLuong: encodeURIComponent(item.quantity),         // 3. SỐ LƯỢNG (C)
                tenKhach: encodeURIComponent(customerName),         // 4. TÊN (D)
                sdt: encodeURIComponent(sdt),                       // 5. SĐT (E)
                diaChi: encodeURIComponent(diaChi),                 // 6. ĐỊA CHỈ (F)
                ghiChu: encodeURIComponent(ghiChu)                  // 7. GHI CHÚ (G)
            };
            
            // 4. Chuyển đổi đối tượng dữ liệu đã được mã hóa thành chuỗi query string
            const body = Object.keys(itemData)
                .map(key => key + '=' + itemData[key])
                .join('&');
            
            // 5. Tạo fetch promise cho mỗi mặt hàng
            const fetchPromise = fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                body: body,
                mode: 'cors'
            }).then(response => {
                // Kiểm tra phản hồi HTTP trước
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            });

            fetchPromises.push(fetchPromise);
        });

        // 6. Chờ tất cả các request hoàn thành
        const results = await Promise.all(fetchPromises);
        
        // Kiểm tra xem tất cả các request có thành công không
        const allSuccess = results.every(result => result && result.success);

        if (allSuccess) {
            showCartMessage(`Đơn hàng (${cart.length} loại sản phẩm) đã được ghi nhận thành công. Cảm ơn bạn!`, true);
            
            // Xóa giỏ hàng và reset form sau khi đặt hàng thành công
            cart = [];
            saveCart();
            cartOrderForm.reset();
            renderCartItems();

            // Tự động đóng sidebar sau 3 giây
            setTimeout(() => toggleSideCart(false), 3000); 
        } else {
            // Xử lý nếu có ít nhất một request thất bại
            console.error("Lỗi khi gửi một hoặc nhiều sản phẩm:", results);
            showCartMessage("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.", false);
        }

    } catch (error) {
        // Lỗi kết nối hoặc lỗi HTTP
        console.error("Lỗi kết nối hoặc xử lý:", error);
        showCartMessage("Không thể kết nối đến máy chủ hoặc lỗi xử lý dữ liệu. Vui lòng kiểm tra console log.", false);
    } finally {
        // Ẩn loading và khôi phục nút submit
        cartLoadingSpinner.classList.add('hidden');
        submitCartButton.classList.remove('hidden');
    }
});

// --- XỬ LÝ MOBILE SIDEBAR ---
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop'); 

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');

    if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        mobileMenuBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileMenuBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
closeMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenuBackdrop.addEventListener('click', toggleMobileMenu); 

document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            if (this.classList.contains('mobile-nav-link')) {
                toggleMobileMenu(); 
                setTimeout(() => smoothScroll(targetId), 300); 
            } else {
                smoothScroll(targetId);
            }
        }
    });
});

// GỌI HÀM KHỞI TẠO
document.addEventListener('DOMContentLoaded', () => {
    renderSubImages();
    renderAboutContent();
    updateCartCount(); // Cập nhật số lượng ban đầu
});
