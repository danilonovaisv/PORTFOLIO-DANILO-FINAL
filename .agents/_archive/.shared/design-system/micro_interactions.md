# ✨ Premium Micro-Interactions Guide

Quy chuẩn về các hiệu ứng tương tác nhỏ nhưng tạo nên sự đẳng cấp cho UI.

## 1. 🖱️ Hover States (Trạng thái di chuột)

- **Soft Scale**: Phóng to nhẹ (`scale(1.02)`) trong thời gian `200ms` với `ease-out`. Tránh phóng quá to gây mất cân đối.
- **Elevation**: Tăng độ đổ bóng (shadow) từ `sm` lên `xl` để tạo cảm giác phần tử "nổi" lên khỏi bề mặt.
- **Color Shift**: Thay đổi màu sắc một cách mượt mà (`transition-colors`). Nên dùng biến thể đậm/nhạt của màu chính.

## 🎞️ 2. Loading & Transitions (Chuyển cảnh)

- **Staggered Fade**: Các phần tử hiện ra lần lượt (delay 50-100ms mỗi cái) từ dưới lên trên.
- **Skeleton Screens**: Sử dụng Skeleton mờ ảo thay vì Spinner tròn truyền thống để người dùng không cảm thấy phải chờ đợi lâu.
- **Page Transitions**: Sử dụng `Framer Motion` (nếu dùng React) để trượt trang vào theo hướng ngang hoặc mờ dần.

## 📱 3. Mobile Feedback

- **Haptic Simulation**: Hiệu ứng rung nhẹ (nếu là Native) hoặc thay đổi độ mờ khi chạm (Active state).
- **Magnetic Buttons**: Nút bấm có lực hút nhẹ vào con trỏ chuột (cho Web cao cấp).

---

### 🛡️ Design Taboos (Điều cấm kỵ):

- ❌ Không dùng hiệu ứng "nháy" (instant change) không có thời gian transition.
- ❌ Không dùng các animation lòe loẹt, quá nhanh hoặc quá chậm (> 500ms).
- ❌ Không dùng emoji thay cho các icon chức năng chính.
