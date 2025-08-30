// utils/test-data.js
const testData = {
  baseUrl: 'https://www.eventbookings.com',
  currentUser: null,
  
  getNewUser() {
    const randomNum = Math.floor(Math.random() * 1000);
    this.currentUser = {
      firstName: 'Nazrul',
      lastName: 'Islam',
      email: `testuser${randomNum}@gmail.com`,
      password: 'Nazrul#123'
    };
    return this.currentUser;
  },
  
  getCurrentUser() {
    return this.currentUser;
  }
};

module.exports = testData;