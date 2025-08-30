# Event Bookings Automation

A **Playwright-based automation framework** for testing the user registration and authentication flow on **[EventBookings.com](https://www.eventbookings.com/)**.

---

## Overview

This project automates the complete user journey on EventBookings.com, including:

- User registration with unique credentials  
- Handling post-registration modals (timezone update, send email verification)  
- User logout process  
- User login with the created credentials  
- Verification of successful login

---

## Technology Stack

- **Playwright** → End-to-end testing framework  
- **JavaScript** → Programming language  
- **Page Object Model (POM)** → Design pattern for maintainable tests  
- **GitHub** → Version control and repository hosting  

---

##  Project Structure
```
event-bookings-automation/
├── pages/                 # Page Object Model classes
│   ├── BasePage.js        # Base page with common methods
│   ├── HomePage.js        # Home page interactions
│   ├── LoginPage.js       # Login page interactions
│   ├── SignupPage.js      # Registration page interactions
│   └── DashboardPage.js   # Dashboard page interactions
├── tests/
│   └── auth.spec.js       # Main test file
├── utils/
│   └── test-data.js       # Test data generation utilities
├── playwright.config.js   # Playwright configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

##  Prerequisites

- **Node.js** (version 14 or higher)  
- **npm** (comes with Node.js)

---

##  Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd event-bookings-automation
```
2. Install dependencies
```bash
npx playwright install
```
3. Install Playwright browsers   
```bash
npx playwright install
```

##  Running the Tests

1. Run tests in headed mode (with browser UI):
```bash
npx playwright test tests/auth.spec.js --headed --timeout=300000
```
2. Run tests in headless mode (faster, without UI):
```bash
npx playwright test tests/auth.spec.js --timeout=300000
```
3. Run tests with trace debugging:   
```bash
npx playwright test tests/auth.spec.js --headed --timeout=300000 --trace on
```
4. View test report:
```bash
npx playwright show-report
```
## Test Results

The test generates:

- Screenshots on failure (in ```test-results/``` directory)
- Video recordings of test runs
- Trace files for debugging
- HTML reports with detailed test results

## 🎥 Demonstration Video
 Loom Video Demonstration: https://www.loom.com/share/140b088c36514b1bbcfc6ec019a054f1?sid=24744e5a-2802-4b01-8b0d-2bca6a40cd79
  
