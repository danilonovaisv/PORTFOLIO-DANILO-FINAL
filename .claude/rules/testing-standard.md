---
trigger: glob
glob: '**/*.{test,spec}.{js,ts,jsx,tsx,py,rs,go,java}'
---

# TESTING-STANDARD.MD - Quality Assurance Protocol

> **Mục tiêu**: "Code không Test là Code chết". Đảm bảo mọi tính năng đều chạy đúng như thiết kế trước khi ra Production.

---

## 📐 1. The Testing Pyramid (Mô hình Kim tự tháp)

Chúng ta tuân thủ tỷ lệ vàng trong kiểm thử:

1.  **Unit Tests (70%)**:
    - Test từng hàm function/method nhỏ nhất.
    - Yêu cầu: Chạy cực nhanh (< 1ms/test), không gọi IO/Network thật (phải Mock).
2.  **Integration Tests (20%)**:
    - Test sự kết hợp giữa các module (API + DB, Component + Store).
    - Yêu cầu: Dùng Docker Testing Db hoặc In-memory DB.
3.  **E2E Tests (10%)**:
    - Test luồng người dùng thật (User Journey).
    - Công cụ: Playwright, Cyprus.

---

## 📝 2. Naming Conventions (Quy tắc đặt tên)

- **File Name**: `*.test.ts` hoặc `*.spec.ts`.
- **Structure**:
  ```typescript
  describe('AuthService', () => {
    // Tên Module
    describe('login()', () => {
      // Tên Function
      it('should return token when creds are valid', () => {
        // Hành vi mong đợi
        // ...
      });

      it('should throw 401 when password wrong', () => {
        // Edge case
        // ...
      });
    });
  });
  ```

---

## 🛠️ 3. Mocking Strategy

- **External Services**: BẮT BUỘC Mock các 3rd-party API (Stripe, SendGrid, Google Auth). Không được gọi API thật trong test.
- **Database**:
  - Với Unit Test: Repository Pattern -> Mock Repository.
  - Với Integration Test: Dùng Test Database (SQLite/Docker).

---

## 📊 4. Coverage Requirements

- **Core Logic**: > 80% Statement Coverage.
- **Utils/Helpers**: > 90% Coverage.
- **UI Components**: Test behavior, đừng test implementation detail.

> **Quy tắc vàng:** "Red - Green - Refactor". Viết test fail trước, sau đó viết code để pass, cuối cùng là tối ưu.
