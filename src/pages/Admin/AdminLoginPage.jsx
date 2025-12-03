// src/pages/Admin/AdminLoginPage.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  Mail,
  AlertCircle,
  Loader2,
} from "lucide-react";

import axiosInstance from "../../configs/axiosConfig";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  loginSchema,
  forgotPasswordSchema,
} from "../../validations/validationSchema";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("login"); // 'login' หรือ 'forgot'

  // ✅ เรียก Action จาก Zustand Store
  const loginAction = useAuthStore((state) => state.login);

  // --------------------------------------------------------
  // 1️⃣ Login Form Configuration
  // --------------------------------------------------------
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isLoginSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // --- 2. Forgot Password Config ---
  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot, isSubmitting: isForgotSubmitting },
    reset: resetForgot,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  // ✅ 3. Login Handler (Clean & Modern)
  const onLoginSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/login", data);

      // 🔍 Debug: ดูโครงสร้างข้อมูลจริงใน Console (สำคัญมาก!)

      // 2. ✅ แก้ไข: เจาะเข้าไปเอาข้อมูลให้ถูกชั้น (res.data.data)
      const responseData = res.data.data || res.data; // กันเหนียวเผื่อโครงสร้างเปลี่ยน
      const user = responseData.user;
      const token = responseData.token;
      const role = responseData.user.role

        localStorage.setItem("token", token)
        localStorage.setItem("role", role)
      if (!user || !token) {
        throw new Error("ไม่พบข้อมูลผู้ใช้งาน หรือ Token");
      }

      // บันทึกลง Store

      toast.success("เข้าสู่ระบบสำเร็จ!");

      // เช็ค Role เพื่อ redirect (Optional)
      if (role === "super_admin") {
        navigate("/admin/users");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      toast.error(msg);
    }
  };

  // ✅ 4. Forgot Password Handler
  const onForgotSubmit = async (data) => {
    try {
      await axiosInstance.post("/admin/forgot-password", data);
      toast.success("ส่งลิงก์รีเซ็ตไปยังอีเมลแล้ว");
      setView("login");
      resetForgot();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "ไม่สามารถส่งลิงก์รีเซ็ตได้"
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-navy flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 text-center border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#0b2545] mb-4 shadow-inner">
            {view === "login" ? <ShieldCheck size={32} /> : <Lock size={32} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {view === "login" ? "Admin Portal" : "ลืมรหัสผ่าน?"}
          </h1>
        </div>

        <div className="p-8">
          {/* ---------------- VIEW: LOGIN ---------------- */}
          {view === "login" && (
            <form
              onSubmit={handleSubmitLogin(onLoginSubmit)}
              className="space-y-6"
            >
              {/* --- Username Input --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อผู้ใช้ (Username)
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-3 ${
                      errorsLogin.username ? "text-red-500" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <input
                    type="text"
                    {...registerLogin("username")}
                    placeholder="Enter username"
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      errorsLogin.username
                        ? "border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-300 focus:ring-blue-200"
                    } outline-none transition`}
                  />
                </div>
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
                  <label className="block text-sm font-medium text-gray-700">
                    รหัสผ่าน (Password)
                  </label>
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    ลืมรหัสผ่าน?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-3 ${
                      errorsLogin.password ? "text-red-500" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <input
                    type="password"
                    {...registerLogin("password")}
                    placeholder="Enter password"
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      errorsLogin.password
                        ? "border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-300 focus:ring-blue-200"
                    } outline-none transition`}
                  />
                </div>
                {errorsLogin.password && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                    <AlertCircle size={12} />
                    <span>{errorsLogin.password.message}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoginSubmitting}
                className="w-full bg-navy hover:bg-[#1a3b61] text-white font-bold py-3 rounded-lg shadow-lg transition disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoginSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />{" "}
                    กำลังตรวจสอบ...
                  </>
                ) : (
                  <>
                    เข้าสู่ระบบ <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-100 text-center">
                <Link
                  to="/super-admin/login"
                  className="text-sm text-gray-500 hover:text-navy font-medium transition flex items-center justify-center gap-1"
                >
                  <ShieldCheck size={16} /> เข้าสู่ระบบสำหรับ Super Admin
                </Link>
              </div>
            </form>
          )}

          {/* ---------------- VIEW: FORGOT PASSWORD ---------------- */}
          {view === "forgot" && (
            <form
              onSubmit={handleSubmitForgot(onForgotSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  อีเมล (Email)
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-3 ${
                      errorsForgot.email ? "text-red-500" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <input
                    type="email"
                    {...registerForgot("email")}
                    placeholder="admin@example.com"
                    className={`w-full pl-10 p-3 rounded-lg border ${
                      errorsForgot.email
                        ? "border-red-500 focus:ring-red-200 bg-red-50"
                        : "border-gray-300 focus:ring-blue-200"
                    } outline-none transition`}
                  />
                </div>
                {errorsForgot.email && (
                  <div className="flex items-center gap-1 mt-1 text-red-500 text-xs animate-pulse">
                    <AlertCircle size={12} />
                    <span>{errorsForgot.email.message}</span>
                  </div>
                )}
              </div>

              {/* ปุ่มส่งฟอร์ม (ไม่หุ้ม Link) */}
              <button
                type="submit"
                disabled={isForgotSubmitting}
                className="w-full bg-navy hover:bg-[#1a3b61] text-white font-bold py-3 rounded-lg shadow-lg transition disabled:opacity-70"
              >
                {isForgotSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> กำลังส่ง...
                  </>
                ) : (
                  <>รีเซ็ตรหัสผ่าน</>
                )}
              </button>

              {/* ปุ่มกลับเป็นปุ่มปกติที่เปลี่ยน view */}
              <button
                type="button"
                onClick={() => setView("login")}
                className="w-full text-gray-500 text-sm mt-2"
              >
                กลับไปหน้าเข้าสู่ระบบ
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
