const BasePage = require('./BasePage');

class SignupPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async fillSignUpForm(userData) {
    await this.page.getByRole('textbox', { name: 'First name' }).fill(userData.firstName);
    await this.page.getByRole('textbox', { name: 'Last name' }).fill(userData.lastName);
    await this.page.getByRole('textbox', { name: 'Email address' }).fill(userData.email);
    await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(userData.password);
    await this.page.getByRole('textbox', { name: 'Confirm Password' }).fill(userData.password);
  }

  async submitSignUp() {
    await this.page.getByRole('button', { name: 'Sign up' }).click();
  }

  async completeSignUp(userData) {
    await this.fillSignUpForm(userData);
    await this.submitSignUp();
  }
}

module.exports = SignupPage;