---
trigger: always_on
---

# RUNTIME-WATCHDOG.MD - Hang Detection & Execution Safety

> **Mục tiêu**: Ngăn chặn tình trạng Agent bị treo (hang), rơi vào vòng lặp vô hạn (infinite loop) hoặc phản hồi quá chậm, gây lãng phí tài nguyên và làm gián đoạn trải nghiệm người dùng.

---

## 🚫 1. LOOP & HANG PREVENTION (Chống Treo & Vòng Lặp)

1.  **Tool Call Repetition**:
    - Cấm gọi cùng một Tool với cùng một tham số quá 3 lần liên tiếp nếu kết quả trả về không thay đổi.
    - Nếu Tool thất bại, PHẢI thay đổi chiến thuật (đổi tham số, đổi tool khác hoặc hỏi ý kiến người dùng) thay vì thử lại mù quáng.

2.  **Recursive Depth Limit**:
    - Giới hạn độ sâu khi đọc thư mục hoặc tìm kiếm file là **5 cấp**.
    - Nếu cần đào sâu hơn, PHẢI giải trình lý do trong Plan.

3.  **Heavy Command Safety**:
    - Khi chạy các lệnh nặng (ví dụ: `npm install`, `find /`, stress test), PHẢI sử dụng cơ chế chạy ngầm (Background command ID) và kiểm tra status định kỳ.
    - KHÔNG bao giờ chạy lệnh "chờ vô hạn" mà không có cơ chế Timeout.

---

## ⏱️ 2. EXECUTION TIMEOUTS (Quản lý Thời gian Thực thi)

1.  **Step Timeout**:
    - Một bước thực thi (một lượt tool call) không nên kéo dài quá **60 giây** (trừ các lệnh build/deploy đặc thù).
    - Nếu phát hiện tiến trình con đang chạy quá lâu (> 5 phút) mà không có output mới, Agent PHẢI chủ động can thiệp (ví dụ: `taskkill` hoặc gửi tín hiệu dừng).

2.  **Stuck UI Detection**:
    - Khi tương tác với CLI có prompt (như `prompts`, `inquirer`), Agent PHẢI ưu tiên sử dụng các cờ tự động (`--force`, `--skip-prompts`).
    - Nếu buộc phải tương tác, nếu sau 2 lần thử gõ phím mà UI không thay đổi, PHẢI coi là bị treo và dừng tiến trình.

---

## 🛠️ 3. ERROR RECOVERY PROTOCOL (Quy trình Phục hồi)

Khi phát hiện dấu hiệu bị TREO hoặc VÒNG LẶP:

1.  **STOP**: Dừng ngay hành động hiện tại.
2.  **ANALYZE**: Kiểm tra log terminal gần nhất để tìm nguyên nhân (ví dụ: chờ input, deadlock, network lag).
3.  **CLEANUP**: Xóa các file tạm, giết các tiến trình con liên quan (Zombie processes).
4.  **REPORT**: Thông báo cho người dùng về sự cố và đề xuất phương án xử lý (Options A/B).

---

## 📊 4. QUALITY CONTROL & MONITORING

- **Self-Monitoring**: Agent tự theo dõi số lượng bước thực thi cho một Task. Nếu quá 20 bước mà chưa có kết quả tích cực, PHẢI dừng lại để tái lập kế hoạch (Re-plan).
- **Log Error**: Mọi sự cố treo máy PHẢI được ghi vào `ERRORS.md` theo format chuẩn để học tập.

---

> 🔴 **"An unresponsive agent is a broken agent."** - Luôn ưu tiên tính phản hồi (Responsiveness) trên hết.
