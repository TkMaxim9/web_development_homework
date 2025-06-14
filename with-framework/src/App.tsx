import React from 'react';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <header>
                <h1>Добро пожаловать</h1>
            </header>

            <main>
                <LoginForm />
            </main>

            <footer>
                <p>2025 © Все права защищены</p>
            </footer>
        </div>
    );
};

export default App;
