# Lesson 07: API Testing

---

## 1. API là gì?

* API = Application Programming Interface
* Là công cụ trung gian giúp giao tiếp giữa:
  * Client (giao diện người dùng) ↔ Server (dữ liệu, logic)
* Ví dụ: API giống như bồi bàn nhận yêu cầu từ khách và trả kết quả

---

## 2. Tại sao cần test API?

* Phát hiện lỗi sớm kể cả khi frontend chưa hoàn thiện
* Đảm bảo sự tích hợp giữa các hệ thống khác nhau

---

## 3. Các định dạng phổ biến trong API

### XML (Extensible Markup Language)
* Cấu trúc dạng thẻ giống HTML
* Thường dùng với SOAP API

### JSON (JavaScript Object Notation)
* Dạng key-value, thường dùng trong REST API
* Dữ liệu kiểu: string, number, boolean, object, array, null

---

## 4. Các loại API

| Loại API | Mô tả |
|----------|------|
| SOAP     | Trả về XML |
| RPC      | Remote Procedure Call |
| REST     | Dùng phổ biến hiện nay (trả JSON) |

---

## 5. Authentication trong API

* Xác thực bằng:
  * Header: gửi token
  * Cookie (ít dùng)
* REST API thường dùng header để xác thực

---

## 6. Kiểm thử API

* Kiểm tra giá trị hợp lệ (min, max, định dạng)
* Kiểm tra JSON Schema
* Kiểm tra xử lý lỗi (error code)
* Kiểm tra xác thực (auth)

---

## 7. Thành phần của API

* Giao tiếp qua HTTP/HTTPS
* Gồm:
  * Client → gửi request
  * Server → trả response

### Request gồm:
* URL = Base URL + Endpoint + Parameters
* Method: GET, POST, PUT, DELETE, PATCH...
* Header
* Body (nếu có)

### Response gồm:
* Status Code: 200, 400, 500...
* Header
* Body

---

## 8. Status Code phổ biến

| Mã | Ý nghĩa |
|----|---------|
| 1xx | Thông tin |
| 2xx | Thành công (200 OK, 201 Created) |
| 3xx | Chuyển hướng |
| 4xx | Lỗi phía client (400, 404) |
| 5xx | Lỗi phía server (500, 502) |

---

## 9. Postman

* Công cụ test API phổ biến
* Các ví dụ:
  * GET articles
  * POST login
  * POST tạo article (có token trong header)

---

## 10. API với Playwright

* Gọi API trực tiếp qua request fixture mà không cần trình duyệt
* Lấy response:
  * `response.json()` → Object
  * `response.text()` → String

---

## 11. POM cho API Test

* Mục tiêu:
  * Test code gọn
  * Không hardcode baseURL và endpoint trong test
* Cách làm:
  * Tạo class riêng cho từng nhóm API
  * Định nghĩa endpoint và action trong class

---
