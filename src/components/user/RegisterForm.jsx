// src/components/user/RegisterForm.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, FileText, X } from "lucide-react";
import { registerSchema } from "../../validations/validationSchema";


// --- 1. Reusable UI Components (ควรแยกไฟล์ไปไว้ใน src/components/ui/forms/...) ---

const Label = ({ children, required }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const ErrorMessage = ({ error }) =>
  error ? <p className="text-red-500 text-xs mt-1">{error.message}</p> : null;

const FormInput = ({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  required,
}) => (
  <div className="w-full">
    <Label required={required}>{label}</Label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`w-full p-2.5 rounded-lg border ${
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:ring-blue-200"
      } focus:border-blue-500 focus:outline-none transition-all`}
    />
    <ErrorMessage error={error} />
  </div>
);

const FormSelect = ({
  label,
  name,
  register,
  error,
  options,
  placeholder,
  required,
}) => (
  <div className="w-full">
    <Label required={required}>{label}</Label>
    <select
      {...register(name)}
      className={`w-full p-2.5 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } focus:ring-2 focus:ring-blue-200 outline-none bg-white`}
    >
      <option value="">{placeholder || "กรุณาเลือก"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <ErrorMessage error={error} />
  </div>
);

const FormTextarea = ({
  label,
  name,
  register,
  error,
  placeholder,
  rows = 4,
}) => (
  <div className="w-full">
    <Label>{label}</Label>
    <textarea
      {...register(name)}
      rows={rows}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none resize-none"
    ></textarea>
    <ErrorMessage error={error} />
  </div>
);

const FormFileUpload = ({ label, name, register, error, watch, required }) => {
  const file = watch(name);
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <label
        className={`border-2 border-dashed rounded-lg h-40 flex flex-col justify-center items-center cursor-pointer transition relative
        ${
          error
            ? "border-red-500 bg-red-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <div className="text-gray-400 mb-2">
          <Upload size={40} className="mx-auto" />
        </div>

        {file && file.length > 0 ? (
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <FileText size={16} />
            <span className="font-semibold text-sm truncate max-w-[200px]">
              {file[0].name}
            </span>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 font-medium">
              คลิกเพื่อเลือกไฟล์เรซูเม่
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOCX (Max 10MB)</p>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          {...register(name)}
        />
      </label>
      <ErrorMessage error={error} />
    </div>
  );
};

// --- 2. Main Component ---

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with Axios call
      // const formData = new FormData();
      // Object.keys(data).forEach(key => formData.append(key, data[key]));
      // await axios.post('/api/apply', formData);

      console.log("Submitting:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock API
      toast.success("ส่งใบสมัครเรียบร้อยแล้ว!");
      reset();
      navigate("/"); // Redirect after success
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 1. Parent: ยึดเต็มหน้าจอ และล็อคไม่ให้ Body เลื่อน (สีพื้นหลังอยู่ที่นี่)
    <div className="h-screen w-screen bg-navy overflow-hidden flex justify-center relative">

      {/* Layer 2: Scrollable Wrapper */}
      <div className="w-full h-full overflow-y-auto py-10 px-4">
        <div className="flex justify-center min-h-full items-start">

          {/* 3. Centering Wrapper: จัดกึ่งกลาง และกำหนด Padding */}
          {/* <div className="min-h-full flex justify-center items-center py-10 px-4"> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-8 space-y-8 animate-fade-in-up"
            >
              {/* Header Section */}
              <div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#0b2545] transition-colors font-medium text-sm mb-4"
                >
                  <ArrowLeft size={18} />
                  <span>ย้อนกลับ</span>
                </button>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">
                    แบบฟอร์มสมัครงาน
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    กรุณากรอกข้อมูลให้ครบถ้วนเพื่อการพิจารณา
                  </p>
                </div>
              </div>

              {/* Section 1: Resume Upload */}
              <FormFileUpload
                label="อัปโหลดไฟล์เรซูเม่"
                name="resume"
                register={register}
                watch={watch}
                error={errors.resume}
                required
              />

              <hr className="border-gray-100" />

              {/* Section 2: Personal Info */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  ข้อมูลส่วนตัว
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="ชื่อ"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                    required
                  />
                  <FormInput
                    label="นามสกุล"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                    required
                  />
                </div>
                <FormInput
                  label="เลขบัตรประชาชน"
                  name="idCard"
                  register={register}
                  error={errors.idCard}
                  placeholder="x-xxxx-xxxxx-xx-x"
                  required
                />

                <div className="space-y-2">
                  <Label required>เพศ</Label>
                  <div className="flex gap-6">
                    {[
                      { label: "ชาย", value: "male" },
                      { label: "หญิง", value: "female" },
                      { label: "ไม่ระบุ", value: "other" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-2 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register("gender")}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <ErrorMessage error={errors.gender} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <FormInput
                      label="วันเกิด"
                      name="birthDate"
                      type="date"
                      register={register}
                      error={errors.birthDate}
                      required
                    />
                  </div>
                  <FormInput
                    label="อายุ"
                    name="age"
                    type="number"
                    register={register}
                    error={errors.age}
                    required
                  />
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Section 3: Contact & Address */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800">
                  ข้อมูลการติดต่อ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="เบอร์โทรศัพท์"
                    name="phone"
                    register={register}
                    error={errors.phone}
                    required
                  />
                  <FormInput
                    label="อีเมล"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                    required
                  />
                </div>

                <FormSelect
                  label="ประเภทที่อยู่อาศัย"
                  name="addressType"
                  register={register}
                  error={errors.addressType}
                  required
                  options={[
                    { label: "บ้านเดี่ยว", value: "house" },
                    { label: "คอนโดมิเนียม", value: "condo" },
                    { label: "ทาวน์โฮม", value: "townhome" },
                    { label: "หอพัก/อพาร์ทเม้นท์", value: "apartment" },
                  ]}
                />

                <FormInput
                  label="ที่อยู่ปัจจุบัน"
                  name="address"
                  register={register}
                  error={errors.address}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="ตำบล/แขวง"
                    name="subdistrict"
                    register={register}
                    error={errors.subdistrict}
                    required
                  />
                  <FormInput
                    label="อำเภอ/เขต"
                    name="district"
                    register={register}
                    error={errors.district}
                    required
                  />
                  <FormInput
                    label="จังหวัด"
                    name="province"
                    register={register}
                    error={errors.province}
                    required
                  />
                  <FormInput
                    label="รหัสไปรษณีย์"
                    name="zipcode"
                    register={register}
                    error={errors.zipcode}
                    required
                  />
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* Section 4: Work & Skills */}
              <section className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800">
                  ข้อมูลการทำงาน
                </h2>
                <FormInput
                  label="ตำแหน่งที่สมัคร"
                  name="position"
                  register={register}
                  error={errors.position}
                  placeholder="เช่น Full Stack Developer"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="เงินเดือนปัจจุบัน"
                    name="currentSalary"
                    type="number"
                    register={register}
                    error={errors.currentSalary}
                  />
                  <FormInput
                    label="เงินเดือนที่ต้องการ"
                    name="expectedSalary"
                    type="number"
                    register={register}
                    error={errors.expectedSalary}
                    required
                  />
                </div>

                <FormTextarea
                  label="ทักษะและความสามารถพิเศษ"
                  name="skills"
                  register={register}
                  placeholder="HTML, CSS, React, Node.js..."
                />
              </section>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#fca311] hover:bg-[#e8960f] text-white font-bold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isSubmitting && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting ? "กำลังส่งข้อมูล..." : "ยืนยันการสมัครงาน"}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
