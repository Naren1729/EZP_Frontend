
//**
// * @Author: Arvind
//* @Date: 11/09/2024

// Test5: inserting 2 new users under User view ; 
// updation of same in usertable under Admin view ;
// making a failed transaction fron one user to another ;
// checking its updation under transaction table
// checking its updation under risk score table
// CANNOT seaparate each test cases  

// cd Testing
// Run cmd : npx playwright test test7_fraud_transaction --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import { test, expect } from "@playwright/test";
let numberOfUsers;

test('Checking updation of 2 signed-up users and perform multiple failed transaction with verification',
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
        const card = cards.nth(numberOfUsers - 2);

        // Verify that the user ID (inside .circle > h2) is displayed
        const userId = card.locator('.circle h2');
        await expect(userId).not.toBeEmpty();

        // checking for 4 paragraph tags
        const paragraphs = card.locator('p');
        await expect(paragraphs).toHaveCount(4);

        // Verify username
        const username = card.locator('p >> text=Username:').locator('.user-data-label');
        await expect(username).toHaveText('arvind');

        // Verify email
        const email = card.locator('p >> text=Email:').locator('.user-data-label');
        await expect(email).toHaveText('arvind@gmail.com');
        
        const blocklist = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
        await expect(blocklist).toHaveText('No');

        //**
        // Checking updation for user: subi
        const card2 = cards.nth(numberOfUsers - 1);

        // Verify that the user ID (inside .circle > h2) is displayed
        const userId2 = card2.locator('.circle h2');
        await expect(userId2).not.toBeEmpty();

        // checking for 4 paragraph tags
        const paragraphs2 = card2.locator('p');
        await expect(paragraphs2).toHaveCount(4);

        // Verify username
        const username2 = card2.locator('p >> text=Username:').locator('.user-data-label');
        await expect(username2).toHaveText('subi');

        // Verify email
        const email2 = card2.locator('p >> text=Email:').locator('.user-data-label');
        await expect(email2).toHaveText('subi@gmail.com');

        const blocklist2 = card2.locator('p >> text=Blocklist Status:').locator('.user-data-label');
        await expect(blocklist2).toHaveText('No');

        //logout
        await page.locator('a').filter({ hasText: 'Home' }).click();
        await expect(page).toHaveURL('http://localhost:3000');


        //User Login - arvind
        await page.locator('div').filter({ hasText: /^User$/ }).click();
        await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
        await page.getByPlaceholder('Username').click();
        await page.getByPlaceholder('Username').fill('arvind');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('arvind');
        await page.getByRole('button', { name: 'Submit' }).click();
        // await page.waitForNavigation();

        //Transaction window

        const toast5 = page.locator('.Toastify__toast--success');
        await expect(toast5).toBeVisible();
        await expect(toast5).toContainText('Logged in successfully');
        /////////////////////////////////////////////////////////////////////
            await page.waitForTimeout(6000);
            await expect(page).toHaveURL('http://localhost:3000/main/userForm');
            await page.getByPlaceholder('Amount').click();
            await page.getByPlaceholder('Amount').fill('50000');
            await expect(page.getByPlaceholder('User ID', { exact: true })).toHaveValue((numberOfUsers - 1).toString());
            await page.getByPlaceholder('Destination User ID').click();
            await page.getByPlaceholder('Destination User ID').fill((numberOfUsers).toString());
            await page.getByPlaceholder('Transaction Password').click();
            await page.getByPlaceholder('Transaction Password').fill('arvind');
            await page.getByRole('button', { name: 'Submit' }).click();
            // await page.waitForNavigation();
            const toast_1 = page.locator('.Toastify__toast--success');
        await expect(toast_1).toBeVisible();
        await expect(toast_1).toContainText('Transaction Successful');
            await page.waitForTimeout(6000);
            await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
            await page.getByPlaceholder('Username').click();
            await page.getByPlaceholder('Username').fill('arvind');
            await page.getByPlaceholder('Password').click();
            await page.getByPlaceholder('Password').fill('arvind');
            await page.getByRole('button', { name: 'Submit' }).click();
            
        
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        const toast_5 = page.locator('.Toastify__toast--success');
        await expect(toast_5).toBeVisible();
        await expect(toast_5).toContainText('Logged in successfully');
            await page.waitForTimeout(6000);
            await expect(page).toHaveURL('http://localhost:3000/main/userForm');
            await page.getByPlaceholder('Amount').click();
            await page.getByPlaceholder('Amount').fill('50000');
            await expect(page.getByPlaceholder('User ID', { exact: true })).toHaveValue((numberOfUsers - 1).toString());
            await page.getByPlaceholder('Destination User ID').click();
            await page.getByPlaceholder('Destination User ID').fill((numberOfUsers).toString());
            await page.getByPlaceholder('Transaction Password').click();
            await page.getByPlaceholder('Transaction Password').fill('arvind');
            await page.getByRole('button', { name: 'Submit' }).click();
            const toast_2 = page.locator('.Toastify__toast--error');
        await expect(toast_2).toBeVisible();
        await expect(toast_2).toContainText('Transaction Failed');
            // await page.waitForNavigation();
            await page.waitForTimeout(6000);
            await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
            await page.getByPlaceholder('Username').click();
            await page.getByPlaceholder('Username').fill('arvind');
            await page.getByPlaceholder('Password').click();
            await page.getByPlaceholder('Password').fill('arvind');
            await page.getByRole('button', { name: 'Submit' }).click();
        
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        const toast_6 = page.locator('.Toastify__toast--success');
        await expect(toast_6).toBeVisible();
        await expect(toast_6).toContainText('Logged in successfully');
            await page.waitForTimeout(6000);
            await expect(page).toHaveURL('http://localhost:3000/main/userForm');
            await page.getByPlaceholder('Amount').click();
            await page.getByPlaceholder('Amount').fill('50000');
            await expect(page.getByPlaceholder('User ID', { exact: true })).toHaveValue((numberOfUsers - 1).toString());
            await page.getByPlaceholder('Destination User ID').click();
            await page.getByPlaceholder('Destination User ID').fill((numberOfUsers).toString());
            await page.getByPlaceholder('Transaction Password').click();
            await page.getByPlaceholder('Transaction Password').fill('arvind');
            await page.getByRole('button', { name: 'Submit' }).click();
            const toast_3 = page.locator('.Toastify__toast--error');
        await expect(toast_3).toBeVisible();
        await expect(toast_3).toContainText('User Id is blocklisted');
            // await page.waitForNavigation();
            await page.waitForTimeout(6000);
        
        /////////////////////////////////////////////////////////////////////
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
        const transactionId = card3.locator('.circle.failed h2');

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
        await expect(amount).toHaveText('50000');
        await expect(transactionType).toHaveText('transfer');

        // Verify that the "Success" status has the correct CSS class
        const statusElement = card3.locator('.lower-button.failed');
        await expect(statusElement).toHaveText('Status: Failed');

        //logout
        await page.locator('a').filter({ hasText: 'Home' }).click();
        await expect(page).toHaveURL('http://localhost:3000');
        await context.close();
        await browser.close();

    });

test('Checking updation of risk score updation',
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
        const toast_3 = page.locator('.Toastify__toast--success');
        await expect(toast_3).toBeVisible();
        await expect(toast_3).toContainText('Logged in successfully');
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
        const card = cards.nth(numberOfUsers - 2);

        // Verify that the user ID (inside .circle > h2) is displayed
        const userId = card.locator('.circle h2');
        await expect(userId).not.toBeEmpty();

        // checking for 4 paragraph tags
        const paragraphs = card.locator('p');
        await expect(paragraphs).toHaveCount(4);

        // Verify username
        const username = card.locator('p >> text=Username:').locator('.user-data-label');
        await expect(username).toHaveText('arvind');

        // Verify email
        const email = card.locator('p >> text=Email:').locator('.user-data-label');
        await expect(email).toHaveText('arvind@gmail.com');

        const blocklist = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
        await expect(blocklist).toHaveText('Yes');

        //**
        // Checking updation for user: subi
        const card2 = cards.nth(numberOfUsers - 1);

        // Verify that the user ID (inside .circle > h2) is displayed
        const userId2 = card2.locator('.circle h2');
        await expect(userId2).not.toBeEmpty();

        // checking for 4 paragraph tags
        const paragraphs2 = card2.locator('p');
        await expect(paragraphs2).toHaveCount(4);

        // Verify username
        const username2 = card2.locator('p >> text=Username:').locator('.user-data-label');
        await expect(username2).toHaveText('subi');

        // Verify email
        const email2 = card2.locator('p >> text=Email:').locator('.user-data-label');
        await expect(email2).toHaveText('subi@gmail.com');


        // Verify password
        const blocklist2 = card2.locator('p >> text=Blocklist Status:').locator('.user-data-label');
        await expect(blocklist2).toHaveText('No');

        //logout
        await page.locator('a').filter({ hasText: 'Home' }).click();
        await expect(page).toHaveURL('http://localhost:3000');

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
        await page.getByRole('button', { name: 'Get Risk Scores' }).click();
        const title3 = page.locator('.get-data-title');
        await expect(title3).toHaveText('All Fraud Transactions');
        const cards3 = page.locator('li.card.risk');
        const numberOfTransactions = await cards3.count();
        expect(numberOfTransactions).toBeGreaterThan(0); // Ensure at least one transaction

        const card3 = cards3.nth(numberOfTransactions - 1); // Assuming the latest transaction is last

        // Transaction ID
        const transactionId = card3.locator('.circle.failed h2');

        // User ID (Sender)
        const pElements = card3.locator('p.user-data-label');
        const numberOfPElements = await pElements.count();
        const userId3 = card3.locator('p:has-text("User Id:")').locator('.user-data-label').nth(numberOfPElements);

        // Amount
        const amount = card3.locator('p:has-text("Transaction Amount:") strong.user-data-label');

        // Assertions
        await expect(transactionId).not.toBeEmpty();
        await expect(userId3).toHaveText((numberOfUsers - 1).toString()); // Sender ID
        await expect(amount).toHaveText('50000');

        // Verify the risk score dynamically
        const statusElement = card3.locator('.lower-button');
        const statusText = await statusElement.textContent(); // Get the full text, e.g., "Risk Score 50"

        // Extract the numeric part from the "Risk Score" text
        const riskScore = parseInt(statusText.replace('Risk Score ', '')); // Convert "50" to an integer

        // Check if the risk score is greater than 0
        expect(riskScore).toBeGreaterThan(0);

        //logout
        await page.locator('a').filter({ hasText: 'Home' }).click();
        await expect(page).toHaveURL('http://localhost:3000');
    });