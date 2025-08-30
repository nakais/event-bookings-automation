const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async handlePostSignUpModals() {
    // Try to handle the timezone modal
    try {
      await this.page.getByRole('button', { name: 'Update Timezone' }).click({ timeout: 10000 });
      console.log('Timezone updated');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log('Timezone modal not found');
    }

    // Try to handle the verification modal
    try {
      await this.page.getByRole('button', { name: 'Send Verification Email' }).click({ timeout: 10000 });
      console.log('Verification email sent');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log('Verification modal not found');
    }

    // Try to handle the close button
    try {
      await this.page.getByRole('button', { name: 'Close' }).last().click({ timeout: 5000 });
      console.log('Modal closed');
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.log('Close button not found');
    }
  }

  async signOut() {
    // Use a more generic selector for the user menu button
    await this.page.getByRole('button', { name: /Greetings!/ }).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('link', { name: 'Sign Out' }).click();
  }
}

module.exports = DashboardPage;