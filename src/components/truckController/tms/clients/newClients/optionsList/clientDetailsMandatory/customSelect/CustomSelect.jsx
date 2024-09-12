import React, { useState, useEffect, useRef } from 'react';
import style from './CustomSelect.module.scss';
import { DownOutlined } from '@ant-design/icons';

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('Select a country ');
  const [isOpen, setIsOpen] = useState(false); // Estado para mostrar/ocultar opciones
  const selectRef = useRef(null);

  const options = [
    { value: 'spain', label: 'Spain' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={style.customSelect} ref={selectRef}>
      <div className={style.selectedOption} onClick={toggleOptions}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className={style.optionsContainer}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${style.option} ${selectedOption === option.label ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
