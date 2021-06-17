import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(suburl: string): Promise<any> {
    return browser.get(browser.baseUrl + suburl) as Promise<any>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('head title')).getText() as Promise<string>;
  }

  getComponent(component: string): Promise<string> {
    return element(by.css(component)).getText() as Promise<string>;
  }

  // getEvent(component: string): Promise<string> {
  //   return element(by.(component)).getText() as Promise<string>;
  // }
}
