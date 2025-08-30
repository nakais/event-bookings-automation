const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.signUpLink = 'a:has-text("SignUp")';
  }

  async navigateToSignUp() {
    // Use the exact selector from codegen that works
    await this.page.getByRole('link', { name: 'SignUp' }).click();
  }
}

module.exports = LoginPage;