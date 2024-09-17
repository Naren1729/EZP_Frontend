//**
// * @Author: Keerthana B
//* @Date: 11/09/2024

// Test1: Checks if appropriate error messages 
// are printed when the 3 tables are empty
// Can separate each test case  

// Run cmd: npx playwright test test1_display_userTable_empty --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import {test, expect} from "@playwright/test";

// Test case for checking error when the User table is empty
test ('Empty User table error',
  async () => {
const browser = await chromium.launch({
  headless: false,  // Headless mode set to false to observe the browser interactions
  slowMo: 500       // Slows down actions for easier observation during test execution
});
test.setTimeout(180000);  // Increases the default timeout to 3 minutes to handle slow operations

const context = await browser.newContext();  // Creates a new context (browser session)
const page = await context.newPage();        // Opens a new page (tab) in the browser
await page.goto('http://localhost:3000/');   // Navigates to the web application homepage
await page.getByRole('link', { name: 'Admin' }).click();  // Clicks the "Admin" link
await expect(page).toHaveURL('http://localhost:3000/admin/authenticate'); // Confirms navigation to the login page

// Filling out the admin login credentials and submitting
await page.getByPlaceholder('Username').click();
await page.getByPlaceholder('Username').fill('admin123');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('EZP123');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');  // Verifies successful login by checking the URL

// Checking for the "logged in successfully" toast notification
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();  // Ensures the success message is visible
await expect(toast3).toContainText('Logged in successfully');  // Verifies the correct message
await page.waitForTimeout(10000); // Waits for the toast notification to auto-close (can be adjusted)

// Triggering the action to fetch user details from the empty table
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
await page.getByRole('button', { name: 'Get User Details' }).click();
const errorMessage1 = page.locator('text=Error: Network response was not ok');  // Checks for the error message
await expect(errorMessage1).toBeVisible();  // Asserts that the error message is shown when the table is empty

// Logging out of the admin interface
await page.locator('a').filter({ hasText: 'Home' }).click();
await expect(page).toHaveURL('http://localhost:3000');  // Verifies redirection to the homepage
// const toast4 = page.locator('.Toastify__toast--success');  // Verifies the "logged out successfully" message
// await expect(toast4).toBeVisible();  // Ensures the success message is visible
// await expect(toast4).toContainText('You have been logged out successfully.');  // Verifies the correct logout message
// await page.waitForTimeout(10000); // Waits for the toast message to close

// Closes the browser and ends the test
await context.close();
await browser.close();
});

// Test case for checking error when the Transaction details table is empty
test ('Empty Transaction details table error',
  async () => {
const browser = await chromium.launch({
  headless: false  // Launches browser with UI for observation during testing
});
test.setTimeout(180000);  // Sets the test timeout to 3 minutes

const context = await browser.newContext();  // Creates a new isolated session (context)
const page = await context.newPage();        // Opens a new tab (page)
await page.goto('http://localhost:3000/');   // Navigates to the homepage
await page.getByRole('link', { name: 'Admin' }).click();  // Clicks the "Admin" link to access the login page
await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');  // Confirms navigation to the login page

// Logging in as an admin
await page.getByPlaceholder('Username').click();
await page.getByPlaceholder('Username').fill('admin123');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('EZP123');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');  // Verifies successful login

// Checking for "logged in successfully" toast message
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();  // Ensures that the success toast is visible
await expect(toast3).toContainText('Logged in successfully');  // Verifies the success message
await page.waitForTimeout(10000);  // Waits for the toast to auto-close

// Triggering action to fetch empty transaction details
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
await page.getByRole('button', { name: 'Get Transaction Details' }).click();
const errorMessage2 = page.locator('text=Error: Network response was not ok');  // Checks for the error message
await expect(errorMessage2).toBeVisible();  // Asserts that the error message appears for empty transaction details

// Logging out of the admin panel
await page.locator('a').filter({ hasText: 'Home' }).click();
await expect(page).toHaveURL('http://localhost:3000');  // Confirms redirection to the homepage
// const toast4 = page.locator('.Toastify__toast--success');  // Verifies logout success message
// await expect(toast4).toBeVisible();  // Ensures the success message is visible
// await expect(toast4).toContainText('You have been logged out successfully.');  // Confirms the correct logout message
// await page.waitForTimeout(10000);  // Waits for the toast to auto-close

// Closes the browser session
await context.close();
await browser.close();
});

// Test case for checking error when the Fraud transaction details table is empty
test ('Empty Fraud transaction details table error',
  async () => {
const browser = await chromium.launch({
  headless: false  // Headless mode is disabled for visual debugging
});
test.setTimeout(180000);  // Test timeout is set to 3 minutes

const context = await browser.newContext();  // Creates a new context (session)
const page = await context.newPage();        // Opens a new page (tab)
await page.goto('http://localhost:3000/');   // Navigates to the application homepage
await page.getByRole('link', { name: 'Admin' }).click();  // Clicks on the "Admin" link
await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');  // Confirms navigation to the admin login page

// Admin login process
await page.getByPlaceholder('Username').click();
await page.getByPlaceholder('Username').fill('admin123');
await page.getByPlaceholder('Password').click();
await page.getByPlaceholder('Password').fill('EZP123');
await page.getByRole('button', { name: 'Submit' }).click();
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');  // Confirms successful login

// Verifying the "logged in successfully" toast message
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();  // Ensures the success toast is shown
await expect(toast3).toContainText('Logged in successfully');  // Confirms the success message
await page.waitForTimeout(10000);  // Waits for the toast to auto-close

// Triggering the action to fetch fraud transaction details from an empty table
await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
await page.getByRole('button', { name: 'Get Risk Scores' }).click();
const errorMessage3 = page.locator('text=Error: Network response was not ok');  // Checks for the error message
await expect(errorMessage3).toBeVisible();  // Asserts that the error message is shown for the empty table

// Logging out of the admin interface
await page.locator('a').filter({ hasText: 'Home' }).click();
await expect(page).toHaveURL('http://localhost:3000');  // Verifies redirection to the homepage after logout
// const toast4 = page.locator('.Toastify__toast--success');  // Confirms logout success message
// await expect(toast4).toBeVisible();  // Ensures the success toast is visible
// await expect(toast4).toContainText('You have been logged out successfully.');  // Confirms the correct logout message
// await page.waitForTimeout(10000);  // Waits for the toast to auto-close

// Closes the browser session and context
await context.close();
await browser.close();
});
