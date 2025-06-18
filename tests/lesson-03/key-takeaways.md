# Key Takeaway - Lesson 2

## I. GIT

### 1. Sửa commit gần nhất

- `git commit --amend`: Sửa nội dung hoặc message của commit cuối cùng (msg chưa được push)

  - Khi chạy lệnh, Git mở trình soạn thảo:
    - Gõ i để vào chế độ insert
    - Gõ esc để thoát insert
    - Gõ :wq để lưu và thoát

- `git commit --amend -m "message"`: Sửa message commit cuối cùng (msg chưa được push), không cần mở trình soạn thảo.

### 2. Bỏ file ra khỏi vùng staging

- `git restore --staged <file>`: Hủy bỏ việc add file, đưa file trở lại trạng thái working directory (chưa được staged), Không xóa file.

### 3. Hoàn tác 1 commit

- `git reset HEAD~1`: Xoá commit gần nhất, nhưng giữ lại thay đổi trong thư mục làm việc. -> Đưa file từ vùng repository về working directory (uncommit)
  - Có thể HEAD~2/ ~3... : 1,2,3.. tương ứng với số commit cần reset

### 4. Branch

- Dùng để tạo vùng làm việc mới tách biệt, không ảnh hưởng tới branch ổn định hiện tại.
- Tạo Branch:
  - git branch <ten_branch>
  - git checkout <ten_branch>
  - git checkout -b <ten_branch> # tạo và chuyển sang nhánh mới

### 5. .gitignore

- Dùng để nói với Git bỏ qua các file hoặc folder không cần theo dõi (như node_modules, dist, .env...)
- Ignore file:
  - <file_name>
  - < folder-name> /

## II. Javascript

### 1. Convention đặt tên

- snake_case: chưa dùng phổ biến trong JS
- kebab-case: dùng đặt tên file
- camelCase: dùng cho tên biến
- PascalCase: dùng cho tên class

### 2. console.log và định dạng chuỗi

- Template string:
  - `let name = "Nga";  console.log(`Toi la ${name}`);`
- Nối chuỗi:
  - `console.log("Toi ten la " + name + "!");`

### 3. Object – Đối tượng

- Object = tập hợp các key: value
- Dùng để lưu trữ nhiều thông tin trong 1 biến
- Cách khai báo: `const person = { name: "Mia", age: 12 }`
