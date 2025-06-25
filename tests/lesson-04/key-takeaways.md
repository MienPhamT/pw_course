# Lesson 04: DOM, Selector & Playwright Basic

## 1. DOM (Document Object Model)

### Khái niệm:
* DOM là mô hình dạng cây, đại diện cho cấu trúc của một trang HTML.
* Mỗi phần tử HTML là một **node**.

### Thành phần HTML:
* Thẻ mở: `<option>`
* Thẻ đóng: `</option>`
* Thẻ tự đóng: `<img src="image.jpg" />`
* Thuộc tính: `value="usa"`, `school="HN"`
* Text nằm giữa thẻ

### Các thẻ HTML thường gặp:
* `<div>`: chia khối
* `<h1>` → `<h6>`: tiêu đề
* `<form>`: biểu mẫu
* `<input>`: các kiểu dữ liệu như text, email, radio, checkbox,...
* `<textarea>`, `<button>`, `<table>`, `<select>`, `<iframe>`, v.v.

### Quan hệ trong DOM:
* `self`: chính node hiện tại
* `parent`: node cha trực tiếp
* `children`: các node con trực tiếp
* `ancestor`: các node tổ tiên
* `descendant`: con, cháu, chắt,...
* `sibling`: anh em cùng cấp
* `following`, `preceding`: node ở bên phải/trái
* `following-sibling`, `preceding-sibling`: anh em bên phải/trái

---

## 2. Selector

### Các loại selector:
* XPath selector
* CSS selector
* Playwright selector

> Trong bài này học **XPath selector - phần 1**

### XPath cơ bản:
* XPath = XML Path
* XPath tuyệt đối: bắt đầu bằng `/`
* XPath tương đối: bắt đầu bằng `//`
    * Ví dụ: `//tag[@attribute="value"]`

> Nên dùng XPath tương đối

### XPath nâng cao:
* Wildcard: `*`
* Kết hợp nhiều điều kiện: `and`, `or`
* Dựa vào text: `text()`, `normalize-space()`
* Các hàm: `contains()`, `starts-with()`, `not()`

### XPath axes (trục quan hệ)

| Tên trục              | Ý nghĩa                                                                 |
|-----------------------|-------------------------------------------------------------------------|
| `parent::`            | Chọn node **cha** trực tiếp của node hiện tại                           |
| `child::`             | Chọn các node **con trực tiếp**                                         |
| `ancestor::`          | Chọn tất cả node tổ tiên (gồm cả cha, ông...)                           |
| `descendant::`        | Chọn tất cả **con cháu** (không giới hạn cấp)                           |
| `following::`         | Chọn tất cả node **sau** node hiện tại (không giới hạn cấp) (Không bao gồm node con)
| `preceding::`         | Chọn tất cả node **trước** node hiện tại (không giới hạn cấp) (trừ các node tổ tiên)          |
| `following-sibling::` | Chọn các node **ngang cấp phía sau** node hiện tại                      |
| `preceding-sibling::` | Chọn các node **ngang cấp phía trước** node hiện tại                    |

Ví dụ:
```xpath
//div/parent::section
//ul/descendant::li
//td/following-sibling::td
```

---


Ví dụ:
```xpath
//div/child::span[@class='title']
```

---

## 3. Playwright Basic Syntax

### 3.1. `test`: Khai báo một test case
```js
import { test } from '@playwright/test';

test('Tên test', async ({ page }) => {
  // Code của test ở đây
});
```

### 3.2. `test.step`: Khai báo từng bước trong test
```js
await test.step('Tên step', async () => {
  // Code step ở đây
});
```

> Mỗi step nên map 1-1 với step trong test case thực tế

Toàn bộ ví dụ:
```js
test('Tên test', async ({ page }) => {
  await test.step('Tên step', async () => {
    // Code trong step
  });
});
```

---

### 3.3. Các hành động cơ bản (Basic actions)

#### Navigate
```js
await page.goto('https://pw-practice.playwrightvn.com/');
```

#### Click
```js
await page.locator("//button").click();                // Click đơn
await page.locator("//button").dblclick();             // Click đúp
await page.locator("//button").click({ button: 'right' }); // Click chuột phải
await page.locator("").click({ modifiers: ['Shift'] });    // Click kèm phím Shift
```

#### Input
```js
page.locator("//input").fill('Playwright Viet Nam'); // paste nội dung
page.locator("//input").pressSequentially('Playwright Viet Nam', { delay: 100 }); // gõ từng ký tự
```

#### Radio / Checkbox
```js
const isChecked = page.locator("//input").isChecked(); // kiểm tra
page.locator("//input").check();                       // tích
page.locator("//input").setChecked(false);             // bỏ tích
```
### Select option

```js
// Chọn option theo value
await page.locator('select').selectOption('value1');

// Chọn nhiều option
await page.locator('select').selectOption(['value1', 'value2']);

// Chọn theo label
await page.locator('#city-select').selectOption({ label: 'Hà Nội' });

// Chọn theo index
await page.locator('#year').selectOption({ index: 3 });
```

---

### Set input file (upload file)

```js
await page.locator('input[type="file"]').setInputFiles('path/to/file.jpg');

// Upload nhiều file
await page.locator('input[type="file"]').setInputFiles([
  'file1.jpg',
  'file2.png'
]);
```

---

### Hover

```js
await page.locator('<xpath>').hover();
```

Dùng để di chuột qua phần tử, thường dùng để hiển thị menu ẩn hoặc tooltip.

---

### text()

Dùng để chọn phần tử có nội dung **text chính xác**:

```html
<div class="playwright">This is a text</div>
```

```xpath
//div[text()='This is a text']
```

> Cần trùng khớp 100% kể cả khoảng trắng

---

### contains()

Dùng khi nội dung có thể thay đổi hoặc có khoảng trắng:

```html
<div> Tôi là Alex </div>
<div> Bây giờ là: 08:07 </div>
```

```xpath
//div[contains(text(), 'Tôi là Alex')]
//div[contains(text(), 'Bây giờ là:')]
```

---

### Confirmation dialog

```js
page.on('dialog', async dialog => {
  console.log(dialog.message());
  await dialog.accept(); // hoặc dialog.dismiss()
});
```

Dùng để xử lý hộp thoại xác nhận như alert, confirm,...
