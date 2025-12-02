import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#072c4d]/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl w-full max-w-xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-[#072c4d]">{title}</h3>
          <button onClick={onClose} className="text-2xl text-[#637996] hover:text-[#072c4d]">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;