---
trigger: glob
glob: '**/*.{tf,yaml,yml,json,properties,dockerfile}'
---

# COMPLIANCE.MD - Enterprise Regulatory Standards

> **Mục tiêu**: Đảm bảo tuân thủ các chuẩn mực pháp lý quốc tế (GDPR, HIPAA, PCI-DSS, SOC2).

---

## 🔒 1. DATA PRIVACY (GDPR/CCPA)

1. **PII Masking**:
   - Dữ liệu định danh (SĐT, Email, CCCD) KHÔNG bao giờ được log ra Plain Text.
   - Phải mã hóa hoặc Masking (Ví dụ: `ng***@gmail.com`) khi hiển thị cho CSKH.
2. **Right to represent**:
   - Hệ thống phải có API `export_user_data` và `delete_user_data` (Right to be forgotten).

---

## 💳 2. FINANCIAL SECURITY (PCI-DSS)

1. **Card Data**: Cấm tuyệt đối lưu số thẻ tín dụng (PAN) vào Database của mình.
2. **Payment Gateway**: Mọi giao dịch phải qua Tokenization của cổng thanh toán (Stripe/PayPal).

---

## 🏥 3. HEALTH DATA (HIPAA) - _If Applicable_

1. **Encryption at Rest**: Database phải được mã hóa (TDE).
2. **Encryption in Transit**: Bắt buộc TLS 1.3 cho mọi kết nối.

---

## 🔍 4. AUDIT TRAILS (SOC2)

1. **Immutable Logs**: Log hệ thống phải được đẩy về nơi lưu trữ tập trung (Splunk/Datadog) và không thể bị sửa/xóa.
2. **Access Control**: Mọi truy cập vào Production DB phải qua Bastion Host và có ghi lại phiên làm việc.
