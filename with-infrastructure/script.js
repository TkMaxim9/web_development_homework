"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDataIfRemembered = void 0;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem('authData');
    if (saved) {
        var _a = JSON.parse(saved), email = _a.email, password = _a.password;
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
    }
});
// Валидация
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePassword(password) {
    return password.length >= 6;
}
// вывод сообщений
function showRedMessage(text) {
    var msg = document.getElementById('message');
    if (msg) {
        msg.textContent = text;
        msg.style.color = 'red';
    }
}
function showGreenMessage(text) {
    var msg = document.getElementById('message');
    if (msg) {
        msg.textContent = text;
        msg.style.color = 'green';
    }
}
// Корректные данные
var correctLogin = 'test@example.com';
var correctPassword = '123456';
// Установка обработчика события
var loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleSubmit);
}
// Функция обработки отправки формы
function handleSubmit(e) {
    e.preventDefault();
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var rememberInput = document.getElementById('remember');
    if (!emailInput || !passwordInput || !rememberInput)
        return;
    var email = emailInput.value;
    var password = passwordInput.value;
    if (!validateEmail(email)) {
        showRedMessage('Некорректный email');
        return;
    }
    if (!validatePassword(password)) {
        showRedMessage('Пароль слишком короткий');
        return;
    }
    // Проверка данных
    if (email === correctLogin && password === correctPassword) {
        showGreenMessage('Успешный вход');
    }
    else {
        showRedMessage('Неверные данные');
        if (loginForm) {
            loginForm.classList.add('shake');
            setTimeout(function () { return loginForm.classList.remove('shake'); }, 300);
        }
    }
    (0, exports.saveDataIfRemembered)(email, password, rememberInput.checked);
}
// Хранение (стрелочная функция)
var saveDataIfRemembered = function (email, password, remember) {
    if (remember) {
        localStorage.setItem('authData', JSON.stringify({ email: email, password: password }));
    }
    else {
        localStorage.removeItem('authData');
    }
};
exports.saveDataIfRemembered = saveDataIfRemembered;
