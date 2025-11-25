import * as z from 'zod';

// ==========================================
// 1. Defind Constants & Regex Patterns
// ==========================================
// ตั้งชื่อตัวแปรให้ชัดเจน (ใช้ PascalCase หรือ UPPER_CASE เพื่อบ่งบอกว่าเป็นค่าคงที่)
const ONLY_NUMBER_REGEX = /^[0-9]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const ZIPCODE_REGEX = /^[0-9]{5}$/;

// ข้อความ Error (แยกออกมาก็ได้ถ้าอยากให้แก้คำพูดง่ายๆ ในอนาคต)
const ERRORS = {
  REQUIRED: "กรุณากรอกข้อมูล",
  EMAIL_INVALID: "รูปแบบอีเมลไม่ถูกต้อง",
  PHONE_INVALID: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
  IDCARD_INVALID: "เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น",
  ZIPCODE_INVALID: "รหัสไปรษณีย์ต้องมี 5 หลัก",
  NUMBER_ONLY: "กรุณากรอกตัวเลขเท่านั้น"
};

// ==========================================
// 2. Schema Definition
// ==========================================
export const registerSchema = z.object({
  // --- ข้อมูลส่วนตัว ---
  firstName: z.string().min(4, "กรุณากรอกชื่อจริง (อย่างน้อย 4 ตัวอักษร)"),
  lastName: z.string().min(4, "กรุณากรอกนามสกุล"),
  
  idCard: z.string()
    .length(13, "เลขบัตรประชาชนต้องมี 13 หลัก")
    .regex(ONLY_NUMBER_REGEX, ERRORS.IDCARD_INVALID), // เรียกใช้ตัวแปร Regex
    
  birthDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', "กรุณาระบุวันเกิด"),
  age: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z.number({ invalid_type_error: ERRORS.NUMBER_ONLY }).min(1, "กรุณาระบุอายุที่ถูกต้อง")),
  gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "กรุณาระบุเพศ" }) }),

  // --- ข้อมูลติดต่อ ---
  phone: z.string().regex(PHONE_REGEX, ERRORS.PHONE_INVALID), // เรียกใช้ตัวแปร Regex
  email: z.string().email(ERRORS.EMAIL_INVALID),

  // --- ที่อยู่ ---
  address: z.string().min(5, "กรุณากรอกที่อยู่ให้ครบถ้วน"),
  subdistrict: z.string().min(2, "ระบุตำบล/แขวง"),
  district: z.string().min(2, "ระบุอำเภอ/เขต"),
  province: z.string().min(2, "ระบุจังหวัด"),
  zipcode: z.string().regex(ZIPCODE_REGEX, ERRORS.ZIPCODE_INVALID), // เรียกใช้ตัวแปร Regex

  // --- ข้อมูลงาน ---
  position: z.string().min(4, "กรุณาระบุตำแหน่งที่ต้องการสมัคร"),
  
  // แปลงค่า input ที่ได้มาให้เป็น number ก่อน validate
  expectedSalary: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z.number({ invalid_type_error: ERRORS.NUMBER_ONLY }).min(1, "ระบุเงินเดือนที่คาดหวัง")
  ),


  // --- ไฟล์แนบ (Resume) ---
  resume: z
    .any()
    .refine((files) => files?.length === 1, "กรุณาอัปโหลดไฟล์ Resume (PDF/JPG)")
});


// ==========================================
// 3. Admin Registration Schema
// ==========================================
export const adminRegisterSchema = z.object({
  firstName: z.string().min(4, "กรุณากรอกชื่อจริง (อย่างน้อย 4 ตัวอักษร)"),
  lastName: z.string().min(4, "กรุณากรอกนามสกุล"),
  
  email: z.string().email(ERRORS.EMAIL_INVALID),
  
  phone: z.string().regex(PHONE_REGEX, "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"),
  
  // Dropdown Role: บังคับเลือกแค่ 2 ค่านี้เท่านั้น
  role: z.enum(["admin", "super_admin"], { 
    errorMap: () => ({ message: "กรุณาเลือกบทบาท (Role)" }) 
  }),
});