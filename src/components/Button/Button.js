import React from 'react';

import './Button.css';

const Button = ({ onClick, children, variant = 'primary', size = 'medium', disabled = false }) => {
    const className = `btn btn-${variant} btn-${size}`;

    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

