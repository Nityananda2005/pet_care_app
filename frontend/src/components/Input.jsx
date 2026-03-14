import React from 'react';

const Input = ({ label, icon: Icon, type = 'text', placeholder, value, onChange, iconRight: IconRight, onIconRightClick }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {Icon && <Icon className="input-icon-left" size={18} />}
        <input
          className={`input-field ${Icon ? 'with-icon-left' : ''} ${IconRight ? 'with-icon-right' : ''}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {IconRight && (
          <button type="button" className="input-icon-right" onClick={onIconRightClick}>
            <IconRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
