import { render } from '@testing-library/react';
import RootLayout from './layout';

jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-font-class',
  }),
}));

describe('Root Layout', () => {
  it('renders children content', () => {
    const testContent = 'Test Content';
    const { getByText } = render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });
});
