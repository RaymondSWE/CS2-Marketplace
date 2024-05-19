// jestSetup.test.js
import '@testing-library/jest-dom/extend-expect';

require('dotenv').config({ path: '.env.test' });

describe('Jest setup', () => {
  it('should load the environment for testing variables correctly', () => {
    expect(process.env.REACT_APP_API_URL).toBe('https://localhost:4001');
    expect(process.env.REACT_APP_DOMAIN).toBe('https://localhost:3000');
    expect(process.env.HTTPS).toBe('true');
  });
});
