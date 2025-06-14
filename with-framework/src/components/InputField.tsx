import React from 'react';

interface Props {
    // Добавляем `name`
    name: string;
    label: string;
    type: 'email' | 'password';
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    minLength?: number;
}

const InputField: React.FC<Props> = ({ name, label, type, value, onChange, required, minLength }) => {
    // Создаем уникальный id на основе name
    const inputId = `input-${name}`;

    return (
        <>
            {/* Используем htmlFor для связи с id инпута */}
            <label htmlFor={inputId}>{label}</label>
            <input
                id={inputId} // Устанавливаем id
                name={name} // Атрибут name тоже полезен для форм
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                minLength={minLength}
            />
        </>
    );
};

export default InputField;