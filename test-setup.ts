import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

Element.prototype.scrollIntoView = jest.fn();

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
