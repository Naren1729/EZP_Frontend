//**
// * @Author: Arvind
//* @Date: 11/09/2024

// Test6: Testing if all the static features are visible ;  

// Run cmd : npx playwright test test6_static_pages --project chromium --workers 1 --debug

import { test, expect } from '@playwright/test';

// Test for the "Home" page static content
test('Testing Home, About, Features, and Our Team sections', async ({ page }) => {

  // Navigate to the home page
  await page.goto('http://localhost:3000/');

  // ===================
  // Home Page Tests
  // ===================
  // Check if "Security and Compliance" and "Welcome to" texts are visible in the home section
  await expect(page.locator('#home')).toContainText('Security and Compliance');
  await expect(page.locator('#home')).toContainText('Welcome to');

  // Check if the call to action "Start Protecting Your Data Now – Sign Up Today!" is visible
  await expect(page.locator('#root')).toContainText('Start Protecting Your Data Now – Sign Up Today!');

  // Verify that the login message is visible
  await expect(page.getByText('Manage Your Compliance Effortlessly – Login to Your DashboardAdmin')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Manage Your Compliance Effortlessly – Login to Your Dashboard');

  // ===================
  // About Page Tests
  // ===================
  // Navigate to the "About" page
  await page.locator('a').filter({ hasText: 'About' }).click();

  // Verify if the "About Us" title and vision statement are visible
  await expect(page.getByText('About Us')).toBeVisible();
  await expect(page.getByText('Our Vision').first()).toBeVisible();
  await expect(page.getByText('To revolutionize').first()).toBeVisible();

  // Wait briefly for mission text to appear (if necessary for animations)
  await page.waitForTimeout(500);

  // Check if the mission statement is visible
  await expect(page.getByText('Our MissionOur mission is to').nth(1)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'About Us' })).toBeVisible();

  // ===================
  // Features Page Tests
  // ===================
  // Navigate to the "Features" page
  await page.locator('a').filter({ hasText: 'Features' }).click();

  // Verify the heading and various feature items are visible
  await expect(page.getByRole('heading', { name: 'Features' })).toBeVisible();
  await expect(page.getByText('SecurityState-of-the-art')).toBeVisible();
  await expect(page.getByText('PaymentsEasy and secure')).toBeVisible();
  await expect(page.getByText('Fraud DetectionAdvanced')).toBeVisible();
  await expect(page.getByText('Support24/7 customer support')).toBeVisible();
  await expect(page.getByText('FeaturesSecurityState-of-the-')).toBeVisible();

  // ===================
  // Our Team Page Tests
  // ===================
  // Navigate to the "Our Team" page
  await page.locator('a').filter({ hasText: 'Our Team' }).click();

  // Verify the heading "Meet Our Team" is visible
  await expect(page.getByRole('heading', { name: 'Meet Our Team' })).toBeVisible();

  // Check if each team member's name and photo are visible
  await expect(page.locator('div').filter({ hasText: /^Mayuri Goswami$/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Mayuri Goswami' })).toBeVisible();

  await expect(page.locator('div').filter({ hasText: /^Bhavansh Gali$/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Bhavansh Gali' })).toBeVisible();

  await expect(page.locator('div').filter({ hasText: /^Naren Sri Sai$/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Naren Sri Sai' })).toBeVisible();

  await expect(page.getByRole('img', { name: 'Keerthana B' })).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Keerthana B$/ })).toBeVisible();

  await expect(page.locator('div').filter({ hasText: /^Arvind Kumar$/ })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Arvind Kumar' })).toBeVisible();
});
