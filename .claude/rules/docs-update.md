---
trigger: always_on
---

# DOCS-UPDATE.MD - Documentation Sync Protocol

> **Mục tiêu**: Đảm bảo tài liệu luôn đồng bộ với code thực tế. Tránh outdated docs.

---

## 📋 1. CHECKLIST CẬP NHẬT DOCS

Mỗi khi thêm tính năng mới, Agent PHẢI kiểm tra và cập nhật các file sau:

### A. Khi thêm SKILL mới

- [ ] `SKILLS.md` - Thêm skill vào danh sách chuẩn
- [ ] `docs/SKILLS_GUIDE.vi.md` - Thêm vào nhóm phù hợp
- [ ] `README.vi.md` - Cập nhật số lượng Skills
- [ ] `README.md` - Cập nhật số lượng Skills (English)

### B. Khi thêm WORKFLOW mới

- [ ] `docs/WORKFLOW_GUIDE.vi.md` - Thêm section hướng dẫn
- [ ] `README.vi.md` - Cập nhật số lượng Workflows + thêm vào danh sách `/command`
- [ ] `README.md` - Tương tự như README.vi.md

### C. Khi thêm RULE mới

- [ ] `docs/RULES_GUIDE.vi.md` - Thêm vào bảng phân loại thích hợp (Auto/On-Demand).
- [ ] **Lưu ý**: Phải tuân thủ "Hybrid Language Protocol" (Tên Anh - Mô tả Việt).
- [ ] `README.vi.md` - Nếu là tính năng nổi bật → Thêm vào phần features

### D. Khi thêm AGENT mới

- [ ] `docs/AGENTS_GUIDE.vi.md` - Mô tả vai trò và trách nhiệm
- [ ] `README.vi.md` - Cập nhật số lượng Agents nếu thay đổi

---

## 🔄 2. QUY TRÌNH TỰ ĐỘNG

1. **Phát hiện thay đổi**: Sau khi tạo file mới trong `.agent/`
2. **Chạy script**: `node .agent/scripts/update-docs.js`
3. **Review output**: Script sẽ hiển thị số liệu hiện tại
4. **Cập nhật thủ công**: Dựa vào checklist ở trên
5. **Commit docs**: Tạo commit riêng cho docs

---

## 📊 3. FORMAT CHUẨN

### Trong README (Bảng thống kê):

```markdown
| **XX** Bộ Kỹ năng (Skills) | **XX** Agent Chuyên gia | **XX** Quy trình (Workflows) |
```

### Trong SKILLS_GUIDE:

```markdown
### 🛡️ Nhóm Bảo Mật (Security)

- **`skill-name`**: Mô tả ngắn gọn về skill
```

### Trong WORKFLOW_GUIDE:

```markdown
### `/workflow-name` - Tiêu đề ngắn gọn

- **Khi nào dùng**: Mô tả use case
- **Cách dùng**: `/workflow-name [params]`
```

---

## ⚠️ 4. LƯU Ý QUAN TRỌNG

1. **Luôn cập nhật cả 2 ngôn ngữ**: README.md (EN) và README.vi.md (VI)
2. **Giữ số liệu nhất quán**: Đếm chính xác số lượng files
3. **Viết mô tả súc tích**: 1 dòng cho mỗi skill/workflow
4. **Commit riêng**: Tách docs update ra commit riêng để dễ review

---

## 🎯 5. MỤC TIÊU

- Docs luôn phản ánh đúng 100% tính năng hiện có
- Người dùng mới có thể hiểu hệ thống chỉ từ README
- Không có "hidden features" không được document
