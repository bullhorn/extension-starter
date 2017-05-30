import { PlatformExtensionStarterPage } from './app.po';

describe('platform-extension-starter App', () => {
  let page: PlatformExtensionStarterPage;

  beforeEach(() => {
    page = new PlatformExtensionStarterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
