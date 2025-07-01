// InputField.jsx
import React, { useState } from 'react';

const InputField = ({ 
  type, 
  name, 
  placeholder, 
  icon, 
  value, 
  onChange, 
  required = false 
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  
  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? 'text' : type}
        name={name}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
        required={required}
      />
      <i className="material-icons">{icon}</i>
      {type === 'password' && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-icons eye-icon"
        >
          {isPasswordShown ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  );
};

export default InputField;