import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  UserPlus,
  Save,
  Shield,
  User,
  Phone,
  Mail,
  Lock,
  Key,
  Fingerprint,
} from "lucide-react";

import { adminRegisterSchema } from "../../validations/validationSchema";

// สร้าง Component Input ย่อยในนี้เพื่อความสะดวก (Reusable)
const FormInput = ({
  label,
  name,
  type = "text",
  register,
  error,
  icon: Icon,
  placeholder,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-2.5 text-gray-400" size={18} />
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full p-2.5 rounded-lg border ${Icon ? "pl-10" : ""} ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200"
        } focus:border-blue-500 focus:outline-none transition-all`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const RegisterAdminPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
    reset,
  } = useForm({
    resolver: zodResolver(adminRegisterSchema),
    mode: "onBlur",
  });

  // --- 3. ใช้ useEffect แทน onError ---
  useEffect(() => {
    // ทำงานเฉพาะเมื่อมีการกด Submit (submitCount > 0) และมี Error เกิดขึ้น
    if (submitCount > 0 && Object.keys(errors).length > 0) {
        
        // กรณี: ยืนยันรหัสผ่านไม่ตรง
        if (errors.confirmPassword) {
            toast.error(errors.confirmPassword.message);
        }
        // กรณี: ไม่ได้เลือก Role
        if (errors.role) {
            toast.error(errors.role.message);
        }
        // ข้อมูลส่วนตัว (Personal Details)
        const personalFields = ['firstName', 'lastName', 'email', 'phone'];
        personalFields.forEach((field) => {
            if (errors[field]) {
                toast.error(errors[field].message);
            }
        });
        
        // (Optional) Username/Password
        if (errors.username) toast.error(errors.username.message);
        if (errors.password) toast.error(errors.password.message);
    }
  }, [submitCount, errors]); // Dependencies: ทำงานเมื่อกดปุ่ม Submit

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...payload } = data;
      console.log("Payload to API:", payload);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(`สร้างบัญชี ${data.username} สำเร็จ!`);
      reset(); // ล้างฟอร์มเมื่อเสร็จ
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการสร้างบัญชี");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header */}

      <div className="mb-6 flex items-center gap-3 border-b pb-4 border-gray-200">
        <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
          <UserPlus size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            สร้างบัญชีผู้ดูแล (Create Admin)
          </h1>
          <p className="text-gray-500 text-sm">
            เพิ่มบัญชีใหม่และกำหนดสิทธิ์การเข้าถึงระบบ
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6"
      >
        {/* --- ส่วนที่ 1: ข้อมูลบัญชี (Account Details) --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-yellow-500" /> ข้อมูลบัญชี
            (Account)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="md:col-span-2">
              <FormInput
                label="ชื่อผู้ใช้ (Username)"
                name="username"
                register={register}
                error={errors.username}
                icon={Fingerprint}
                placeholder="เช่น admin_hr01"
              />
            </div>

            {/* Password */}
            <FormInput
              label="รหัสผ่าน (Password)"
              name="password"
              type="password"
              register={register}
              error={errors.password}
              icon={Lock}
              placeholder="******"
            />

            {/* Confirm Password */}
            <FormInput
              label="ยืนยันรหัสผ่าน (Confirm Password)"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
              icon={Key}
              placeholder="******"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* --- ส่วนที่ 2: ข้อมูลส่วนตัว (Personal Details) --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-500" /> ข้อมูลส่วนตัว
            (Personal)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="ชื่อจริง"
              name="firstName"
              register={register}
              error={errors.firstName}
              icon={User}
              placeholder="ระบุชื่อจริง"
            />
            <FormInput
              label="นามสกุล"
              name="lastName"
              register={register}
              error={errors.lastName}
              placeholder="ระบุนามสกุล"
            />
            <FormInput
              label="อีเมล"
              name="email"
              type="email"
              register={register}
              error={errors.email}
              icon={Mail}
              placeholder="admin@h2or.com"
            />
            <FormInput
              label="เบอร์โทรศัพท์"
              name="phone"
              register={register}
              error={errors.phone}
              icon={Phone}
              placeholder="0xx-xxx-xxxx"
            />
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* --- ส่วนที่ 3: บทบาท (Role) --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            กำหนดบทบาท (Role) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("role")}
              className={`w-full p-2.5 rounded-lg border bg-white ${
                errors.role ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-200 outline-none cursor-pointer`}
            >
              <option value="">-- กรุณาเลือกบทบาท --</option>
              <option value="admin">Admin (ผู้ดูแลทั่วไป)</option>
              <option value="super_admin">
                Super Admin (ผู้ดูแลระบบสูงสุด)
              </option>
            </select>
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-navy hover:bg-[#1a3b61] text-white font-bold py-3 px-8 rounded-lg shadow transition disabled:opacity-50"
          >
            {isSubmitting ? (
              "กำลังบันทึก..."
            ) : (
              <>
                <Save size={18} /> สร้างบัญชี
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterAdminPage;
