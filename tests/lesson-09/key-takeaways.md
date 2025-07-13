# Lesson 09: Fixtures & Managing Environment Variables

---

## 1. Fixtures là gì?

* Là cách Playwright tổ chức và khởi tạo các môi trường test
* Giúp tách biệt (isolate) từng test
* Cho phép setup và cleanup trước/sau mỗi test

### Cách hoạt động:
```ts
const test = base.extend({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    await use(todoPage); // trong quá trình test
    await todoPage.removeAll(); // sau test
  },
});
```

---

## 2. Built-in Fixtures

| Tên Fixture    | Kiểu                 | Chức năng |
|----------------|----------------------|-----------|
| `page`         | `Page`               | Mỗi test có page riêng |
| `context`      | `BrowserContext`     | Context riêng cho mỗi test |
| `browser`      | `Browser`            | Dùng chung để tiết kiệm tài nguyên |
| `browserName`  | `string`             | chromium / firefox / webkit |
| `request`      | `APIRequestContext`  | Dùng để test API |

---

## 3. Tạo mới fixture

### Extend từ base:
```ts
import { test as base } from '@playwright/test';

class Page2 {
  sayMyName() {
    console.log('My name is Page2');
  }
}

const test = base.extend<{ page2: Page2 }>({
  page2: async ({}, use) => {
    const page2 = new Page2();
    page2.sayMyName();
    await use(page2);
    console.log('after page2');
  }
});

export { test };
```

---

## 4. Merge nhiều fixture

```ts
import { mergeTests } from '@playwright/test';
import { test as t1 } from './fixture-1';
import { test as t2 } from './fixture-2';

export const test = mergeTests(t1, t2);
```

---

## 5. Sử dụng fixture trong test

```ts
test('demo test', async ({ page2 }) => {
  page2.sayMyName();
});
```

---

## 6. Quản lý biến môi trường

### Mục tiêu:
* Chạy cùng một test với nhiều cấu hình (dev/prod...)

### Cách làm:
1. Cài dotenv:
```bash
npm install dotenv --save
```

2. Tạo file `.env`:
```
ENV=dev
```

3. Tạo file data tương ứng theo môi trường

4. Dùng dotenv trong code:
```ts
import { config } from 'dotenv';
config();
console.log(process.env.ENV);
```

---

### Ví dụ:
* ENV=dev: tags = tag1, tag2
* ENV=prod: tags = javascript, playwright
* URL production:  
  `https://pw-practice.playwrightvn.com/wp-admin`

---
