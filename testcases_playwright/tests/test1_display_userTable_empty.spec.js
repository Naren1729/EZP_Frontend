//**
// * @Author: Keerthana B
//* @Date: 11/09/2024

// Test1: Checks if appropriate error messages 
// are printed when the 3 tables are empty
// Can seaparate each test cases  

// Run cmd: npx playwright test test1_display_userTable_empty --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import {test, expect} from "@playwright/test";

test ('Empty User table error',
  async () => {
const browser = await chromium.launch({
  headless: false,
  slowMo: 500
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
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();
await expect(toast3).toContainText('Logged in successfully');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time

await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
await page.getByRole('button', { name: 'Get User Details' }).click();
const errorMessage1 = page.locator('text=Error: Network response was not ok');
await expect(errorMessage1).toBeVisible();

//logout
await page.locator('a').filter({ hasText: 'Logout' }).click();
await expect(page).toHaveURL('http://localhost:3000');
const toast4 = page.locator('.Toastify__toast--success');
await expect(toast4).toBeVisible();
await expect(toast4).toContainText('You have been logged out successfully.');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time


// ---------------------
await context.close();
await browser.close();
});

test ('Empty Transaction details table error',
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
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();
await expect(toast3).toContainText('Logged in successfully');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time

await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess')
await page.getByRole('button', { name: 'Get Transaction Details' }).click();
const errorMessage2 = page.locator('text=Error: Network response was not ok');
await expect(errorMessage2).toBeVisible();

//logout
await page.locator('a').filter({ hasText: 'Logout' }).click();
await expect(page).toHaveURL('http://localhost:3000');
const toast4 = page.locator('.Toastify__toast--success');
await expect(toast4).toBeVisible();
await expect(toast4).toContainText('You have been logged out successfully.');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time


// ---------------------
await context.close();
await browser.close();
});

test ('Empty Fraud transaction details table error',
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
const toast3 = page.locator('.Toastify__toast--success');
await expect(toast3).toBeVisible();
await expect(toast3).toContainText('Logged in successfully');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time

await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
await page.getByRole('button', { name: 'Get Risk Scores' }).click();
const errorMessage3 = page.locator('text=Error: Network response was not ok');
await expect(errorMessage3).toBeVisible();

//logout
await page.locator('a').filter({ hasText: 'Logout' }).click();
await expect(page).toHaveURL('http://localhost:3000');
const toast4 = page.locator('.Toastify__toast--success');
await expect(toast4).toBeVisible();
await expect(toast4).toContainText('You have been logged out successfully.');
await page.waitForTimeout(10000); // Adjust timeout based on the autoClose time

// ---------------------
await context.close();
await browser.close();
});