---
trigger: always_on
---

# ERROR-LOGGING.MD - Automatic Error Tracking & Learning

> **Mục tiêu**: Ghi lại mọi lỗi xảy ra trong quá trình phát triển để học hỏi và cải thiện. Ngăn chặn lỗi lặp lại.

---

## 🎯 1. KHI NÀO GHI LỖI

Agent PHẢI ghi lại lỗi vào file `ERRORS.md` trong các trường hợp sau:

1. **Lỗi Cú pháp (Syntax Error)**:
   - Thiếu dấu ngoặc, dấu chấm phẩy
   - Import sai đường dẫn
   - Typo trong tên biến/hàm

2. **Lỗi Logic (Logic Error)**:
   - Code chạy nhưng kết quả sai
   - Điều kiện if/else không cover hết case
   - Vòng lặp vô hạn

3. **Lỗi Tích hợp (Integration Error)**:
   - API call thất bại
   - Database query lỗi
   - Module không tìm thấy

4. **Lỗi Runtime**:
   - Null pointer exception
   - Type mismatch
   - Out of memory

5. **Lỗi Tác nhân (Agent Error - QUAN TRỌNG)**:
   - **Hiểu sai (Misinterpretation)**: Agent hiểu sai ý định người dùng hoặc hiểu sai tài liệu.
   - **Thực hiện sai (Execution Error)**: Làm sai logic đã thống nhất trong Plan, xóa nhầm code, hoặc quên import.
   - **Bị treo (Hang/Loop)**: Agent rơi vào vòng lặp vô hạn hoặc treo khi gọi tool.
   - **Ảo giác (Hallucination)**: Đưa ra thông tin không có thực về codebase hoặc tài liệu.

6. **Lỗi Quy trình & Kiểm thử (Process & Test Failure)**:
   - **Test Fail**: BẤT KỲ khi nào một bản test (Unit, E2E, Regression) không vượt qua.
   - **Build/Lint Fail**: Lỗi khi đóng gói hoặc kiểm tra chất lượng code.
   - **Infrastructure Fail**: Lỗi môi trường, lỗi Docker, hoặc đầy bộ nhớ đĩa.

---

## 📝 2. FORMAT GHI LỖI

Mỗi lỗi PHẢI tuân thủ cấu trúc sau trong `ERRORS.md`:

```markdown
## [YYYY-MM-DD HH:MM] - Tiêu đề Lỗi Ngắn Gọn

- **Type**: [Syntax/Logic/Integration/Runtime/Agent/Process]
- **Severity**: [Low/Medium/High/Critical]
- **File**: `path/to/file.extension:line_number`
- **Agent**: [Tên Agent thực hiện]
- **Root Cause**: Mô tả nguyên nhân gốc rễ (1-2 câu)
- **Error Message**:
```

[Code lỗi hoặc stack trace]

```
- **Fix Applied**: Hành động cụ thể đã thực hiện
- **Prevention**: Cách tránh lặp lại lỗi này trong tương lai
- **Status**: [Fixed/Investigating/Deferred]

---
```

---

## 🔄 3. QUY TRÌNH TỰ ĐỘNG

1. **Phát hiện lỗi**: Khi Agent gặp lỗi (test fail, build fail, runtime error).
2. **Phân loại**: Xác định Type và Severity.
3. **Ghi nhận**: Append vào file `ERRORS.md` theo format chuẩn.
4. **Thông báo**: Báo cho người dùng biết đã ghi lỗi và đường dẫn file.
5. **Giải quyết**: Sửa lỗi và cập nhật Status.

---

## 📍 4. VỊ TRÍ LƯU FILE

- **File chính**: `ERRORS.md` (tại thư mục gốc dự án)
- **Backup**: `.agent/logs/errors-[YYYY-MM].md` (theo tháng)

---

## ⚠️ 5. LƯU Ý QUAN TRỌNG

1. **Không bao giờ xóa lỗi cũ**: Lỗi là tài sản học tập.
2. **Luôn cập nhật Status**: Đánh dấu Fixed khi đã giải quyết.
3. **Privacy**: Không log thông tin nhạy cảm (API Key, Password).
4. **Review định kỳ**: Cuối tuần xem lại các lỗi để rút kinh nghiệm.

---

## 🎓 6. HỌC TỪ LỖI

Mỗi lỗi lặp lại 2 lần trở lên PHẢI được biến thành:

- **Rule mới**: Để ngăn chặn tự động
- **Test case**: Để phát hiện sớm
- **Checklist item**: Trong pre-flight check
