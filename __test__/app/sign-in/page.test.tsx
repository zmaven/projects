import SignIn from '@/app/(auth)/sign-in/page';
import { render, screen } from '@testing-library/react';

describe('Home page', () => {
    it('Should render properly', () => {
        render(<SignIn />);
        const header = screen.getByTestId('signin');
        expect(header).toHaveTextContent('SignIn');
    });
});
