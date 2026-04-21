import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  let mockDomSanitizer: jest.Mocked<DomSanitizer>;

  beforeEach(() => {
    // Create a Jest mock for DomSanitizer with all methods used by SafePipe
    mockDomSanitizer = {
      bypassSecurityTrustHtml: jest.fn(),
      bypassSecurityTrustStyle: jest.fn(),
      bypassSecurityTrustScript: jest.fn(),
      bypassSecurityTrustUrl: jest.fn(),
      bypassSecurityTrustResourceUrl: jest.fn(),
      sanitize: jest.fn()
    } as any;

    pipe = new SafePipe(mockDomSanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call bypassSecurityTrustHtml for html type', () => {
    const testValue = '<p>Test HTML</p>';
    const expectedResult = 'trusted-html';
    mockDomSanitizer.bypassSecurityTrustHtml.mockReturnValue(expectedResult as any);

    const result = pipe.transform(testValue, 'html');

    expect(mockDomSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(testValue.trim());
    expect(result).toBe(expectedResult);
  });

  it('should call bypassSecurityTrustStyle for style type', () => {
    const testValue = 'color: red;';
    const expectedResult = 'trusted-style';
    mockDomSanitizer.bypassSecurityTrustStyle.mockReturnValue(expectedResult as any);

    const result = pipe.transform(testValue, 'style');

    expect(mockDomSanitizer.bypassSecurityTrustStyle).toHaveBeenCalledWith(testValue.trim());
    expect(result).toBe(expectedResult);
  });

  it('should call bypassSecurityTrustScript for script type', () => {
    const testValue = 'console.log("test");';
    const expectedResult = 'trusted-script';
    mockDomSanitizer.bypassSecurityTrustScript.mockReturnValue(expectedResult as any);

    const result = pipe.transform(testValue, 'script');

    expect(mockDomSanitizer.bypassSecurityTrustScript).toHaveBeenCalledWith(testValue.trim());
    expect(result).toBe(expectedResult);
  });

  it('should call bypassSecurityTrustUrl for url type', () => {
    const testValue = 'https://example.com';
    const expectedResult = 'trusted-url';
    mockDomSanitizer.bypassSecurityTrustUrl.mockReturnValue(expectedResult as any);

    const result = pipe.transform(testValue, 'url');

    expect(mockDomSanitizer.bypassSecurityTrustUrl).toHaveBeenCalledWith(testValue.trim());
    expect(result).toBe(expectedResult);
  });

  it('should call bypassSecurityTrustResourceUrl for resourceUrl type', () => {
    const testValue = 'https://example.com/resource';
    const expectedResult = 'trusted-resource-url';
    mockDomSanitizer.bypassSecurityTrustResourceUrl.mockReturnValue(expectedResult as any);

    const result = pipe.transform(testValue, 'resourceUrl');

    expect(mockDomSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(testValue.trim());
    expect(result).toBe(expectedResult);
  });

  it('should throw error for invalid type', () => {
    const testValue = 'test value';
    const invalidType = 'invalidType';

    expect(() => pipe.transform(testValue, invalidType)).toThrow(`Invalid safe type specified: ${invalidType}`);
  });

  it('should trim whitespace from input values', () => {
    const testValue = '  <p>Test HTML</p>  ';
    const expectedResult = 'trusted-html';
    mockDomSanitizer.bypassSecurityTrustHtml.mockReturnValue(expectedResult as any);

    pipe.transform(testValue, 'html');

    expect(mockDomSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(testValue.trim());
  });
});
