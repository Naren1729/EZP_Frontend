//**
// * @Author: Keerthana B
//* @Date: 16/09/2024

// Test8: inserting a new user under User view ; 
// updation of same in usertable under Admin view ;
// making a failed transaction fron same user to same destination user ;
// checking if transaction fails ;

// cd Testing
// Run cmd : npx playwright test test8_same_ID_transaction --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import { test, expect } from "@playwright/test";
let numberOfUsers;

test("single sign-up form testing", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  test.setTimeout(180000);
  //Inserting USER-1
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^User$/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('arvind0123');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('arvind');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('arvind');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('arvind@gmail.com');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('1000');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('1000');
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('arvind');
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

test('Checking updation of single signed-up user and perform failed transaction with verification',
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
    // await page.waitForNavigation();

    await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
    const toast3 = page.locator('.Toastify__toast--success');
    await expect(toast3).toBeVisible();
    await expect(toast3).toContainText('Logged in successfully');
    await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

    await page.getByRole('button', { name: 'Get User Details' }).click();

    const title = page.locator('.get-data-title');
    await expect(title).toHaveText('All Users:');

    // If there's no error, proceed with user data checks
    const cards = page.locator('.card');

    // Ensure there are multiple user cards rendered
    numberOfUsers = await cards.count();
    expect(numberOfUsers).toBeGreaterThan(0); // Assuming at least one user
    // Checking updation for user: arvind
    const card = cards.nth(numberOfUsers - 1);

    // Verify that the user ID (inside .circle > h2) is displayed
    const userId = card.locator('.circle h2');
    await expect(userId).not.toBeEmpty();

    // checking for 4 paragraph tags
    const paragraphs = card.locator('p');
    await expect(paragraphs).toHaveCount(4);

    // Verify username
    const username = card.locator('p >> text=Username:').locator('.user-data-label');
    await expect(username).toHaveText('arvind0123');

    // Verify email
    const email = card.locator('p >> text=Email:').locator('.user-data-label');
    await expect(email).toHaveText('arvind@gmail.com');

    // Verify current balance
    const currentBalance = card.locator('p >> text=Current Balance:').locator('.user-data-label');
    await expect(currentBalance).toHaveText('1000');
    // Verify password
    const blocklist = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
    await expect(blocklist).toHaveText('No');

    //logout
    await page.locator('a').filter({ hasText: 'Home' }).click();
    await expect(page).toHaveURL('http://localhost:3000');


    //User Login - arvind
    await page.locator('div').filter({ hasText: /^User$/ }).click();
    // await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time
    await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
    // await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('arvind0123');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('arvind');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await page.waitForNavigation();

    //Transaction window

    const toast5 = page.locator('.Toastify__toast--success');
    await expect(toast5).toBeVisible();
    await expect(toast5).toContainText('Logged in successfully');
    await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

    await expect(page).toHaveURL('http://localhost:3000/main/userForm');
    await page.getByPlaceholder('Amount').click();
    await page.getByPlaceholder('Amount').fill('100');
    await expect(page.getByPlaceholder('User ID', { exact: true })).toHaveValue((numberOfUsers).toString());
    await page.getByPlaceholder('Destination User ID').click();
    await page.getByPlaceholder('Destination User ID').fill((numberOfUsers).toString());
    await page.getByPlaceholder('Transaction Password').click();
    await page.getByPlaceholder('Transaction Password').fill('arvind');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await page.waitForNavigation();
    const toast6 = page.locator('.Toastify__toast--error');
    await expect(toast6).toBeVisible();
    await expect(toast6).toContainText('Dest Id cannot be same as User Id');
    await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

    // ---------------------
    await context.close();
    await browser.close();

  });  