import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import axiosInstance from '../../configs/axiosAdmin.js';

// Import Schema
import { loginSchema, forgotPasswordSchema } from '../../validations/validationSchema';



const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. Login Form Config ---
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin }, 
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // <--- หัวใจสำคัญ: ตรวจสอบทันทีเมื่อคลิกออก (Blur)
  });

  // --- 2. Forgot Password Config ---
  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    reset: resetForgot
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur", // <--- หัวใจสำคัญ
  });

  // (Optional) ถ้ายังอยากให้ Toast เด้งด้วย ก็เก็บ useEffect ไว้
  // ถ้าไม่อยากได้ Toast ตอน onBlur ให้ลบ useEffect นี้ออกได้เลยครับ
  useEffect(() => {
    if (errorsLogin.username) toast.error(errorsLogin.username.message, { toastId: 'usr-err' });
    if (errorsLogin.password) toast.error(errorsLogin.password.message, { toastId: 'pwd-err' });
  }, [errorsLogin]);

  const onLoginSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    const res = await axiosInstance.post("/admin/login", data);
    toast.success("เข้าสู่ระบบสำเร็จ!");
    navigate("/admin");
  } catch (error) {
    toast.error(error.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
  } finally {
    setIsSubmitting(false);
  }
};


 const onForgotSubmit = async (data) => {
  try {
    await axiosInstance.post("/admin/forgot-password", data);
    toast.success("ส่งลิงก์รีเซ็ตแล้ว");
    setView("login");
    resetForgot();
  } catch (error) {
    toast.error(error.response?.data?.message || "ไม่สามารถส่งลิงก์รีเซ็ตได้");
  }
};


  return (
    <div className="min-h-screen w-full bg-navy flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-50 p-6 text-center border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#0b2545] mb-4 shadow-inner">
             {view === 'login' ? <ShieldCheck size={32} /> : <Lock size={32} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {view === 'login' ? 'Admin Portal' : 'ลืมรหัสผ่าน?'}
          </h1>
        </div>

        <div className="p-8">
            {/* ---------------- VIEW: LOGIN ---------------- */}
            {view === 'login' && (
              <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-6">
                
                {/* --- Username Input --- */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อผู้ใช้ (Username)</label>
                  <div className="relative">
                    <User className={`absolute left-3 top-3 ${errorsLogin.username ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                    <input 
                      type="text" 
                      {...registerLogin('username')}
                      placeholder="Enter username"
                      // เปลี่ยนสีกรอบเป็นสีแดงเมื่อมี Error
                      className={`w-full pl-10 p-3 rounded-lg border ${
                        errorsLogin.username 
                          ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                          : 'border-gray-300 focus:ring-blue-200'
                      } outline-none transition`}
                    />
                  </div>
                  {/* แสดงข้อความ Error ใต้ Input */}
                  {errorsLogin.username && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                        <AlertCircle size={12} />
                        <span>{errorsLogin.username.message}</span>
                    </div>
                  )}
                </div>

                {/* --- Password Input --- */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">รหัสผ่าน (Password)</label>
                    <button type="button" onClick={() => setView('forgot')} className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                        ลืมรหัสผ่าน?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-3 ${errorsLogin.password ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                    <input 
                      type="password" 
                      {...registerLogin('password')}
                      placeholder="Enter password"
                      // เปลี่ยนสีกรอบเป็นสีแดงเมื่อมี Error
                      className={`w-full pl-10 p-3 rounded-lg border ${
                        errorsLogin.password 
                          ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                          : 'border-gray-300 focus:ring-blue-200'
                      } outline-none transition`}
                    />
                  </div>
                  {/* แสดงข้อความ Error ใต้ Input */}
                  {errorsLogin.password && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                        <AlertCircle size={12} />
                        <span>{errorsLogin.password.message}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-navy hover:bg-[#1a3b61] text-white font-bold py-3 rounded-lg shadow-lg transition disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Checking...' : <>เข้าสู่ระบบ <ArrowRight size={20}/></>}
                </button>
                
                <div className="pt-4 border-t border-gray-100 text-center">
                    <Link to="/super-admin/login" className="text-sm text-gray-500 hover:text-[#0b2545] font-medium transition flex items-center justify-center gap-1">
                        <ShieldCheck size={16}/> เข้าสู่ระบบสำหรับ Super Admin
                    </Link>
                </div>
              </form>
            )}

            {/* ---------------- VIEW: FORGOT PASSWORD ---------------- */}
            {view === 'forgot' && (
               <form onSubmit={handleSubmitForgot(onForgotSubmit)} className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล (Email)</label>
                    <div className="relative">
                        <Mail className={`absolute left-3 top-3 ${errorsForgot.email ? 'text-red-500' : 'text-gray-400'}`} size={20} />
                        <input 
                            type="email" 
                            {...registerForgot('email')}
                            placeholder="admin@example.com"
                            className={`w-full pl-10 p-3 rounded-lg border ${
                                errorsForgot.email 
                                ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                                : 'border-gray-300 focus:ring-blue-200'
                            } outline-none transition`}
                        />
                    </div>
                    {/* Error Message */}
                    {errorsForgot.email && (
                        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                            <AlertCircle size={12} />
                            <span>{errorsForgot.email.message}</span>
                        </div>
                    )}
                 </div>
                 {/* ... Buttons ... */}
                 <Link to="/admin/forgotpassword"><button type="submit" className="w-full bg-navy hover:bg-[#1a3b61] text-white font-bold py-3 rounded-lg shadow">ส่งลิงก์รีเซ็ต</button></Link>
                 <Link to="/admin/login"><button type="button" onClick={() => setView('login')} className="w-full text-gray-500 text-sm mt-2">กลับไปหน้าเข้าสู่ระบบ</button></Link>
               </form>
            )}
            
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;