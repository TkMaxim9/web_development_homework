import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import Checkbox from './Checkbox';
import Message from './Message';
import SocialButtons from './SocialButtons';
import { validateEmail, validatePassword } from '../utilities/validator';

const correctLogin = 'test@example.com';
const correctPassword = '123456';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('authData');
        if (saved) {
            const { email, password } = JSON.parse(saved);
            setEmail(email);
            setPassword(password);
            setRemember(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setMessage('Некорректный email');
            setIsError(true);
            return;
        }

        if (!validatePassword(password)) {
            setMessage('Пароль слишком короткий');
            setIsError(true);
            return;
        }

        if (email === correctLogin && password === correctPassword) {
            setMessage('Успешный вход');
            setIsError(false);
        } else {
            setMessage('Неверные данные');
            setIsError(true);
            setShake(true);
            setTimeout(() => setShake(false), 300);
        }

        if (remember) {
            localStorage.setItem('authData', JSON.stringify({ email, password }));
        } else {
            localStorage.removeItem('authData');
        }
    };

    return (
        <form id="loginForm" onSubmit={handleSubmit} className={shake ? 'shake' : ''}>
            <h2>Авторизация</h2>
            <SocialButtons />
            <InputField name="email" label="Email:" type="email" value={email} onChange={setEmail} required />
            <InputField name="password" label="Пароль:" type="password" value={password} onChange={setPassword} required minLength={6} />
            <Checkbox label="Запомнить меня" checked={remember} onChange={setRemember} />
            <button id="loginBtn" type="submit">Войти</button>
            <Message text={message} isError={isError} />
        </form>
    );
};

export default LoginForm;
