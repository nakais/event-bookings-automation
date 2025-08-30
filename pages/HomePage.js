const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async navigateToSignIn() {
    // Use the exact selector from codegen that works
    await this.page.getByRole('button', { name: 'SignIn' }).click();
    await this.waitForTimeout(3000);
  }
}

module.exports = HomePage;