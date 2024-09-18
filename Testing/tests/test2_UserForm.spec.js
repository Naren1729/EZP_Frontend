//**
// * @Author: Keerthana B
//* @Date: 11/09/2024

// Test2: Inserting a new user under User view and 
// verifying the update in the user table under Admin view
// CANNOT separate each test case  

// cd Testing
// Run cmd: npx playwright test test2_UserForm --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import { test, expect } from "@playwright/test";

// Test case for signing up a new user
test("sign-up form testing", async () => {
  const browser = await chromium.launch({
    headless: false,   // Browser is launched in non-headless mode for visual debugging
    slowMo: 500        // Slows down operations for easier observation during test execution
  });
  test.setTimeout(180000);  // Increases test timeout to 3 minutes to handle any delays

  const context = await browser.newContext();  // Creates a new isolated session (context)
  const page = await context.newPage();        // Opens a new tab (page)
  await page.goto('http://localhost:3000/');   // Navigates to the web application homepage
  await page.locator('div').filter({ hasText: /^User$/ }).click();  // Clicks on the "User" link
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');  // Verifies navigation to user authentication page

  // Navigates to the sign-up form page
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');  // Verifies redirection to sign-up form

  // Filling in the sign-up form
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('keerthanaB');  // Enters username
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('keerthana b');  // Enters full name
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('kiki02');  // Enters password
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('keerthana@gmail.com');  // Enters email
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('500');  // Enters initial balance
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('kiki02');  // Enters transaction password

  // Submitting the sign-up form
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');  // Verifies successful form submission

  // Checking for success toast notification
  const toast = page.locator('.Toastify__toast--success');
  await expect(toast).toBeVisible();  // Verifies success message is visible
  await expect(toast).toContainText('Signed up successfully');  // Verifies the correct success message
  await page.waitForTimeout(7000);  // Waits for the toast message to auto-close (timeout can be adjusted)

  // Closing the context and browser session
  await context.close();
  await browser.close();
});

// Test case for checking if the signed-up user is updated in the Admin's "Get User Data" view
test('Checking updation of signed-up user data under admin - Get User Data', async () => {
  const browser = await chromium.launch({
    headless: false   // Headless mode disabled for visual inspection during testing
  });
  test.setTimeout(180000);  // Setting test timeout to 3 minutes for longer operations

  const context = await browser.newContext();  // Creates a new browser session (context)
  const page = await context.newPage();        // Opens a new page (tab)
  await page.goto('http://localhost:3000/');   // Navigates to the homepage
  await page.getByRole('link', { name: 'Admin' }).click();  // Clicks on the "Admin" link
  await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');  // Verifies navigation to admin login page

  // Admin login
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('admin123');  // Enters admin username
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('EZP123');  // Enters admin password
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');  // Verifies successful login

  // Checking for login success toast notification
  const toast2 = page.locator('.Toastify__toast--success');
  await expect(toast2).toBeVisible();  // Ensures the success message is visible
  await expect(toast2).toContainText('Logged in successfully');  // Verifies the correct login success message
  await page.waitForTimeout(7000);  // Waits for the toast to auto-close (adjustable timeout)

  // Admin fetches user details
  await page.getByRole('button', { name: 'Get User Details' }).click();

  // Verifying the title for user details section
  const title = page.locator('.get-data-title');
  await expect(title).toHaveText('All Users:');  // Ensures the title matches expected text

  // Checking if user cards are rendered
  const cards = page.locator('.card');
  const numberOfUsers = await cards.count();  // Counts the number of user cards available
  expect(numberOfUsers).toBeGreaterThan(0);  // Asserts that at least one user card is present

  // Getting the most recently added user card (assuming the last one is the new user)
  const card = cards.nth(numberOfUsers - 1);

  // Verifying that the user ID (inside .circle > h2) is displayed
  const userId = card.locator('.circle h2');
  await expect(userId).not.toBeEmpty();  // Ensures the user ID is not empty

  // Verifying that there are 4 paragraph elements (for different user details)
  const paragraphs = card.locator('p');
  await expect(paragraphs).toHaveCount(4);  // Asserts that there are exactly 4 paragraphs in the card

  // Verifying the new user's details
  const username = card.locator('p >> text=Username:').locator('.user-data-label');
  await expect(username).toHaveText('keerthanaB');  // Verifies the correct username

  const email = card.locator('p >> text=Email:').locator('.user-data-label');
  await expect(email).toHaveText('keerthana@gmail.com');  // Verifies the correct email

  const currentBalance = card.locator('p >> text=Current Balance:').locator('.user-data-label');
  await expect(currentBalance).toHaveText('500');  // Verifies the correct current balance

  const password = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
  await expect(password).toHaveText('No');  // Verifies the blocklist status is set to "No"

  // Logging out from the admin panel
  await page.locator('a').filter({ hasText: 'Home' }).click();
  await expect(page).toHaveURL('http://localhost:3000');  // Verifies redirection to homepage after logout
  // const toast3 = page.locator('.Toastify__toast--success');  // Verifies logout success message
  // await expect(toast3).toBeVisible();  // Ensures the logout success message is visible
  // await expect(toast3).toContainText('You have been logged out successfully.');  // Verifies the correct logout message
  // await page.waitForTimeout(7000);  // Waits for the toast to auto-close

  // Closing the browser session and context
  await context.close();
  await browser.close();
});
