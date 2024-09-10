//**
// * @Author: Keerthana B
//* @Date: 11/09/2024

// Test3: inserting 2 new users under User view ; 
// updation of same in usertable under Admin view ;
// successful transaction fron one user to another ;
// checking its updation under transaction table
// CANNOT seaparate each test cases  

// Run cmd : npx playwright test test3_successful_transaction --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import {test, expect} from "@playwright/test";

test("2 sign-up form testing", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo : 500
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
  await page.getByPlaceholder('Username').fill('mithun');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('mithun b');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('mithun01');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('mithun@gmail.com');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('1000');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('1000');
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('mithun01');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  const toast = page.locator('.Toastify__toast--success');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Signed up successfully');
  await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time


  //Inserting USER-2
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('alice');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('alice J');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('alice02');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('alice@gmail.com');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('2000');
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('2000');
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('alice02');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await page.waitForNavigation();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  const toast2 = page.locator('.Toastify__toast--success');
  await expect(toast2).toBeVisible();
  await expect(toast2).toContainText('Signed up successfully');
  await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time



  // ---------------------
  await context.close();
  await browser.close();
});

test ('Checking updation of 2 signed-up users and perform transaction with verification',
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
    const numberOfUsers = await cards.count();
    expect(numberOfUsers).toBeGreaterThan(0); // Assuming at least one user
    // Checking updation for user: mithun
    const card = cards.nth(numberOfUsers-2);

  // Verify that the user ID (inside .circle > h2) is displayed
      const userId = card.locator('.circle h2');
      await expect(userId).not.toBeEmpty();

    // checking for 4 paragraph tags
    const paragraphs= card.locator('p');
    await expect(paragraphs).toHaveCount(4);

      // Verify username
      const username = card.locator('p >> text=Username:').locator('.user-data-label');
      await expect(username).toHaveText('mithun');

      // Verify email
      const email = card.locator('p >> text=Email:').locator('.user-data-label');
      await expect(email).toHaveText('mithun@gmail.com');

      // Verify current balance
      const currentBalance = card.locator('p >> text=Current Balance:').locator('.user-data-label');
      await expect(currentBalance).toHaveText('1000');
      // Verify password
      const blocklist = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
      await expect(blocklist).toHaveText('No');

      //**
      // Checking updation for user: alice
      const card2 = cards.nth(numberOfUsers-1);

      // Verify that the user ID (inside .circle > h2) is displayed
          const userId2 = card2.locator('.circle h2');
          await expect(userId2).not.toBeEmpty();
    
        // checking for 4 paragraph tags
        const paragraphs2= card2.locator('p');
        await expect(paragraphs2).toHaveCount(4);
    
          // Verify username
          const username2 = card2.locator('p >> text=Username:').locator('.user-data-label');
          await expect(username2).toHaveText('alice');
    
          // Verify email
          const email2 = card2.locator('p >> text=Email:').locator('.user-data-label');
          await expect(email2).toHaveText('alice@gmail.com');
    
          // Verify current balance
          const currentBalance2 = card2.locator('p >> text=Current Balance:').locator('.user-data-label');
          await expect(currentBalance2).toHaveText('2000');

          // Verify password
          const blocklist2 = card2.locator('p >> text=Blocklist Status:').locator('.user-data-label');
          await expect(blocklist2).toHaveText('No');

          //logout
          await page.locator('a').filter({ hasText: 'Logout' }).click();
          await expect(page).toHaveURL('http://localhost:3000');
          const toast4 = page.locator('.Toastify__toast--success');
          await expect(toast4).toBeVisible();
          await expect(toast4).toContainText('You have been logged out successfully.');
          await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time


          //User Login - mithun
          await page.locator('div').filter({ hasText: /^User$/ }).click();
          await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
          await page.getByPlaceholder('Username').click();
          await page.getByPlaceholder('Username').fill('mithun');
          await page.getByPlaceholder('Password').click();
          await page.getByPlaceholder('Password').fill('mithun01');
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
          await expect(page.getByPlaceholder('User ID', { exact: true })).toHaveValue((numberOfUsers-1).toString());        
          await page.getByPlaceholder('Destination User ID').click();
          await page.getByPlaceholder('Destination User ID').fill((numberOfUsers).toString());
          await page.getByPlaceholder('Transaction Password').click();
          await page.getByPlaceholder('Transaction Password').fill('mithun01');
          await page.getByRole('button', { name: 'Submit' }).click();
          // await page.waitForNavigation();
          const toast6 = page.locator('.Toastify__toast--success');
          await expect(toast6).toBeVisible();
          await expect(toast6).toContainText('Transaction Successful');
          await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

          // Checking transactions
          await page.goto('http://localhost:3000');
          await page.getByRole('link', { name: 'Admin' }).click();
          await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');
          await page.getByPlaceholder('Username').fill('admin123');
          await page.getByPlaceholder('Password').fill('EZP123');
          await page.getByRole('button', { name: 'Submit' }).click();
          // await page.waitForNavigation();
        
          await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
          const toast7 = page.locator('.Toastify__toast--success');
          await expect(toast7).toBeVisible();
          await expect(toast7).toContainText('Logged in successfully');
          await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

          await page.getByRole('button', { name: 'Get Transaction Details' }).click();
        
          const title3 = page.locator('.get-data-title');
          await expect(title3).toHaveText('All Transactions:');
        
    const cards3 = page.locator('li.card');
    const numberOfTransactions = await cards3.count();
    expect(numberOfTransactions).toBeGreaterThan(0); // Ensure at least one transaction
    
    const card3 = cards3.nth(numberOfTransactions - 1); // Assuming the latest transaction is last
    
    // Transaction ID
    const transactionId = card3.locator('.circle.success h2');
    
    // User ID (Sender)
    const pElements = card3.locator('p.user-data-label'); // Replace 'some-class' with your class

// Get the count of <p> elements
    const numberOfPElements = await pElements.count();
    const userId3 = card3.locator('p:has-text("User Id:")').locator('.user-data-label').nth(numberOfPElements);
    
    // Destination User ID (Recipient)
    const destinationUserId = card3.locator('p:has-text("Destination User Id:") strong.user-data-label');
    
    // Transaction Type
    const transactionType = card3.locator('p:has-text("Transaction Type:") strong.user-data-label');
    
    // Amount
    const amount = card3.locator('p:has-text("Amount:") strong.user-data-label');
    
    // Assertions
    await expect(transactionId).not.toBeEmpty();
    console.log((numberOfUsers - 1).toString())
    await expect(userId3).toHaveText((numberOfUsers - 1).toString()); // Sender ID
    await expect(destinationUserId).toHaveText(numberOfUsers.toString()); // Recipient ID
    await expect(amount).toHaveText('100');
    await expect(transactionType).toHaveText('transfer');
     
    // Verify that the "Success" status has the correct CSS class
    const statusElement = card3.locator('.lower-button.success');
    await expect(statusElement).toHaveText('Status: Success');
    
    //logout
    await page.locator('a').filter({ hasText: 'Logout' }).click();
    await expect(page).toHaveURL('http://localhost:3000');
    const toast8 = page.locator('.Toastify__toast--success');
    await expect(toast8).toBeVisible();
    await expect(toast8).toContainText('You have been logged out successfully.');
    await page.waitForTimeout(6000); // Adjust timeout based on the autoClose time

    // ---------------------
    await context.close();
    await browser.close();
    
});
