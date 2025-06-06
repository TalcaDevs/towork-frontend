import React from 'react';
import { DateInputProps } from '../../interfaces/dateInput.interface';

const DateInput: React.FC<DateInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  placeholder = 'YYYY-MM-DD',
  error,
  className = ''
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    
    if (dateValue && !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      console.log('Formato de fecha incorrecto, debe ser YYYY-MM-DD');
    }
  };

  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-100 focus:border-blue-500 focus:outline-none focus:ring-2 border-gray-300"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;