document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("authData");
    if (saved) {
        const { email, password } = JSON.parse(saved);
        document.getElementById("email").value = email;
        document.getElementById("password").value = password;
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
    const msg = document.getElementById("message");
    msg.textContent = text;
    msg.style.color = "red";
}
function showGreenMessage(text) {
    const msg = document.getElementById("message");
    msg.textContent = text;
    msg.style.color = "green";
}

// Корректные данные
const correctLogin = "test@example.com";
const correctPassword = "123456";

// УКстановка обработчика события
document.getElementById("loginForm").addEventListener("submit", handleSubmit);

// Фукция обрабботки отправки формы
function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validateEmail(email)) return showRedMessage("Некорректный email");
    if (!validatePassword(password)) return showRedMessage("Пароль слишком короткий");

    // Проверка данных
    if (email === correctLogin && password === correctPassword) {
        showGreenMessage("Успешный вход");
    } else {
        showRedMessage("Неверные данные");
        document.getElementById("loginForm").classList.add("shake");
        setTimeout(() => document.getElementById("loginForm").classList.remove("shake"), 300);
    }

    saveDataIfRemembered(email, password);
}

// Хранение (стрелочная функция)
const saveDataIfRemembered = (email, password) => {
    const remember = document.getElementById("remember").checked;
    if (remember) {
        localStorage.setItem("authData", JSON.stringify({ email, password }));
    } else {
        localStorage.removeItem("authData");
    }
}

