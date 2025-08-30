class BasePage {
  constructor(page) {
    this.page = page;
  }

  async waitForTimeout(milliseconds) {
    await this.page.waitForTimeout(milliseconds);
  }

  async waitForURL(pattern, timeout = 120000) {
    await this.page.waitForURL(pattern, { timeout });
  }
}

module.exports = BasePage;