# Lesson 08: Git Advance & Other POM Styles

---

## 1. Git Nâng cao

### Merge
* Gộp code từ nhánh A vào nhánh B
* Merge strategy:
  - **Fast-forward merge**: Không tạo commit merge nếu nhánh chính không thay đổi
  - **Three-way merge**: Tạo commit merge khi hai nhánh có lịch sử khác nhau

---

### Conflict
* Xảy ra khi 2 người cùng sửa 1 file rồi merge lại
* Conflict hiển thị:
```
<<<<<<< HEAD
Code trên nhánh hiện tại
=======
Code trên nhánh được merge vào
>>>>>>> branch-name
```
* Cách xử lý:
  - Sửa xung đột
  - `git add`
  - `git commit`

---

### Rebase
* Làm cho lịch sử commit liền mạch hơn
```bash
git rebase main
```

---

### Squash
* Gộp nhiều commit thành 1 commit
```bash
git rebase -i HEAD~{số commit cần squash}
```

---

## 2. Một số POM styles khác

### 2.1. POM Manager
* Quản lý nhiều page object tập trung
* Mỗi page object chỉ được tạo khi cần

```ts
import { Page } from "@playwright/test";
import { LoginPage } from "./00-pom-login";
import { DashboardPage } from "./00-pom-dashboard";

export class PomManager {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  getLoginPage() {
    return new LoginPage(this.page);
  }

  getDashboardPage() {
    return new DashboardPage(this.page);
  }
}
```

---

### 2.2. Return POM from another POM
* Method của 1 Page Object trả về Page Object khác → phục vụ cho flow nhiều bước

```ts
import { Page } from '@playwright/test';
import { DashboardPage } from './00-pom-dashboard';

export class LoginReturnPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  login() {
    return new DashboardPage(this.page);
  }
}
```

* Ví dụ flow: login → add to cart → checkout → confirm

---
