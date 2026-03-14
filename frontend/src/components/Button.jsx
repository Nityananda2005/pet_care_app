import React from 'react';

const Button = ({ children, variant = 'primary', icon: Icon, fullWidth, style, ...props }) => {
    const className = `btn btn-${variant}`;
    return (
        <button className={className} style={{ width: fullWidth ? '100%' : undefined, ...style }} {...props}>
            {children}
            {Icon && <Icon size={20} />}
        </button>
    );
};

export default Button;
