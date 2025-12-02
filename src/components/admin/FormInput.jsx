import React from 'react';

const FormInput = ({ label, type = "text", placeholder, value, onChange, required = false, name }) => (
  <div className="mb-5">
    <label className="block mb-2 text-[#072c4d] font-medium text-base">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-[#637996] rounded-lg font-kanit text-base text-[#072c4d] focus:outline-none focus:border-[#f2b724]"
    />
  </div>
);

export default FormInput;