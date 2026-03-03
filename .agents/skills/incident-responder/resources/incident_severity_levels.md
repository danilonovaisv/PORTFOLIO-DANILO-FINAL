# 🚨 Incident Severity Levels (P1 - P4)

Bảng phân loại mức độ nghiêm trọng để ưu tiên xử lý.

| Level  | Severity     | Impact                                                                      | Response Time           |
| :----- | :----------- | :-------------------------------------------------------------------------- | :---------------------- |
| **P1** | **Critical** | Toàn bộ hệ thống sập. Tất cả người dùng bị ảnh hưởng.                       | **Ngay lập tức** (24/7) |
| **P2** | **High**     | Chức năng cốt lõi (Checkout, Login) bị hỏng. Nhiều người dùng bị ảnh hưởng. | **Dưới 1 giờ**          |
| **P3** | **Medium**   | Chức năng phụ bị lỗi. Có thể làm việc tạm thời (Workaround).                | **Dưới 4 giờ**          |
| **P4** | **Low**      | Lỗi giao diện nhỏ, Typo. Không ảnh hưởng đến nghiệp vụ.                     | **Theo lịch Sprint**    |

---

### 🛡️ Incident Protocol:

1. **P1/P2**: Kích hoạt kênh liên lạc khẩn cấp (War Room).
2. **P3**: Tạo ticket và xử lý trong ngày làm việc.
3. **P4**: Ghi chú vào Backlog.
