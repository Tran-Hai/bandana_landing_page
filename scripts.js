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
        title: 'Bản sắc việt từ màu sắc',
        content: 'Mỗi vùng miền, mỗi dân tộc Việt Nam đều mang trong mình một bảng màu, một hoa văn đặc trưng, tựa như dấu vân tay của văn hóa. Sắc màu ấy không chỉ nằm trên thổ cẩm Tây Bắc, trên tà áo dài Hà Đông hay những mái ngói rêu phong của Hội An, mà còn sống động trong từng nếp sinh hoạt, trong ký ức của mỗi con người. <b>"Sắc"</b> được khai sinh từ khát vọng gìn giữ và lan tỏa bản sắc văn hóa Việt theo một cách mới mẻ, gần gũi và hợp thời.'
    },
    {
        title: 'Tác phẩm văn hóa thu nhỏ',
        content: 'Với chúng tôi, một chiếc khăn bandana không đơn thuần là phụ kiện thời trang, mà là một tác phẩm văn hóa thu nhỏ. Ở đó, người trẻ có thể vừa “mặc” vừa “kể” một câu chuyện về vùng đất, con người, và tinh thần Việt Nam. Điểm khác biệt của <b>"Sắc"</b> nằm ở việc không chỉ in hoa văn đẹp mắt, mà còn gắn với ngữ cảnh và câu chuyện văn hóa. Mỗi chiếc khăn được thiết kế như một mảnh ghép mang tính biểu tượng, vừa có giá trị sử dụng trong đời sống thường ngày, vừa mang giá trị tinh thần như một tấm hộ chiếu văn hóa mà ai cũng có thể mang theo.'
    },
    {
        title: 'Thời trang kể chuyện (Storytelling Fashion)',
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

const qrCodeModal = document.getElementById('qr-code-modal');
const closeQrModalBtn = document.getElementById('close-qr-modal-btn');
const qrCodeImage = document.getElementById('qr-code-image');
const qrTotalPrice = document.getElementById('qr-total-price');
const qrPaymentCode = document.getElementById('qr-payment-code');
const confirmPaymentBtn = document.getElementById('confirm-payment-btn');
const qrCartItemsContainer = document.getElementById('qr-cart-items');

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

// --- HERO CAROUSEL ---
function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let current = 0;
    let intervalId = null;

    function show(index) {
        slides.forEach((s, i) => {
            s.style.opacity = i === index ? '1' : '0';
            s.style.zIndex = i === index ? '10' : '1';
        });
        current = index;
    }

    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }

    function startAutoplay() {
        stopAutoplay();
        intervalId = setInterval(next, 5000);
    }

    function stopAutoplay() {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // init
    show(0);
    startAutoplay();
}

// --- PRELOAD HERO SLIDES PROGRESSIVELY ---
// Preloads slides after a short delay, one-by-one, to avoid a large initial bandwidth spike.
function preloadHeroSlides(opts = {}) {
    const { initialDelay = 1000, interval = 700 } = opts;

    // Respect users who enabled Save-Data
    const navConn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (navConn && navConn.saveData) {
        console.log('preloadHeroSlides: save-data enabled — skipping preloads');
        return;
    }

    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const imgs = Array.from(carousel.querySelectorAll('.carousel-slide img'));
    if (imgs.length <= 1) return;

    // Start after a short delay so initial rendering isn't impacted
    setTimeout(() => {
        imgs.forEach((img, idx) => {
            if (idx === 0) return; // first image already loaded eagerly
            // schedule progressive preload
            setTimeout(() => {
                try {
                    const p = new Image();
                    // use data-src if present (future-proof), else current src
                    p.src = img.dataset.src || img.src;
                    p.decode && p.decode().catch(() => {});
                    p.onload = () => console.log('preloaded hero image:', p.src);
                } catch (e) {
                    // ignore
                    console.warn('preloadHeroSlides error', e);
                }
            }, interval * idx);
        });
    }, initialDelay);
}

function renderFeatureContent() {
    const featureContainer = document.getElementById('feature-content');
    if (!featureContainer) return;

    let contentHtml = '';
    aboutContent.forEach((item, index) => {
        contentHtml += `
            <div class="bg-neutral p-6 rounded-xl shadow-lg border-t-4 border-primary transition duration-300 hover:shadow-xl">
                <span class="text-4xl font-extrabold text-primary opacity-50 block mb-3">${index + 1}</span> 
                <h3 class="text-xl md:text-2xl font-semibold text-secondary mb-4">
                    ${item.title}
                </h3>
                <p class="leading-relaxed text-sm sm:text-base md:text-xl text-dark-text/90">${item.content}</p>
            </div>
        `;
    });
    featureContainer.innerHTML = contentHtml;
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

// Hàm hiển thị thông báo (trong sidebar)
function showCartMessage(text, isSuccess) {
    cartMessageBox.textContent = text;
    cartMessageBox.classList.remove('hidden', 'bg-green-500', 'bg-red-500');
    if (isSuccess) {
        cartMessageBox.classList.add('bg-green-500');
    } else {
        cartMessageBox.classList.add('bg-red-500');
    }
}

// --- QR CODE MODAL LOGIC ---
function showQrCodeModal() {
    if (!qrCodeModal) return;

    const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const paymentCode = `SAC${Date.now().toString().slice(-6)}`; // Tạo mã thanh toán duy nhất

    // Cập nhật thông tin trên modal
    qrTotalPrice.textContent = `Tổng tiền: ${formatCurrency(totalCartPrice)}`;
    qrPaymentCode.textContent = paymentCode;
    
    // Render cart items in modal
    qrCartItemsContainer.innerHTML = ''; // Clear previous items
    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('flex', 'justify-between', 'text-sm', 'text-dark-text');
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>x${item.quantity}</span>
            `;
            qrCartItemsContainer.appendChild(itemElement);
        });
    }

    // Lưu mã thanh toán vào data attribute của nút confirm để dùng sau
    confirmPaymentBtn.dataset.paymentCode = paymentCode;

    qrCodeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideQrCodeModal() {
    if (qrCodeModal) {
        qrCodeModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// --- HÀM GỬI DỮ LIỆU ĐƠN HÀNG ---
async function submitOrderData() {
    if (cart.length === 0) {
        showCartMessage("Giỏ hàng của bạn đang trống.", false);
        return;
    }
     if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_URL_HERE") {
        showCartMessage("LỖI: Vui lòng thay thế 'YOUR_APPS_SCRIPT_URL_HERE' bằng URL Web App của bạn.", false);
        return;
    }

    const formData = new FormData(cartOrderForm);
    const customerName = formData.get('tenKhach');
    const sdt = formData.get('sdt');
    const diaChi = formData.get('diaChi');
    const ghiChu = formData.get('ghiChu') || 'Không có ghi chú';

    submitCartButton.classList.add('hidden');
    cartLoadingSpinner.classList.remove('hidden');

    try {
        const timeStamp = new Date().toLocaleString('vi-VN');
        const fetchPromises = [];

        cart.forEach(item => {
            const itemData = {
                thoiGian: encodeURIComponent(timeStamp),
                tenSanPham: encodeURIComponent(item.name),
                soLuong: encodeURIComponent(item.quantity),
                tenKhach: encodeURIComponent(customerName),
                sdt: encodeURIComponent(sdt),
                diaChi: encodeURIComponent(diaChi),
                ghiChu: encodeURIComponent(ghiChu)
            };
            
            const body = Object.keys(itemData)
                .map(key => key + '=' + itemData[key])
                .join('&');
            
            const fetchPromise = fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body,
                mode: 'cors'
            }).then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            });
            fetchPromises.push(fetchPromise);
        });

        const results = await Promise.all(fetchPromises);
        const allSuccess = results.every(result => result && result.success);

        if (allSuccess) {
            hideQrCodeModal();
            showCartMessage(`Đơn hàng đã được ghi nhận thành công. Cảm ơn bạn!`, true);
            cart = [];
            saveCart();
            cartOrderForm.reset();
            renderCartItems();
            setTimeout(() => toggleSideCart(false), 3000);
        } else {
            console.error("Lỗi khi gửi một hoặc nhiều sản phẩm:", results);
            showCartMessage("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.", false);
        }

    } catch (error) {
        console.error("Lỗi kết nối hoặc xử lý:", error);
        showCartMessage("Không thể kết nối đến máy chủ. Vui lòng thử lại.", false);
    } finally {
        cartLoadingSpinner.classList.add('hidden');
        submitCartButton.classList.remove('hidden');
    }
}


// Xử lý sự kiện gửi form
cartOrderForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(cartOrderForm);
    const paymentMethod = formData.get('paymentMethod');

    if (paymentMethod === 'online') {
        showQrCodeModal();
    } else {
        // Mặc định là 'cod'
        submitOrderData();
    }
});

// Nút "Tôi đã thanh toán" trên QR Modal
confirmPaymentBtn.addEventListener('click', () => {
    submitOrderData();
});

// Nút đóng QR Modal
closeQrModalBtn.addEventListener('click', hideQrCodeModal);


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
    renderFeatureContent();
    initHeroCarousel();
    // Warm up remaining hero slides progressively (reduces initial load spike)
    preloadHeroSlides({ initialDelay: 1000, interval: 700 });
    updateCartCount(); // Cập nhật số lượng ban đầu
});