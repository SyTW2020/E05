import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('head title')).getText() as Promise<string>;
  }
}
