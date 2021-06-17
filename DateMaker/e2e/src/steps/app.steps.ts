import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';

import { AppPage } from '../pages/app.po';
import { assert } from 'console';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Given(/^I am on the home page$/, async () => {
  await page.navigateTo('/');
});

When(/^I do nothing$/, () => {});

Then('I should see the tittle', async () => {
    assert(expect(await page.getTitleText()), 'DateMaker');
});

//test para login
Given('I am on the login page', async() => {
  await page.navigateTo('/log-in');
});
Then('I should see the login form', async () => {
  assert(expect(await page.getComponent('div mat-card mat-card-title')), 'Log In');
});

//test para sign-up
Given('I am on the signup page', async() => {
  await page.navigateTo('/sign-up');
});
Then('I should see the signup form', async () => {
  assert(expect(await page.getComponent('div mat-card mat-card-title')), 'Sign Up');
});