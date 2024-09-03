import React, { forwardRef } from 'react';

import './Input.css';

const Input = forwardRef(({ type = 'text', placeholder, error, ...rest }, ref) => {
    return (
        <div className="input-container">
            <input
                ref={ref} // используем переданный реф
                type={type}
                placeholder={placeholder}
                className={`input ${error ? 'input-error' : ''}`}
                {...rest} // оставшиеся пропсы
            />
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
});

export default Input;
