import React from 'react';

interface Props {
    text: string;
    isError: boolean;
}

const Message: React.FC<Props> = ({ text, isError }) => (
    <p id="message" role="alert" style={{ color: isError ? 'red' : 'green' }}>
        {text}
    </p>
);

export default Message;
