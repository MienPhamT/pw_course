import { Page } from "@playwright/test";
import { HomePage } from "./home-page";
import { RegisterPage } from "./register-page";
import { ProductPage } from "./product-page";
import { ToDoPage } from "./todo-page";
import { PersonalNotePage } from "./personal-note-page";

export class PomManager {
  page: Page;
  homePage: HomePage;
  registerPage: RegisterPage;
  productPage: ProductPage;
  toDoPage: ToDoPage;
  personalNotePage: PersonalNotePage;

  constructor(page: Page) {
    this.page = page;
  }

  getHomePage(url: string) {
    return new HomePage(url, this.page);
  }

  getRegisterPage() {
    return new RegisterPage(this.page);
  }

  getProductPage() {
    return new ProductPage(this.page);
  }

  getToDoPage() {
    return new ToDoPage(this.page);
  }

  getPersonalNotePage() {
    return new PersonalNotePage(this.page);
  }
} 