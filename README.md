# E-ComSync

E-ComSync là một ứng dụng thương mại điện tử hiện đại được xây dựng với Next.js và Spring Boot, cung cấp trải nghiệm mua sắm trực tuyến liền mạch.

## 🚀 Tính năng chính

- Giao diện người dùng hiện đại với Next.js và Tailwind CSS
- Xác thực người dùng an toàn với JWT
- Quản lý giỏ hàng thời gian thực
- Tích hợp WebSocket cho thông báo và cập nhật thời gian thực
- API RESTful với Spring Boot
- Cơ sở dữ liệu PostgreSQL

## 🛠 Công nghệ sử dụng

### Frontend
- Next.js 15.3.1
- React 19.1.0
- Tailwind CSS 4.1.5
- TypeScript
- WebSocket Client

### Backend
- Spring Boot 3.4.5
- Spring Security
- Spring Data JPA
- PostgreSQL
- WebSocket
- JWT Authentication

## 📦 Cài đặt và Chạy

### Yêu cầu hệ thống
- Node.js (phiên bản mới nhất)
- Java 17
- PostgreSQL
- Maven

### Cài đặt Frontend
```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Cài đặt Backend
```bash
# Build project
mvn clean install

# Chạy Spring Boot application
mvn spring-boot:run
```

### Cài đặt Database
1. Tạo database PostgreSQL
2. Cập nhật thông tin kết nối trong `application.properties`

## 🏗 Cấu trúc dự án

```
E-ComSync/
├── app/                    # Next.js frontend
│   ├── auth/              # Authentication pages
│   ├── cart/              # Cart management
│   ├── product/           # Product pages
│   └── contexts/          # React contexts
├── components/            # Reusable React components
├── src/                   # Spring Boot backend
│   ├── main/
│   │   ├── java/         # Java source code
│   │   └── resources/    # Configuration files
│   └── test/             # Test files
└── database/             # Database scripts
```

## 🔒 Bảo mật

- Xác thực JWT
- Spring Security
- CSRF Protection
- Input Validation

## 📝 Giấy phép

Dự án này được cấp phép theo [MIT License](LICENSE).

## 🤝 Đóng góp

Đóng góp luôn được chào đón! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

## 📞 Liên hệ

Mail: Vuongtv1237.dev@gmail.com

---

© 2025 Tran Viet Vuong. All rights reserved.
