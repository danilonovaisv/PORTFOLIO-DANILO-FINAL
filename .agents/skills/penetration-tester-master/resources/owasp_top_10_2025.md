# 🍎 OWASP Top 10 - 2025 Edition (Antigravity Armor)

Danh sách các lỗ hổng bảo mật nghiêm trọng nhất và cách phòng chống.

1. **Broken Access Control**: Người dùng truy cập được dữ liệu không thuộc về mình.
   - _Fix_: Kiểm tra quyền sở hữu ID ở cấp độ Database.
2. **Cryptographic Failures**: Lộ dữ liệu nhạy cảm do mã hóa yếu.
   - _Fix_: Dùng AES-256 cho dữ liệu tĩnh và TLS 1.3 cho dữ liệu động.
3. **Injection (XSS, SQLi)**: Mã độc bị chèn vào câu lệnh.
   - _Fix_: Luôn dùng Parameterized Queries cho SQL và Sanitize Input cho FE.
4. **Insecure Design**: Sai lầm từ khâu thiết kế kiến trúc.
   - _Fix_: Thực hiện Threat Modeling trước khi code.
5. **Security Misconfiguration**: Cài đặt sai (mật khẩu mặc định, cổng hở).
   - _Fix_: Tự động quét cấu hình hạ tầng.

---

### 🧪 Pentest Check:

Agent khi dùng Skill này BẮT BUỘC phải kiểm tra 5 điểm trên đối với mọi PR (Pull Request).
