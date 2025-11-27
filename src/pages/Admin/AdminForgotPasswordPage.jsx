import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { forgotPasswordSchema } from "../../validations/validationSchema";
import { Lock } from "lucide-react";

const AdminForgotPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "example@email.com";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    // MOCK: ยังไม่ต้องยิง API จริง
    console.log("new password:", data.password);
    toast.success("เปลี่ยนรหัสผ่านเรียบร้อย (mock)");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen w-full bg-navy flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header แบบเดียวกับหน้า Login แต่ใช้ข้อความของคุณ */}
        <div className="w-full text-center pt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#0b2545] mb-4 shadow-inner mx-auto">
            <Lock size={32} />
          </div>

          <div className="bg-gray-50 p-6 text-center border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">
              ตั้งรหัสผ่านใหม่
            </h1>
            <p className="text-xs text-gray-500 mt-1">สำหรับ: {email}</p>
          </div>
        </div>

        {/* เนื้อหาเดิม ย้ายมาไว้ใน content block */}
        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รหัสผ่านใหม่
              </label>

              <div className="relative">
                <Lock
                  className={`absolute left-3 top-3 ${
                    errors.password ? "text-red-500" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="กรอกรหัสผ่านใหม่"
                  className={`w-full pl-10 p-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200 bg-red-50"
                      : "border-gray-300 focus:ring-blue-200"
                  } outline-none transition`}
                />
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ยืนยันรหัสผ่านใหม่
              </label>

              <div className="relative">
                <Lock
                  className={`absolute left-3 top-3 ${
                    errors.confirmPassword ? "text-red-500" : "text-gray-400"
                  }`}
                  size={20}
                />
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                  className={`w-full pl-10 p-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-200 bg-red-50"
                      : "border-gray-300 focus:ring-blue-200"
                  } outline-none transition`}
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-navy hover:bg-[#1a3b61] text-white font-semibold py-3 rounded-lg"
            >
              ยืนยันเปลี่ยนรหัสผ่าน
            </button>
          </form>

          <div className="text-center text-xs mt-4">
            <Link
              to="/admin/login"
              className="w-full text-gray-500 text-sm mt-2"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPasswordPage;
