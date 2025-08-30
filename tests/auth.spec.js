const { test, expect } = require('@playwright/test');
const testData = require('../utils/test-data');
const HomePage = require('../pages/HomePage');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.describe('EventBookings Sign-up and Sign-in Flow', () => {
  test('Complete user registration, logout, and login', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    const user = testData.getNewUser();
    console.log(`Using email: ${user.email}`);

    test.setTimeout(300000);

    try {
      // Navigate to homepage
      console.log('Navigating to homepage...');
      await page.goto(testData.baseUrl, { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });

      // Click SignIn button
      console.log('Clicking SignIn...');
      await homePage.navigateToSignIn();

      // Click SignUp link
      console.log('Clicking SignUp...');
      await loginPage.navigateToSignUp();

      // Fill registration form
      console.log('Filling registration form...');
      await signupPage.fillSignUpForm(user);

      // Add a screenshot before submission to debug form state
      await page.screenshot({ path: 'before_submission.png' });

      // Submit registration
      console.log('Submitting registration...');
      await signupPage.submitSignUp();

      // Wait for registration to complete with multiple fallback strategies
      console.log('Waiting for registration to complete...');
      
      // Strategy 1: Wait for URL change
      try {
        await page.waitForURL(/\/b\/member\/account/, { timeout: 30000 });
        console.log('Registration successful - URL changed');
      } catch (error) {
        console.log('URL did not change as expected, trying alternative approaches...');
        
        // Strategy 2: Wait for any navigation
        try {
          await page.waitForNavigation({ timeout: 30000 });
          console.log('Navigation occurred to:', page.url());
        } catch (error) {
          console.log('No navigation occurred, checking for error messages...');
          
          // Strategy 3: Check for error messages
          const errorElements = await page.$$('text=/error|invalid|already exists|taken/i');
          if (errorElements.length > 0) {
            for (const element of errorElements) {
              const errorText = await element.textContent();
              console.log('Error message:', errorText);
            }
            throw new Error('Registration failed with errors');
          }
          
          // Strategy 4: Check if we're still on the signup page
          if (page.url().includes('signup')) {
            console.log('Still on signup page after submission');
            await page.screenshot({ path: 'after_submission.png' });
            throw new Error('Registration form submission failed');
          }
        }
      }

      console.log('Current URL:', page.url());
      console.log('Registration successful');

      // Handle post-registration modals
      console.log('Handling post-registration modals...');
      await dashboardPage.handlePostSignUpModals();

      // Logout
      console.log('Logging out...');
      await dashboardPage.signOut();
      console.log('Logout successful');

      // After logout, check where we are redirected
      const currentUrl = page.url();
      console.log('Current URL after logout:', currentUrl);
      
      if (currentUrl.includes('auth/signin')) {
        console.log('Already on login page after logout');
      } else {
        console.log('Navigating to login page...');
        await page.goto('https://identity.eventbookings.com/auth/signin', { 
          waitUntil: 'domcontentloaded', 
          timeout: 60000 
        });
      }

      // Login again
      console.log('Logging in again...');
      await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
      await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
      await page.getByRole('button', { name: 'Log In' }).click();

      // Wait for login to complete
      console.log('Waiting for login to complete...');
      await page.waitForURL(/\/b\/member\/account/, { timeout: 60000 });
      console.log('Login successful');

      // Verify user is logged in
      await expect(page.getByRole('button', { name: `Greetings! ${user.firstName} ${user.lastName}` })).toBeVisible({ timeout: 10000 });
      console.log('Test completed successfully');

    } catch (error) {
      console.error('Test failed:', error.message);
      console.log('Current URL at failure:', page.url());
      await page.screenshot({ path: `test-results/failure-${Date.now()}.png` });
      throw error;
    }
  });
});