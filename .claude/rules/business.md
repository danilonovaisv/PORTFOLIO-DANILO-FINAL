---
trigger: glob
glob: '**/*.{py,js,ts,go,rs,sql,php,java}'
---

# BUSINESS.MD - Business Logic & Domain Standards

> **Mục tiêu**: Đảm bảo Logic Nghiệp vụ (Business Logic) chính xác, tuân thủ DDD và dễ dàng Audit.

---

## 💼 1. DOMAIN-DRIVEN DESIGN (DDD)

1. **Ubiquitous Language**:
   - Sử dụng từ vựng thống nhất giữa Code và Nghiệp vụ (Ví dụ: Nếu cty gọi là `Shipment`, không được code là `Delivery`).
2. **Rich Models**:
   - Logic nghiệp vụ nằm trong Entity/Model, không nằm rải rác ở Controller.
   - Ví dụ: `order.cancel()` thay vì `orderService.cancelOrder(order)`.

---

## 🛡️ 2. TRANSACTION & AUDIT

1. **ACID**: Mọi thao tác thay đổi dữ liệu liên quan đến tiền/trạng thái quan trọng BẮT BUỘC phải nằm trong Transaction.
2. **Audit Logging**:
   - Ghi lại "Ai làm gì, lúc nào, giá trị cũ/mới".
   - Không được phép "Soft Delete" dữ liệu tài chính (Dùng `status: cancelled` thay vì xóa dòng).

---

## 💰 3. MONEY & PRECISION

1. **No Float**: Cấm tuyệt đối dùng `float` hoặc `double` để tính tiền.
2. **Decimal/Int**: Sử dụng `Decimal` (Python/C#) hoặc `BigInt` (JS) lưu đơn vị nhỏ nhất (cents/xu).

---

## 🔒 4. AUTHORIZATION (RBAC/ABAC)

1. **Check Permission**: Kiểm tra quyền TRƯỚC khi thực hiện hành động.
2. **Ownership**: Đảm bảo User A không thể sửa đơn hàng của User B (IDOR Check).
