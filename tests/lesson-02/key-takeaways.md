# Key Takeaway - Lesson 2
## I. GIT
### 1. Câu lệnh thường dùng:
* Khởi tạo thư mục được quản lý bởi Git: **git init**
* Sau khi cài đặt xong, cần cấu hình git:
    * Cho 1 repo
        * `git config user.name "name"`
        * `git config user.email "email"`
    * Cho toàn bộ máy tính (default)
        * `git config --global user.name "name"`
        * `git config --global user.email "email"`
* Thêm file vào vùng staging:
    * Thêm 1 file: `git add <file_name>`
    * Thêm toàn bộ: `git add .`
* Xem trạng thái file: `git status`
    * File màu xanh: vùng staging
    * File màu đỏ: vùng working directory
* Commit: `git commit -m”message”`
    * Kiểm tra lịch sử commit: `git log`
### 2. Commit convention
* Convention: <type>: <short_description>, trong đó:
* `type`: loại commit, gồm:
  * `chore`: sửa nhỏ lẻ, chỉnh chính tả, xóa file không dùng tới,...
  * `feat`: thêm tính năng mới, test case mới
  * `fix`: sửa lỗi 1 test trước đó
* `short_description`: mô tả ngắn gọn (tối đa 50 ký tự), viết bằng tiếng Anh hoặc tiếng Việt **không dấu**

## II. Javascript
### 1. Variable: 
* Variable: biến, dùng để lưu trữ giá trị, có thể thay đổi giá trị được.
* Khai báo: Có 2 kiểu khai báo
    * let i
    * var i 
* Sự khác nhau giữa **let** và **var**:
    * **var** cho phép khai báo lại cùng tên biến:
      * `var item1 = 'a';`
      * `var item1 = 'c'; // OK`
    * **let** không cho phép khai báo lại:
      * `let item2 = 'b';`
      * `let item2 = 'd'; // ❌ error`
    * **Phạm vi biến**:
      * `var`: phạm vi toàn cục (global) hoặc function
      * `let`: phạm vi trong khối `{ }` (block scope)
    * **Nên dùng**: `let`, vì kiểm soát được phạm vi biến tốt hơn
### 2. Constant: 
* Const: = hằng số. Dùng để khai báo các giá trị không thể thay đổi.
* Khai báo: `const <name> = <value>;`
* Ví dụ: `const framework = "Playwright";`
* Sử dụng: `console.log(framework);`
* Gán lại: `framework = "Cypress"; // ❌ Error`

* Khi nào dùng `var` / `let` / `const`?
  * `var` / `let`: khi **biến sẽ gán lại**
  * `const`: khi **biến không gán lại**
  * 👉 Thực tế nên dùng `let` và `const`, **KHÔNG dùng `var`**
### 3. Data Type
* Data type = kiểu dữ liệu.
* Có 8 loại dữ liệu: `String`, `Number`, `Bigint`, `Boolean`, `Undefined`, `Null`, `Symbol`, `Object`

### 4. Operators (Toán tử):
* **Comparison operator** = toán tử so sánh
  * Dùng để **so sánh giá trị** giữa 2 biến
  * Kết quả trả về `Boolean` (`true` hoặc `false`)
  * Các toán tử so sánh:
    * Hơn kém: `>`, `<`
    * So sánh bằng: `==`, `===`, `!=`, `!==`, `>=`, `<=`
* **Unary operator** = toán tử một ngôi
  * Dùng để tăng/giảm giá trị
  * `i++` tương đương `i = i + 1`
  * `i--` tương đương `i = i - 1`

* **Arithmetic operator** = toán tử số học
  * Dùng tính toán biểu thức
  * Các phép toán: `+`, `-`, `*`, `/`

### 5. Loop & Condition:
* **Conditional (if)** = điều kiện
  * Dùng để kiểm tra có nên chạy 1 đoạn logic không
  * Cú pháp:
    ```javascript
    if (<điều kiện>) {
      // code
    }

* **Loops (for)** = vòng lặp
  * Dùng để chạy lặp lại một đoạn code
  * Cú pháp:
    ```javascript
    for (<khởi tạo>; <điều kiện dừng>; <tăng>) {
      // code
    }
    ```
## III. Kiến thức bổ sung
* **Toán tử chia dư `%`**:
  * `%` trả về phần dư của phép chia.
  * Ví dụ:
    * `3 % 3 = 0` (3 chia hết cho 3)
    * `3 % 2 = 1` (3 chia 2 dư 1)

* **console.log() - In giá trị ra màn hình**:
  * Dùng `console.log("message")` để in ra chuỗi
  * Dùng `console.log(<variable>)` để in giá trị biến

  * Kết hợp chuỗi + biến:
    * `console.log("Dùng dấu cộng như sau: " + name);`
    * `console.log("Hoặc dùng dấu phẩy: ", name);`

  * Nối chuỗi bằng toán tử `+`:
    ```javascript
    const str1 = "Hello";
    const str2 = "Playwright Viet Nam";
    console.log(str1 + str2); // HelloPlaywright Viet Nam
    ```