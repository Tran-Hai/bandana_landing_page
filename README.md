# Sắc - Khăn Lụa Kể Chuyện Việt 🧣

Một website thương mại điện tử tĩnh (static) hiện đại, tinh tế dành cho thương hiệu khăn bandana thổ cẩm **Sắc**, kể câu chuyện văn hóa Việt qua từng sản phẩm.

![Status](https://img.shields.io/badge/status-complete-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/tech-HTML%2FCSS%2FJS-orange)

## ✨ Tính năng nổi bật

### 🛍️ Thương mại điện tử
- **Trưng bày sản phẩm**: Giao diện card sản phẩm hiện đại với hiệu ứng hover, badge (Best Seller, Mới, Premium), và nút quick actions.
- **Giỏ hàng thông minh**: Thêm/xóa/sửa số lượng, lưu trữ cục bộ (localStorage), tính tổng tiền tự động.
- **Wishlist**: Lưu sản phẩm yêu thích với hiệu ứng tim đập (heartbeat animation).
- **Quick View**: Xem nhanh chi tiết sản phẩm mà không cần chuyển trang.
- **Toast Notifications**: Thông báo phản hồi người dùng tức thì, đẹp mắt.

### 🎨 Thiết kế & Trải nghiệm
- **Responsive Design**: Tối ưu hoàn hảo cho Mobile, Tablet và Desktop.
- **Tailwind CSS**: Utility-first CSS framework giúp giao diện nhất quán và nhẹ nhàng.
- **Custom Animations**: Hiệu ứng chuyển động mượt mà (zoom ảnh, lift card, heartbeat).
- **Typography**: Sử dụng font chữ Google Fonts (Playfair Display & Inter) tạo cảm giác sang trọng.

### 📖 Nội dung & Storytelling
- **Trang chủ (Home)**: Giới thiệu bộ sưu tập, sản phẩm nổi bật.
- **Câu chuyện (Story)**: Kể về nguồn cảm hứng, quy trình làm ra sản phẩm và ý nghĩa văn hóa.
- **Phản hồi (Feedback)**: Form đánh giá chi tiết tích hợp với Google Apps Script backend.

## 🛠️ Công nghệ sử dụng

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Styling** | Tailwind CSS (CDN) |
| **Icons** | Font Awesome / SVG Inline |
| **Fonts** | Google Fonts (Playfair Display, Inter) |
| **Backend (Form)** | Google Apps Script (Serverless) |
| **Storage** | LocalStorage (Browser) |
| **Deployment** | Static Hosting (Vercel, Netlify, GitHub Pages) |

## 📂 Cấu trúc dự án

```
/workspace
├── index.html          # Trang chủ - Trưng bày sản phẩm
├── story.html          # Trang câu chuyện thương hiệu
├── feedback.html       # Trang gửi đánh giá/phản hồi
├── style.css           # Custom CSS styles & animations
├── scripts.js          # Logic giỏ hàng, wishlist, UI interactions
├── feedback_script.js  # Xử lý form feedback
├── README.md           # Tài liệu dự án (file này)
└── media/              # Thư mục chứa hình ảnh sản phẩm và banner
    ├── products/
    └── banners/
```

## 🚀 Cài đặt & Chạy dự án

Vì đây là static site, bạn không cần cài đặt phức tạp. Chỉ cần một trình duyệt web.

### Cách 1: Chạy trực tiếp (Simple)
1. Clone hoặc tải dự án về máy.
2. Mở file `index.html` bằng trình duyệt (Chrome, Firefox, Safari...).

### Cách 2: Chạy với Live Server (Khuyến nghị cho Dev)
Để trải nghiệm tốt nhất và tránh lỗi CORS khi load tài nguyên cục bộ:

1. Cài đặt [VS Code](https://code.visualstudio.com/).
2. Cài extension **Live Server**.
3. Mở thư mục dự án trong VS Code.
4. Click chuột phải vào `index.html` và chọn **"Open with Live Server"**.

### Cách 3: Deploy lên mạng (Production)
Dự án sẵn sàng để deploy lên các nền tảng hosting tĩnh miễn phí:

- **Vercel / Netlify**: Kéo thả thư mục dự án hoặc kết nối GitHub.
- **GitHub Pages**: Đẩy code lên GitHub và kích hoạt Pages trong Settings.

## ⚙️ Cấu hình Backend (Google Forms/Apps Script)

Phần form đánh giá (`feedback.html`) được thiết kế để gửi dữ liệu về Google Sheets thông qua Google Apps Script.

1. Tạo một Google Sheet mới.
2. Vào **Extensions > Apps Script**.
3. Dán code xử lý form (có sẵn trong `feedback_script.js`).
4. Deploy dưới dạng **Web App** (Access: Anyone).
5. Thay thế URL Web App vào biến `SCRIPT_URL` trong file `scripts.js`.

## 🎨 Tùy chỉnh

- **Màu sắc**: Sửa các class `text-[color]`, `bg-[color]` trong HTML hoặc biến CSS trong `style.css`.
- **Sản phẩm**: Chỉnh sửa mảng `products` trong file `scripts.js` để thay đổi tên, giá, ảnh, mô tả.
- **Font chữ**: Thay đổi link import trong `<head>` của file HTML.

## 📱 Responsive Breakpoints

Dự án sử dụng breakpoints chuẩn của Tailwind CSS:
- **Mobile**: < 640px
- **Tablet**: ≥ 640px (`sm:`)
- **Desktop**: ≥ 768px (`md:`), ≥ 1024px (`lg:`), ≥ 1280px (`xl:`)

## 🤝 Đóng góp

Mọi đóng góp về ý tưởng thiết kế, tính năng mới hoặc báo lỗi đều được chào đón!
1. Fork dự án.
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`).
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4. Push lên branch (`git push origin feature/AmazingFeature`).
5. Mở Pull Request.

## 📄 License

Dự án mã nguồn mở này được cấp phép theo giấy phép **MIT**. Bạn có thể tự do sử dụng, chỉnh sửa cho mục đích cá nhân hoặc thương mại.

## 📞 Liên hệ

- **Tên dự án**: Sắc - Khăn lụa kể chuyện Việt
- **Email**: [your-email@example.com]
- **Website**: [your-website-url.com]

---
*Được xây dựng với ❤️ và niềm tự hào văn hóa Việt.*
