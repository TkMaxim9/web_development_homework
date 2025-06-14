import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event';

import Checkbox  from '../components/Checkbox.tsx'
import InputField from '../components/InputField'
import LoginForm from '../components/LoginForm'
import Message from '../components/Message'
import SocialButtons from '../components/SocialButtons'

// Checkbox

describe('Checkbox', () => {
    it('calls onChange when clicked', () => {
        const handleChange = vi.fn()
        render(<Checkbox label="Accept" checked={false} onChange={handleChange} />)
        fireEvent.click(screen.getByLabelText('Accept'))
        expect(handleChange).toHaveBeenCalled()
    })
})

// InputField

describe('InputField', () => {
    it('should render correctly and handle user input', () => {
        const mockOnChange = vi.fn();

        render(
            <InputField
                name = "email"
                label="Email"
                type="email"
                value="test@example.com"
                onChange={mockOnChange}
                required={true}
                minLength={5}
            />
        );

        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('type', 'email');
        expect(input).toBeRequired();
        expect(input).toHaveAttribute('minlength', '5');

        fireEvent.change(input, { target: { value: 'new@test.com' } });
        expect(mockOnChange).toHaveBeenCalledWith('new@test.com');
    });

    it('should handle password type correctly', () => {
        const mockOnChange = vi.fn();

        render(
            <InputField
                name = "password"
                label="Password"
                type="password"
                value="secret"
                onChange={mockOnChange}
            />
        );

        const input = screen.getByDisplayValue('secret');
        expect(input).toHaveAttribute('type', 'password');
        expect(input).not.toBeRequired();
        expect(input).not.toHaveAttribute('minlength');
    });
});


// oginForm

describe('LoginForm', () => {
    it('submits with correct email and password', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/пароль/i);
        const submitButton = screen.getByRole('button', { name: /^Войти$/i });

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, '123456');

        await user.click(submitButton);

        const successMessage = await screen.findByText(/успешный вход/i);
        expect(successMessage).toBeInTheDocument();
    });
});

// Message

describe('Message', () => {
    it('отображает текст и правильный стиль в зависимости от isError', () => {
        const { rerender } = render(<Message text="Success!" isError={false} />);
        const successMsg = screen.getByText('Success!');
        expect(successMsg).toBeInTheDocument();

        rerender(<Message text="Error occurred" isError={true} />);
        const errorMsg = screen.getByText('Error occurred');
        expect(errorMsg).toBeInTheDocument();
    });
});

// SocialButtons

describe('SocialButtons', () => {
    it('рендерит кнопки входа через VK и Google', () => {
        render(<SocialButtons />);
        expect(screen.getByRole('button', { name: /войти через vk/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /войти через google/i })).toBeInTheDocument();
    });
});
