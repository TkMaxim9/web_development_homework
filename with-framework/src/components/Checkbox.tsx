import React from 'react';

interface Props {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => (
    <label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        {label}
    </label>
);

export default Checkbox;
