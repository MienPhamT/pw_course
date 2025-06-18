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

* Dùng để lưu trữ **tập hợp** các giá trị vào một biến hoặc **hằng số**

*  Khai báo:
    - Cấu trúc:
    ```javascript
    let/const <ten_object> = {
      <thuoc_tinh>: <gia_tri>,
    }
    ```

    - Trong đó:
      * `<thuoc_tinh>` giống quy tắc đặt tên biến
      * `<gia_tri>` có kiểu giống biến, hoặc là 1 object khác

- Ví dụ:
  ```javascript
  let user = {"name": "Alex", "age": 10, "email": "alex@gmail.com"}
  const product = {
      "name": "Laptop",
      "price": 500,
      "isWindow": true,
      "manufacturer": {
        "name": "Acer",
        "year": 2024
    }
  }
  ```
### 4. Logical Operator
* `&&`: cả 2 vế của mệnh đề đều đúng
* `||`: một trong 2 vế đúng
* `!`: đảo ngược lại giá trị của mệnh đề
---

### 5. Array - Mảng
* Tạo mảng
* Khai báo
* Sử dụng
-  Truy xuất mảng
    * Độ dài mảng: `length`
    * Lấy phần tử theo index: `[0]`, `[1]`, `[2]`
### 6. Function
- Là đoạn code được đặt tên và có thể tái sử dụng, thực hiện 1 nhiệm vụ hoặc 1 tính toán cụ thể
-  Khai báo
    ```javascript
    function <nameFunction>() {
      // code
    }
    ```

-  Gồm:
    * Parameter
    * Return value
## 5. Phạm vi của biến: var và let

* Global
* Scope: {}
* Hoisting

---

## 6. Điều kiện nâng cao: if...else, if...else if, switch...case

```javascript
if (...) else

if ... else if ... if

switch ... case
default
```

---
### 7. So sánh: == và !=

* So sánh kiểu “lỏng lẻo” (convert giá trị về kiểu "lớn hơn")
* `===`, `!==`: so sánh tuyệt đối
---
### 8. Vòng lặp nâng cao
* `for ... in`:
  - Dùng để duyệt key của một object (hoặc index của mảng).
  - Trả về tên thuộc tính (key) ở mỗi vòng lặp.
  ```javascript
      const student = {name: "Anna", age: 20, major: "CS"};
      for (let key in student) {
        console.log(key);          // name, age, major
        console.log(student[key]); // Anna, 20, CS
      }
  ```
  -->Dùng khi cần truy cập key hoặc khi làm việc với object
---
* `forEach`
  - Là phương thức của array dùng để duyệt qua từng phần tử.
  - Không thể break hoặc continue giữa vòng lặp.
    ```javascript
    const arr = [1, 2, 3];
    arr.forEach(function(value, index) {
      console.log(index + ": " + value);
    });
  
  --> Dùng khi cần thực hiện hành động với từng phần tử của mảng


* `for ... of`
  - Dùng để duyệt giá trị của một iterable (Array, String, Set, Map, v.v.)
  - Không lấy key/index, chỉ lấy giá trị.

    ```javascript
        const arr = ["A", "B", "C"];
        for (let value of arr) {
          console.log(value); // A, B, C
        }
    ```
  --> Dùng khi cần duyệt giá trị (đặc biệt với array) 

---

### 9. break và continue
* Dùng trong vòng lặp để điều khiển luồng chạy
* `break`: thoát khỏi vòng lặp
* `continue`: bỏ qua lần lặp hiện tại
