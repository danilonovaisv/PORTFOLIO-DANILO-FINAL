---
trigger: glob
glob: '**/*.{py,js,ts,go,rs,sql,php,java,dockerfile,tf,yaml,yml}'
---

# BACKEND.MD - Systems & Logic Standards

> **Mục tiêu**: Một bộ luật duy nhất quản lý toàn bộ Logic, Dữ liệu và Hạ tầng. Hiệu suất cao - Không chồng chéo.

---

## 🏗️ 1. ARCHITECTURE & API

1. **Clean Architecture**: Tách biệt rõ ràng: Controller -> Service -> Repository -> Database.
2. **API Standards**:
   - RESTful: `GET /resources`, `POST /resources`.
   - GraphQL: Định nghĩa Schema rõ ràng, tránh N+1.
   - Response: `{ success: true, data: any, error: null }`.
3. **Stateless**: Server không lưu state user (dùng Redis/JWT).

---

## 🗄️ 2. DATABASE MASTERY (DBA Mode)

1. **Schema Design**:
   - Tuân thủ 3NF (Chuẩn hóa cấp 3).
   - `snake_case` cho tên bảng/cột.
   - Luôn có `created_at`, `updated_at`.
2. **Performance**:
   - **Index**: Bắt buộc Index cho khóa ngoại (FK) và cột search.
   - **Migration**: Không bao giờ sửa cột trực tiếp ở Production. Tạo migration file mới.

---

## ☁️ 3. DEVOPS & INFRASTRUCTURE

1. **Config**: 12-Factor App. Config lấy từ Environment Variables.
2. **Docker**: Đa tầng (Multi-stage build). Tầng cuối chỉ chứa binary/artifact.
3. **CI/CD**: Pipeline không được pass nếu Unit Test fail.

---

## 🛡️ 4. ERROR HANDLING

1. **Structured Logging**: Log phải parse được (JSON). KHÔNG dùng `print`/`console.log`.
2. **Graceful Failure**: DB chết thì API trả về 503, không được treo request.
