import React, { useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(option) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className="custom-dropdown">
      <label className="label"><h1>{label}</h1></label>
      <div className="dropdown-box" onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <svg className={`arrow ${isOpen ? 'rotate' : ''}`} width="14" height="14" viewBox="0 0 20 20">
          <path d="M5.5 7l4.5 4.5L14.5 7z" fill="currentColor" />
        </svg>
      </div>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}