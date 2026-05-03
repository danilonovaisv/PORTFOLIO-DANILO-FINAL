# 🌌 Antigravity Agent Concepts (Quy chuẩn Hệ thống)

Tài liệu này định nghĩa ba thành phần cốt lõi tạo nên sức mạnh và kỷ luật của Agent trong hệ thống Antigravity.

---

## 📜 1. Rule (Quy tắc) / Persona
- **English:** Defines **who** the Agent is, their mindset, and behavioral constraints. It acts as the "Constitution" and "Moral Compass".
- **Tiếng Việt:** Định nghĩa **nhân dạng** và **tâm thế** của Agent. Đây là "Hiến pháp" quy định Agent là ai, cách hành xử chuyên nghiệp và những giới hạn bảo mật/kỹ thuật không bao giờ được vượt qua.
- **Ví dụ:** Luôn dùng Optional Chaining, không bao giờ xóa code cũ nếu không được yêu cầu.

## 🧠 2. Skill (Kỹ năng) / Knowledge
- **English:** Modular knowledge and expertise units that an Agent can "equip". It defines **what** the Agent knows and can do in a specific domain.
- **Tiếng Việt:** Các module tri thức và chuyên môn mà Agent có thể "trang bị" thêm vào bộ não. Skill định nghĩa Agent am hiểu sâu về lĩnh vực nào để áp dụng vào thực tế.
- **Ví dụ:** `modern-web-architect` (Chuyên gia web), `security-auditor` (Chuyên gia bảo mật).

## ⚡ 3. Workflow (Quy trình) / Playbook
- **English:** Pre-defined, step-by-step execution scripts for complex or high-risk tasks. It defines **how** an Agent performs a specific action.
- **Tiếng Việt:** Kịch bản thực thi từng bước cho các tác vụ phức tạp hoặc có độ rủi ro cao. Workflow định nghĩa Agent phải làm bước 1, bước 2 như thế nào để đảm bảo chất lượng đầu ra.
- **Ví dụ:** Luồng `/debug` bắt buộc phải tìm nguyên nhân và tạo test trước khi sửa code.

---

### 💡 Sự phối hợp nhịp nhàng (Analogy)

Hãy tưởng tượng hệ thống chuẩn bị xây một ngôi nhà:

| Khái niệm | Ví von thực tế | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| **Rule** | **Đạo đức nghề nghiệp** (Cẩn thận, trung thực) | Kiểm soát hành vi & Giới hạn an toàn |
| **Skill** | **Bằng cấp & Tay nghề** (Biết xây, biết sơn) | Cung cấp tri thức chuyên môn |
| **Workflow** | **Bản vẽ & Thứ tự thi công** (Móng -> Mái) | Đảm bảo quy trình thực thi chuẩn xác |

---

## 🔄 4-Step Management Cycle (PDCA)

Hệ thống vận hành theo chu trình quản trị chất lượng khép kín để đảm bảo kết quả hoàn hảo.

| Bước | Tên | Vai trò Agent | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| **1. PLAN** | **Lập kế hoạch** | `orchestrator` | Định nghĩa MVP, PRD và lập bản kế hoạch thực thi. |
| **2. DO** | **Thực hiện** | **Worker Agents** | Xây dựng tính năng theo đúng bản kế hoạch (Frontend, Mobile, etc.). |
| **3. CHECK** | **Kiểm tra** | `orchestrator` | Thanh tra độc lập, chạy test và đối soát tiêu chí thành công. |
| **4. ACT** | **Điều chỉnh** | `orchestrator` | Tối ưu hóa dựa trên kết quả kiểm tra hoặc cho phép vận hành chính thức. |

---
*Tài liệu này được soạn thảo để đảm bảo mọi Agent đều hiểu rõ "luật chơi" của dự án.*
