# Lesson 06: Class Extends & Page Object Model (POM)

---

## 1. Class trong JavaScript

### Mục đích:

- Dùng để khai báo kiểu dữ liệu tùy chỉnh
- Tái sử dụng code và tăng tính linh hoạt trong test

### Cấu trúc:

- Tên class
- Constructor: hàm tạo (chạy khi khởi tạo object)
- Property: các thuộc tính
- Method: các hành động (function)

### Cách dùng:

```ts
class Student {
  constructor(name) {
    this.name = name;
  }

  sayMyName() {
    console.log(this.name);
  }
}

const student = new Student("Anna");
student.sayMyName(); // Anna
```

---

## 2. Kế thừa (extends)

### Mục đích:

- Cho phép một class con **tái sử dụng** thuộc tính & phương thức từ class cha

### Cú pháp:

```ts
class Parent {
  constructor() {
    console.log("Hello from Parent");
  }
}

class Child extends Parent {
  constructor() {
    super(); // gọi đến constructor của class cha
    console.log("Hello from Child");
  }
}
```

> `extends` dùng để kế thừa  
> `super()` luôn được gọi đầu tiên trong constructor của class con

---

## 3. Export / Import

### Export:

- Dùng `export` để cho phép class/function/... được dùng ở file khác

```ts
// File: login-page.ts
export class LoginPage {
  // Some code...
}
```

### Import:

- Dùng `import` để sử dụng class/function đã export ở file khác

```ts
// File: test.spec.ts
import { LoginPage } from "./page/login-page";
```

### Lưu ý:

- Có thể bỏ `.ts` ở cuối đường dẫn
- Nếu file ở folder khác thì dùng `../` để đi lên
- Ví dụ: `'../../login-page.ts'`

---

## 4. POM - Page Object Model

### Khái niệm:

- POM là mẫu thiết kế giúp **tổ chức code theo từng trang**
- Mỗi **trang web = 1 class**
- Mỗi class gồm:
  - **Thuộc tính (property)**: đại diện phần tử trên trang
  - **Phương thức (method)**: hành động trên trang

### Ví dụ:

```ts
class LoginPage {
  usernameInput = page.locator("#username");

  login(username) {
    this.usernameInput.fill(username);
  }
}
```

### Lợi ích:

- Tái sử dụng code
- Dễ tổ chức, bảo trì
- Gọn gàng, rõ ràng

---

### Nâng cao:

- Có thể **extends** từ 1 POM khác
- Có thể **override** lại property hoặc method khi cần
