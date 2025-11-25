import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';
import { registerSchema } from '../../validations/validationSchema';

// Component Input ย่อย (Clean Code: ใช้ซ้ำได้)
const FormInput = ({ label, name, register, error, type = "text", placeholder, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`w-full p-2.5 rounded-lg border ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'} focus:border-blue-500 focus:outline-none transition-all`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur"
  });

  const resumeFile = watch('resume');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      toast.success("บันทึกข้อมูลสำเร็จ!");
      reset();
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0b2545] flex justify-center py-10 px-4 ">

     {/* Scrollable Wrapper */}
      <div className="w-full h-full overflow-y-auto py-10 px-4">
        <div className="flex justify-center min-h-full items-start">

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full  max-w-3xl rounded-xl shadow-xl p-8 space-y-6">

        {/* ปุ่มย้อนกลับ (Back Button) */}
        <div className="mb-4">
                <button 
                    type="button"  // <--- สำคัญมาก! ต้องใส่ type="button" เพื่อไม่ให้มันไป Validate ฟอร์ม
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#0b2545] transition-colors font-medium text-sm"
                >
                    <ArrowLeft size={20} />
                    <span>ย้อนกลับ</span>
                </button>
            </div>
            
        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">แบบฟอร์มสมัครงาน</h1>
          <p className="text-gray-500 text-sm">กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง</p>
        </div>


        {/* 3. แก้ไข Upload: เปลี่ยน div เป็น label เพื่อให้กดแล้วเด้งหน้าต่างเลือกไฟล์ */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
             อัปโหลดไฟล์เรซูเม่ <span className="text-red-500">*</span>
          </label>
          <label 
            className={`border-2 border-dashed rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer transition relative
            ${errors.resume ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
          >
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            {/* แสดงชื่อไฟล์ถ้ามีการเลือกแล้ว */}
            {resumeFile && resumeFile.length > 0 ? (
                <p className="text-blue-600 font-semibold">{resumeFile[0].name}</p>
            ) : (
                <>
                    <p className="text-sm text-gray-600 font-medium">คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวางที่นี่</p>
                    <p className="text-xs text-gray-400 mt-1">รองรับไฟล์ PDF, DOC, DOCX (ขนาดไม่เกิน 10MB)</p>
                </>
            )}

            {/* Input ถูกซ่อนไว้ แต่ทำงานเมื่อกด Label */}
            <input 
                type="file" 
                className="hidden" 
                accept=".pdf,.doc,.docx,.jpg,.png"
                {...register('resume')} 
            />
          </label>
          {errors.resume && <p className="text-red-500 text-xs">{errors.resume.message}</p>}
        </div>


        {/* --- ข้อมูลส่วนตัว (Refactor ใช้ FormInput) --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลส่วนตัว</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="ชื่อ" name="firstName" register={register} error={errors.firstName} placeholder="ระบุชื่อจริง" required />
            <FormInput label="นามสกุล" name="lastName" register={register} error={errors.lastName} placeholder="ระบุนามสกุล" required />
          </div>
          <FormInput label="เลขบัตรประชาชน" name="idCard" register={register} error={errors.idCard} placeholder="x-xxxx-xxxxx-xx-x" required />
          
          {/* Radio Button (ต้องเขียนแยกเพราะโครงสร้างต่างจาก Input ปกติ) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">เพศ <span className="text-red-500">*</span></label>
            <div className="flex gap-6">
               {['male', 'female', 'other'].map((g) => (
                  <label key={g} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" value={g} {...register("gender")} className="text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-600">{g === 'male' ? 'ชาย' : g === 'female' ? 'หญิง' : 'อื่นๆ'}</span>
                  </label>
               ))}
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
               <FormInput label="วัน/เดือน/ปีเกิด" name="birthDate" type="date" register={register} error={errors.birthDate} required />
            </div>
            <div>
               {/* หมายเหตุ: ปกติอายุควรคำนวณจากวันเกิด แต่ถ้าอยากให้กรอกเองก็ได้ครับ */}
               <FormInput label="อายุ" name="age" type="number" register={register} error={errors.age} placeholder="ระบุอายุ" required />
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* --- ข้อมูลติดต่อ --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลติดต่อ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="เบอร์ติดต่อ" name="phone" register={register} error={errors.phone} placeholder="0xx-xxx-xxxx" required />
            <FormInput label="อีเมล" name="email" type="email" register={register} error={errors.email} placeholder="example@email.com" required />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* --- ข้อมูลที่อยู่ --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลที่อยู่ ที่ติดต่อได้</h2>
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทที่อยู่อาศัย <span className="text-red-500">*</span></label>
             <select {...register("addressType")} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-200 outline-none">
                <option value="">เลือกประเภทที่อยู่อาศัย</option>
                <option value="house">บ้านเดี่ยว</option>
                <option value="condo">คอนโดมิเนียม</option>
                <option value="townhome">ทาวน์โฮม</option>
             </select>
          </div>

          <FormInput label="ที่อยู่ (บ้านเลขที่, หมู่, ซอย, ถนน)" name="address" register={register} error={errors.address} placeholder="ระบุที่อยู่ให้ชัดเจน" required />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormInput label="ตำบล/แขวง" name="subdistrict" register={register} error={errors.subdistrict} required />
             <FormInput label="อำเภอ/เขต" name="district" register={register} error={errors.district} required />
             <FormInput label="จังหวัด" name="province" register={register} error={errors.province} required />
             <FormInput label="รหัสไปรษณีย์" name="zipcode" register={register} error={errors.zipcode} required />
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* --- ข้อมูลเงินเดือน --- */}
        <div>
           <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลเงินเดือน</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormInput label="เงินเดือนปัจจุบัน" name="currentSalary" register={register} placeholder="ระบุเงินเดือนปัจจุบัน (ถ้ามี)" />
             <FormInput label="เงินเดือนที่ต้องการ" name="expectedSalary" register={register} error={errors.expectedSalary} placeholder="ระบุเงินเดือนที่ต้องการ" required />
           </div>
           
           <div className="mt-4">
              <FormInput label="ตำแหน่งที่สมัคร" name="position" register={register} error={errors.position} placeholder="เช่น Web Developer" required />
           </div>
        </div>

        {/* --- ทักษะ --- */}
        <div>
           <h2 className="text-lg font-bold text-gray-800 mb-4">ทักษะและความสามารถ</h2>
           <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ทักษะความรู้</label>
              <textarea 
                {...register("skills")}
                rows="4" 
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="พิมพ์ทักษะของคุณที่นี่..."
              ></textarea>
           </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 pb-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งใบสมัคร'}
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};
export default RegisterForm;