const mockInitTestEnvironment = jest.fn();
const mockZoneJs = jest.fn();
const mockZoneJsTesting = jest.fn();
const mockGetTestBed = jest.fn(() => {
  return {
    initTestEnvironment: mockInitTestEnvironment,
  };
});
jest.mock('zone.js', () => {
  const mockedResult = mockZoneJs();

  return {
    mockedResult,
  };
});
jest.mock('zone.js/testing', () => {
  const mockedResult = mockZoneJsTesting();

  return {
    mockedResult,
  };
});
jest.mock('@angular/core/testing', () => {
  return {
    getTestBed: mockGetTestBed,
  };
});

class BrowserDynamicTestingModuleStub {}
class PlatformRefStub {}
const mockPlatformBrowserDynamicTesting = jest.fn(() => new PlatformRefStub());
jest.mock('@angular/platform-browser-dynamic/testing', () => {
  return {
    BrowserDynamicTestingModule: new BrowserDynamicTestingModuleStub(),
    platformBrowserDynamicTesting: mockPlatformBrowserDynamicTesting,
  };
});

test('should initialize test environment with getTestBed() and initTestEnvironment()', async () => {
  await import('../config/setup-jest');

  expect(mockZoneJs).toHaveBeenCalled();
  expect(mockZoneJsTesting).toHaveBeenCalled();
  expect(mockGetTestBed).toHaveBeenCalled();
  expect(mockInitTestEnvironment).toHaveBeenCalled();
  expect(mockInitTestEnvironment.mock.calls[0][0]).toBeInstanceOf(BrowserDynamicTestingModuleStub);
  expect(mockPlatformBrowserDynamicTesting).toHaveBeenCalled();
  expect(mockPlatformBrowserDynamicTesting.mock.results[0].value).toBeInstanceOf(PlatformRefStub);
});
