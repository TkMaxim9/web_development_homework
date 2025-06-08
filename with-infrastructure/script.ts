document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('authData');
  if (saved) {
    const { email, password }: { email: string; password: string } =
      JSON.parse(saved);
    (document.getElementById('email') as HTMLInputElement).value = email;
    (document.getElementById('password') as HTMLInputElement).value = password;
  }
});

// Валидация
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

// вывод сообщений
function showRedMessage(text: string): void {
  const msg = document.getElementById('message');
  if (msg) {
    msg.textContent = text;
    msg.style.color = 'red';
  }
}
function showGreenMessage(text: string): void {
  const msg = document.getElementById('message');
  if (msg) {
    msg.textContent = text;
    msg.style.color = 'green';
  }
}

// Корректные данные
const correctLogin: string = 'test@example.com';
const correctPassword: string = '123456';

// Установка обработчика события
const loginForm = document.getElementById(
  'loginForm'
) as HTMLFormElement | null;
if (loginForm) {
  loginForm.addEventListener('submit', handleSubmit);
}

// Функция обработки отправки формы
function handleSubmit(e: Event): void {
  e.preventDefault();

  const emailInput = document.getElementById(
    'email'
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    'password'
  ) as HTMLInputElement | null;
  const rememberInput = document.getElementById(
    'remember'
  ) as HTMLInputElement | null;

  if (!emailInput || !passwordInput || !rememberInput) return;

  const email: string = emailInput.value;
  const password: string = passwordInput.value;

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
  } else {
    showRedMessage('Неверные данные');
    if (loginForm) {
      loginForm.classList.add('shake');
      setTimeout(() => loginForm.classList.remove('shake'), 300);
    }
  }

  saveDataIfRemembered(email, password, rememberInput.checked);
}

// Хранение (стрелочная функция)
export const saveDataIfRemembered = (
  email: string,
  password: string,
  remember: boolean
): void => {
  if (remember) {
    localStorage.setItem('authData', JSON.stringify({ email, password }));
  } else {
    localStorage.removeItem('authData');
  }
};
