import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
      <button 
        onClick={onClose} 
        className="float-right text-gray-600 hover:text-gray-900"
      >
        <X size={24} />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;