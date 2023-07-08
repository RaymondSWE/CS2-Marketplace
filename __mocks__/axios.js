jest.mock('axios', () => ({
    __esModule: true, // this property makes it work
    default: jest.fn(),
  }));
  