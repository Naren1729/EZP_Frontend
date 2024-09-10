//**
// * @Author: Keerthana B
//* @Date: 09/09/2024

// Test4: Testing sign-up window by giving insufficient 
// information and waiting for dialog box.

// Run cmd: npx playwright test test4_userForm_validation --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import {test, expect} from "@playwright/test";

test("sign-up form testing", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  test.setTimeout(180000);

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^User$/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('kim');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('kim');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('kim');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('kim.com');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('3000');
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('ki');
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast_1 = page.locator('.Toastify__toast--error');
  await expect(toast_1).toBeVisible();
  await expect(toast_1).toContainText('Password must be at least 4 characters long');
  await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time


  // 1st correcttion
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('kim02');
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast_2 = page.locator('.Toastify__toast--error');
  await expect(toast_2).toBeVisible();
  await expect(toast_2).toContainText('Invalid email format');
  await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time

  // 2nd correcttion
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('kim@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  const toast_3 = page.locator('.Toastify__toast--error');
  await expect(toast_3).toBeVisible();
  await expect(toast_3).toContainText('Transaction Password must be at least 4 characters long');
  await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time

  // 3rd correcttion
  await page.getByPlaceholder('Transaction Password').fill('kim02');
  await page.getByRole('button', { name: 'Submit' }).click();

  
  // await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');

  const toast = page.locator('.Toastify__toast--success');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Signed up successfully');
  await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time


  // ---------------------
  await context.close();
  await browser.close();
});

test ('Checking updation of signed-up user data under admin - Get User Data ',
    async () => {
  const browser = await chromium.launch({
    headless: false
  });
  test.setTimeout(180000);

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('admin123');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('EZP123');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
  const toast2 = page.locator('.Toastify__toast--success');
  await expect(toast2).toBeVisible();
  await expect(toast2).toContainText('Logged in successfully');
  await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time

  await page.getByRole('button', { name: 'Get User Details' }).click();
  
    const title = page.locator('.get-data-title');
    await expect(title).toHaveText('All Users:');

    // If there's no error, proceed with user data checks
    const cards = page.locator('.card');
    
    // Ensure there are multiple user cards rendered
    const numberOfUsers = await cards.count();
    expect(numberOfUsers).toBeGreaterThan(0); // Assuming at least one user

    const card = cards.nth(numberOfUsers-1);

  // Verify that the user ID (inside .circle > h2) is displayed
      const userId = card.locator('.circle h2');
      await expect(userId).not.toBeEmpty();

    // checking for 4 paragraph tags
    const paragraphs= card.locator('p');
    await expect(paragraphs).toHaveCount(4);

      // Verify username
      const username = card.locator('p >> text=Username:').locator('.user-data-label');
      await expect(username).toHaveText('kim');

      // Verify email
      const email = card.locator('p >> text=Email:').locator('.user-data-label');
      await expect(email).toHaveText('kim@gmail.com');

      // Verify current balance
      const currentBalance = card.locator('p >> text=Current Balance:').locator('.user-data-label');
      await expect(currentBalance).toHaveText('3000');

      // Verify password
      const password = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
      await expect(password).toHaveText('No');
   
      //logout
      await page.locator('a').filter({ hasText: 'Logout' }).click();
      await expect(page).toHaveURL('http://localhost:3000');
      const toast3 = page.locator('.Toastify__toast--success');
      await expect(toast3).toBeVisible();
      await expect(toast3).toContainText('You have been logged out successfully.');
      await page.waitForTimeout(7000); // Adjust timeout based on the autoClose time

  // ---------------------
  await context.close();
  await browser.close();
});