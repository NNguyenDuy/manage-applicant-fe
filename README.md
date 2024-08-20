## Một số quy ước

### Quy ước đặt tên

- Tên biến: `camelCase`
- Tên hàm: `camelCase`
- Tên biến parameter: `camelCase`
- Tên biến argument: `camelCase`
- Tên biến private: `_camelCase`
- Tên class: `PascalCase`
- Tên hằng số: `UPPER_CASE`
- Tên file: `kebab-case`
- Tên thư mục: `kebab-case`

### Quy ước viết code

- Không dùng `var`
- Không dùng `==`
- Xóa `console.log` trước khi commit
- Xóa `debugger` trước khi commit

### Quy ước đặt commit message

- Commit message có dạng: `type(module/entity): message` (ví dụ: `feat(user): add user feature`, `fix(user): cannot create user`)


## Quy trình làm việc

1. Tách nhánh từ `develop`

```bash
git checkout -b branchName
```

2. Sau khi code, thêm file muốn đẩy lên git vào staged

```bash
git add fileName
```

hoặc thêm tất cả file

```bash
git add .
```

3. Đặt commit message

```bash
git commit -m "feat(user): add user feature"
```

=> Chờ hệ thống kiểm tra lỗi, nếu xảy ra lỗi, giải quyết lỗi và quay lại bước 2

4. Đẩy code lên git

```bash
git push
```
