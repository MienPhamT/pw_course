# Lesson 05: Playwright Tests, CSS Selector & Playwright Selector

## 1. Git

### Clone

- Dùng để **lấy dự án từ remote về máy local**
- Câu lệnh:
  - `git clone <url>`
  - `git clone <url> <new-folder-name>`

### Push

- Dùng để **đẩy code từ local lên remote repository**
- Câu lệnh:
  - `git push <remote_name> <branch_name>`
  - Ví dụ: `git push origin main`

### Pull

- Dùng để **lấy code mới nhất từ remote về branch hiện tại**
- So sánh:
  - `clone`: lấy toàn bộ repo
  - `pull`: chỉ lấy cập nhật mới
- Ví dụ: `git pull origin main`

### Merge Request (MR) / Pull Request (PR)

- Dùng để yêu cầu gộp code từ 1 branch sang branch khác
- Cần người **review** để kiểm tra code

### Reviewer

- Người kiểm tra & góp ý code
- Review càng sớm càng dễ sửa & học được nhiều hơn

### Convention (Quy tắc đặt tên)

- Giúp code gọn gàng, dễ đọc và đồng bộ
- Tên branch: `<type>/<short-description>`

  - `feat`: thêm tính năng
  - `fix`: sửa lỗi
  - `conf`: cấu hình
  - `chore`: thay đổi nhỏ (xóa file, đổi tên,...)

- Tên commit: `<type>: <short-description>`

Ví dụ:

```bash
feat/lesson-5
conf/update-timeout
```

---

## 2. Playwright

### Test Group / Suite: `test.describe()`

- Dùng để **nhóm các test case** lại cho dễ quản lý

```js
test.describe("Tên nhóm", () => {
  test("Test 1", async ({ page }) => {
    // code
  });

  test("Test 2", async ({ page }) => {
    // code
  });
});
```

---

### Hooks

- Hooks là **các hàm chạy tự động** ở các thời điểm khác nhau khi test chạy

| Hook         | Thời điểm chạy                    |
| ------------ | --------------------------------- |
| `beforeAll`  | Trước tất cả các test trong suite |
| `beforeEach` | Trước mỗi test                    |
| `afterEach`  | Sau mỗi test                      |
| `afterAll`   | Sau tất cả các test trong suite   |

---

### Assertion & Web-first Assertion

- Assertion = câu khẳng định dùng để kiểm tra kết quả test
- Playwright hỗ trợ nhiều cách kiểm tra như:
  - `expect(locator).toBeVisible()`
  - `expect(locator).toHaveText('abc')`
- Web-first Assertion: Playwright tự động **chờ** (wait) trước khi fail
- **Một số Web-first Assertion thường dùng**

| Câu lệnh                                       | Ý nghĩa                                      |
| ---------------------------------------------- | -------------------------------------------- |
| `await expect(elem).toBeAttached()`            | Kiểm tra phần tử đã được gắn vào DOM         |
| `await expect(elem).toBeChecked()`             | Kiểm tra checkbox/radio đã được chọn         |
| `await expect(elem).toBeEditable()`            | Kiểm tra phần tử có thể chỉnh sửa (input)    |
| `await expect(elem).toBeEmpty()`               | Kiểm tra phần tử rỗng                        |
| `await expect(elem).toBeEnabled()`             | Kiểm tra có enable hay không (button, input) |
| `await expect(elem).toBeFocused()`             | Kiểm tra phần tử có được focus không         |
| `await expect(elem).toBeHidden()`              | Kiểm tra phần tử có bị ẩn không              |
| `await expect(elem).toBeInViewport()`          | Kiểm tra phần tử có nằm trong vùng nhìn thấy |
| `await expect(elem).toBeVisible()`             | Kiểm tra phần tử có hiện thị hay không       |
| `await expect(elem).toContainText("abc")`      | Kiểm tra có chứa text                        |
| `await expect(elem).toHaveAttribute("href")`   | Kiểm tra phần tử có thuộc tính               |
| `await expect(elem).toHaveClass("class-name")` | Kiểm tra phần tử có class                    |
| `await expect(elem).toHaveId("id")`            | Kiểm tra phần tử có id                       |
| `await expect(elem).toHaveText("...")`         | Kiểm tra phần tử có nội dung text đúng       |
| `await expect(elem).toHaveValue("")`           | Kiểm tra input có giá trị                    |
| `await expect(elem).toHaveValues([])`          | Kiểm tra select có chọn đúng option          |

---

### Assertion kiểm tra giá trị

| Câu lệnh                     | Ý nghĩa                                               |
| ---------------------------- | ----------------------------------------------------- |
| `expect().toBe()`            | Kiểm tra giá trị đúng (===)                           |
| `expect().toEqual()`         | So sánh sâu (object, array)                           |
| `expect().toContain()`       | Kiểm tra phần tử có trong mảng hoặc chuỗi             |
| `expect().toBeTruthy()`      | Kiểm tra có "truthy" (khác null, false, undefined, 0) |
| `expect().toBeFalsy()`       | Kiểm tra có "falsy" (null, undefined, 0, false)       |
| `expect().toBeGreaterThan()` | Kiểm tra giá trị lớn hơn                              |
| `expect().toBeLessThan()`    | Kiểm tra giá trị nhỏ hơn                              |

---

## 3. CSS Selector

### Cú pháp

- Ngắn gọn, dễ viết hơn XPath
- Không hỗ trợ các điều kiện phức tạp như contains text

| Loại chọn        | Cú pháp CSS         | Cú pháp XPath                                 |
| ---------------- | ------------------- | --------------------------------------------- | -------- |
| Tag              | `div`               | `//div`                                       |
| id               | `#registrationForm` | `//form[@id="registrationForm"]`              |
| class            | `.form-group`       | `//div[@class='form-group']`                  |
| child            | `#parent > input`   | `//div[@id='parent']/input`                   |
| descendant       | `#ancestor div`     | `//div[@id='ancestor']//div`                  |
| combine          | `div, input`        | `//div                                        | //input` |
| adjacent sibling | `#parent + div`     | `//div[@id='parent']/following-sibling::*[1]` |
| general sibling  | `#parent ~ div`     | `//div[@id='parent']/following-sibling::*`    |

---

## 4. Playwright Selector

### Tổng quan

Playwright cung cấp các **locator thông minh** dùng `page.getBy...()`

### Các loại phổ biến:

#### `page.getByRole()`

- Tìm theo vai trò HTML: `button`, `checkbox`, `heading`, `link`,...

```js
await page.getByRole("button", { name: "Submit" }).click();
```

#### `page.getByText()`

- Tìm phần tử có chứa đoạn văn bản

```js
page.getByText("Welcome, John");
```

#### `page.getByLabel()`

- Tìm phần tử được gắn với `<label>`

```js
await page.getByLabel("Password").fill("secret");
```

#### `page.getByPlaceholder()`

- Tìm input theo placeholder

```js
await page.getByPlaceholder("name@example.com").fill("email@example.com");
```

#### `page.getByTitle()`

- Tìm theo thuộc tính `title`

```js
await expect(page.getByTitle("Issues count")).toHaveText("25 issues");
```

#### `page.getByAltText()`

- Tìm ảnh theo nội dung của `alt`

```js
await page.getByAltText("playwright logo").click();
```

#### `page.getByTestId()`

- Dùng với thuộc tính `data-testid` (hoặc gán lại thành `id`)

```js
await page.setTestIdAttribute("id");
await page.getByTestId("directions").click();
```

---
