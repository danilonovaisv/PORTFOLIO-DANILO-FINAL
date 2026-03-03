---
description: Ghi lại lỗi vào Error Log để học tập và cải thiện
---

# /log-error - Hệ thống Ghi nhận Lỗi Tự động

Workflow này hướng dẫn Agent cách ghi lại lỗi một cách có hệ thống.

## 📋 Các bước thực hiện

1. **Phát hiện lỗi**:
   - Lỗi có thể đến từ: Test fail, Build error, Runtime exception, Logic bug
   - Đọc error message/stack trace đầy đủ

2. **Phân loại lỗi**:
   - **Type**: Xác định loại (Syntax/Logic/Integration/Runtime)
   - **Severity**:
     - `Critical`: Hệ thống không chạy được
     - `High`: Tính năng chính bị hỏng
     - `Medium`: Tính năng phụ có vấn đề
     - `Low`: Lỗi nhỏ, không ảnh hưởng nhiều

3. **Thu thập thông tin**:
   - File và dòng code gây lỗi
   - Agent nào đang làm việc
   - Thời gian xảy ra lỗi
   - Error message chi tiết

4. **Ghi vào ERRORS.md**:
   // turbo
   - Mở file `ERRORS.md`
   - Append entry mới theo format chuẩn (xem `error-logging.md`)
   - Lưu file

5. **Thông báo người dùng**:
   - "🐛 Đã ghi lại lỗi vào `ERRORS.md`. Đang tiến hành sửa..."

6. **Giải quyết lỗi**:
   - Áp dụng fix
   - Test lại để đảm bảo lỗi không tái phát
   - Cập nhật Status trong `ERRORS.md` thành `Fixed`

7. **Học từ lỗi**:
   - Nếu lỗi lặp lại >= 2 lần: Tạo Rule hoặc Test case mới
   - Cập nhật Pre-flight Checklist nếu cần

## 💡 Ví dụ

Khi gặp lỗi import:

```
Error: Cannot find module 'react-bootstrap/Alert'
```

Agent sẽ ghi vào ERRORS.md:

```markdown
## [2026-02-02 11:25] - Missing Import for React Bootstrap Alert

- **Type**: Integration
- **Severity**: High
- **File**: `src/components/Dashboard.jsx:5`
- **Agent**: frontend-specialist
- **Root Cause**: Import package `react-bootstrap` nhưng chưa cài đặt dependency
- **Error Message**:
```

Cannot find module 'react-bootstrap/Alert'

```
- **Fix Applied**: Chạy `npm install react-bootstrap` và kiểm tra imports
- **Prevention**: Luôn kiểm tra `package.json` trước khi import thư viện mới
- **Status**: Fixed
```

---

**Lưu ý**: Workflow này chạy tự động mỗi khi có lỗi. Người dùng không cần gọi thủ công.
