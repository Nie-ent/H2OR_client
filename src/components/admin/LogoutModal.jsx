//src/components/admin/LogoutModal.jsx

import { AlertTriangle } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 animate-slide-up">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">ยืนยันการออกจากระบบ</h3>
          <p className="text-gray-500 mb-6">คุณต้องการออกจากระบบหรือไม่ ?</p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;