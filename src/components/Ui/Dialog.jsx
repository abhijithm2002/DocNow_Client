import React, { useState } from 'react';
import { Button } from './Button';

 function Dialog({ children, isOpen, onClose }) {
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        {children}
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  ) : null;
}


export default Dialog