import * as z from "zod";

// ==========================================
// 1. Defind Constants & Regex Patterns
// ==========================================
// ตั้งชื่อตัวแปรให้ชัดเจน (ใช้ PascalCase หรือ UPPER_CASE เพื่อบ่งบอกว่าเป็นค่าคงที่)
const ONLY_NUMBER_REGEX = /^[0-9]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const ZIPCODE_REGEX = /^[0-9]{5}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

// ข้อความ Error (แยกออกมาก็ได้ถ้าอยากให้แก้คำพูดง่ายๆ ในอนาคต)
const ERRORS = {
  REQUIRED: "กรุณากรอกข้อมูล",
  NUMBER_ONLY: "กรุณากรอกตัวเลขเท่านั้น",

  // Username Errors
  USERNAME_MIN: "Username ต้องมีอย่างน้อย 4 ตัวอักษร",
  USERNAME_INVALID:
    "Username ต้องเป็นภาษาอังกฤษ (a-z), ตัวเลข (0-9) หรือ _ เท่านั้น",

  // Password Errors
  PASSWORD_MIN: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
  PASSWORD_COMPLEXITY: "รหัสผ่านอย่างน้อย 6 ตัว และมีตัวอักษรและตัวเลขอย่างน้อย 1 ตัว", // ใช้คู่กับ Regex
  PASSWORD_MISMATCH: "รหัสผ่านทั้งสองช่องไม่ตรงกัน",

  // Contact Errors
  EMAIL_INVALID: "รูปแบบอีเมลไม่ถูกต้อง",
  PHONE_INVALID: "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก",
  IDCARD_INVALID: "เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น",
  ZIPCODE_INVALID: "รหัสไปรษณีย์ต้องมี 5 หลัก",

  // Role Error
  ROLE_REQUIRED: "กรุณาเลือกบทบาท (Role)",
};

// ==========================================
// 2. user Schema Definition
// ==========================================
export const registerSchema = z.object({
  // --- ข้อมูลส่วนตัว ---
  firstName: z.string().min(4, "กรุณากรอกชื่อจริง"),
  lastName: z.string().min(4, "กรุณากรอกนามสกุล"),

  idCard: z
    .string()
    .length(13, "เลขบัตรประชาชนต้องมี 13 หลัก")
    .regex(ONLY_NUMBER_REGEX, ERRORS.IDCARD_INVALID), // เรียกใช้ตัวแปร Regex

  birthDate: z
    .string()
    .refine(
      (date) => new Date(date).toString() !== "Invalid Date",
      "กรุณาระบุวันเกิด"
    ),
  age: z.coerce.number({ invalid_type_error: ERRORS.NUMBER_ONLY })
    .min(18, "อายุ 18 ปีบริบูรณ์ขึ้นไปเท่านั้น"
  ),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "กรุณาระบุเพศ" }),
  }),

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
  expectedSalary: z.coerce.number({ invalid_type_error: ERRORS.NUMBER_ONLY })
      .min(10000, "กรุณาระบุเงินเดือนที่คาดหวัง"
  ),

  // --- ไฟล์แนบ (Resume) ---
  resume: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "กรุณาอัปโหลดไฟล์ Resume (PDF/JPG)"
    ),
});

// ==========================================
// 3. Admin Registration Schema
// ==========================================
export const adminRegisterSchema = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(4, ERRORS.USERNAME_MIN)
      .regex(USERNAME_REGEX, ERRORS.USERNAME_INVALID),

    password: z
    .string()
    .min(6, ERRORS.PASSWORD_MIN)
    .regex(PASSWORD_REGEX, ERRORS.PASSWORD_COMPLEXITY), 

    confirmPassword: z.string(),

    firstName: z.string().min(4, "กรุณากรอกชื่อจริง"),
    lastName: z.string().min(4, "กรุณากรอกนามสกุล"),
  
    email: z.string().email(ERRORS.EMAIL_INVALID),
  
    phone: z.string().regex(PHONE_REGEX, ERRORS.PHONE_INVALID), // เรียกใช้ตัวแปร Regex
  
    role: z.enum(["admin", "super_admin"], {
    errorMap: () => ({ message: ERRORS.ROLE_REQUIRED }),
  }),

})
.refine((data) => data.password === data.confirmPassword, {
    message: ERRORS.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });

// ==========================================
// 4. Admin Login Schema (แก้ไขตามรีเควส)
// ==========================================
export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "กรุณากรอกชื่อผู้ใช้")
    .regex(USERNAME_REGEX, ERRORS.USERNAME_INVALID), // 1. ตรวจ Regex Username

  password: z
    .string()
    .min(6, "กรุณากรอกรหัสผ่าน")
    .regex(PASSWORD_REGEX, ERRORS.PASSWORD_COMPLEXITY), // 2. ตรวจ Regex Password
});

// ==========================================
// 5. Super Admin Login Schema (สร้างใหม่แยกต่างหาก)
// ==========================================
export const superAdminLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, "กรุณากรอกชื่อผู้ใช้ Super Admin")
    .regex(USERNAME_REGEX, ERRORS.USERNAME_INVALID),

  password: z
    .string()
    .min(6, "กรุณากรอกรหัสผ่าน Super Admin")
    .regex(PASSWORD_REGEX, ERRORS.PASSWORD_COMPLEXITY),
    
  // อนาคตอาจเพิ่ม Security Key หรือ 2FA สำหรับ Super Admin ตรงนี้ได้
  // securityKey: z.string().min(1, "กรุณากรอก Security Key"),
});

// ==========================================
// 6. Forgot Password Schema
// ==========================================
export const forgotPasswordSchema = z.object({
  email: z.string().email(ERRORS.EMAIL_INVALID),
});
