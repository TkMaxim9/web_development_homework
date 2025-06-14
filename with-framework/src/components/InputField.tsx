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
    const inputId = `input-${name}`;

    return (
        <>
            <label htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                name={name}
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