export const questions = [
  {
    id: 1,
    question: "React Hook ใช้สำหรับอะไร?",
    options: [
      { id: "A", label: "จัดการ UI Routing" },
      { id: "B", label: "ใช้ state และ lifecycle ใน Function Component" },
      { id: "C", label: "เขียน CSS" },
      { id: "D", label: "ติดต่อ Database" },
    ],
    correctAnswer: "B",
  },
  {
    id: 2,
    question: "useEffect ถูกเรียกเมื่อใด?",
    options: [
      { id: "A", label: "เฉพาะตอน component ถูกปิด" },
      { id: "B", label: "เมื่อ state หรือ props ที่อยู่ใน dependency เปลี่ยน" },
      { id: "C", label: "ทุกครั้งที่มีการ scroll" },
      { id: "D", label: "ใช้ควบคุม CSS animation" },
    ],
    correctAnswer: "B",
  },
  {
    id: 3,
    question: "ข้อใดคือ HTTP Method ที่ใช้ดึงข้อมูล?",
    options: [
      { id: "A", label: "POST" },
      { id: "B", label: "GET" },
      { id: "C", label: "PUT" },
      { id: "D", label: "DELETE" },
    ],
    correctAnswer: "B",
  },
  {
    id: 4,
    question: "Node.js ใช้รันบนอะไร?",
    options: [
      { id: "A", label: "Web Browser เท่านั้น" },
      { id: "B", label: "Server Side JavaScript Runtime" },
      { id: "C", label: "Mobile App Engine" },
      { id: "D", label: "Database Engine" },
    ],
    correctAnswer: "B",
  },
  {
    id: 5,
    question: "Express.js ใช้สำหรับอะไร?",
    options: [
      { id: "A", label: "สร้าง UI component" },
      { id: "B", label: "สร้างเซิร์ฟเวอร์และ API" },
      { id: "C", label: "เขียน SQL Query" },
      { id: "D", label: "โฮสต์ static file เท่านั้น" },
    ],
    correctAnswer: "B",
  },
  {
    id: 6,
    question: "RESTful API ย่อมาจากอะไร?",
    options: [
      { id: "A", label: "Random Execution Service Tool" },
      { id: "B", label: "Representational State Transfer" },
      { id: "C", label: "Return State Transfer" },
      { id: "D", label: "Remote Service Transaction" },
    ],
    correctAnswer: "B",
  },
  {
    id: 7,
    question: "คำสั่ง npm install ใช้ทำอะไร?",
    options: [
      { id: "A", label: "สร้าง Component ใหม่" },
      { id: "B", label: "เพิ่ม Library เข้าสู่โปรเจกต์" },
      { id: "C", label: "ลบ node_modules" },
      { id: "D", label: "เปิดเซิร์ฟเวอร์" },
    ],
    correctAnswer: "B",
  },
  {
    id: 8,
    question: "MongoDB เป็นฐานข้อมูลประเภทใด?",
    options: [
      { id: "A", label: "Relational Database" },
      { id: "B", label: "Graph Database" },
      { id: "C", label: "Document-based NoSQL" },
      { id: "D", label: "Key-Value Memory DB" },
    ],
    correctAnswer: "C",
  },
  {
    id: 9,
    question: "SQL SELECT * FROM users ทำอะไร?",
    options: [
      { id: "A", label: "ลบ user ทั้งหมด" },
      { id: "B", label: "เพิ่ม user ใหม่" },
      { id: "C", label: "เรียกดูข้อมูล user ทั้งหมด" },
      { id: "D", label: "อัปเดต user" },
    ],
    correctAnswer: "C",
  },
  {
    id: 10,
    question: "JWT ใช้สำหรับอะไร?",
    options: [
      { id: "A", label: "เก็บรูปภาพ" },
      { id: "B", label: "ยืนยันตัวตนและให้สิทธิ์ (Authentication & Authorization)" },
      { id: "C", label: "บันทึก Log" },
      { id: "D", label: "สร้าง UI Theme" },
    ],
    correctAnswer: "B",
  },

  // ----------- FRONTEND + BACKEND + DEVOPS -----------

  {
    id: 11,
    question: "CORS มีไว้เพื่ออะไร?",
    options: [
      { id: "A", label: "เพิ่มประสิทธิภาพ React" },
      { id: "B", label: "ควบคุมนโยบายการเข้าถึง API จากต่างโดเมน" },
      { id: "C", label: "ทำเว็บให้ responsive" },
      { id: "D", label: "เพิ่ม session timeout" },
    ],
    correctAnswer: "B",
  },
  {
    id: 12,
    question: "คำสั่ง git clone ใช้ทำอะไร?",
    options: [
      { id: "A", label: "สร้าง branch ใหม่" },
      { id: "B", label: "คัดลอกโปรเจกต์จาก remote repository" },
      { id: "C", label: "ลบ repository" },
      { id: "D", label: "แก้ conflict" },
    ],
    correctAnswer: "B",
  },
  {
    id: 13,
    question: "Docker ใช้เพื่ออะไร?",
    options: [
      { id: "A", label: "สร้าง UI Component" },
      { id: "B", label: "รันโปรแกรมแบบแยกสภาพแวดล้อม (Container)" },
      { id: "C", label: "เขียน API" },
      { id: "D", label: "Deploy code ไป GitHub" },
    ],
    correctAnswer: "B",
  },
  {
    id: 14,
    question: "Next.js เป็น Framework ของอะไร?",
    options: [
      { id: "A", label: "Vue" },
      { id: "B", label: "React" },
      { id: "C", label: "Angular" },
      { id: "D", label: "Node.js" },
    ],
    correctAnswer: "B",
  },
  {
    id: 15,
    question: "SSR ใน Next.js คืออะไร?",
    options: [
      { id: "A", label: "Render UI ใน Browser" },
      { id: "B", label: "Render UI บน Server" },
      { id: "C", label: "ลบ cache" },
      { id: "D", label: "โหลด CSS ก่อน" },
    ],
    correctAnswer: "B",
  },
  {
    id: 16,
    question: "TypeScript เพิ่มอะไรให้ JavaScript?",
    options: [
      { id: "A", label: "ระบบฐานข้อมูล" },
      { id: "B", label: "Static Typing" },
      { id: "C", label: "Web Hosting" },
      { id: "D", label: "CSS Engine" },
    ],
    correctAnswer: "B",
  },
  {
    id: 17,
    question: "Redux ใช้ทำอะไร?",
    options: [
      { id: "A", label: "สร้าง UI" },
      { id: "B", label: "จัดการ State ในแอปใหญ่ๆ" },
      { id: "C", label: "จัดการ API" },
      { id: "D", label: "จัดรูปแบบ CSS" },
    ],
    correctAnswer: "B",
  },
  {
    id: 18,
    question: "ข้อใดคือ HTTP Status Code ที่แปลว่า Success?",
    options: [
      { id: "A", label: "200" },
      { id: "B", label: "400" },
      { id: "C", label: "404" },
      { id: "D", label: "500" },
    ],
    correctAnswer: "A",
  },
  {
    id: 19,
    question: "Critical Rendering Path เกี่ยวข้องกับอะไร?",
    options: [
      { id: "A", label: "SEO" },
      { id: "B", label: "Performance การโหลดหน้าเว็บ" },
      { id: "C", label: "Database Indexing" },
      { id: "D", label: "Network Routing" },
    ],
    correctAnswer: "B",
  },
  {
    id: 20,
    question: "SQL JOIN ใช้เพื่ออะไร?",
    options: [
      { id: "A", label: "เชื่อมหลาย Table เข้าด้วยกัน" },
      { id: "B", label: "ลบ Table" },
      { id: "C", label: "เพิ่ม User" },
      { id: "D", label: "เพิ่ม Index" },
    ],
    correctAnswer: "A",
  },

  // ------------- ข้อ 21 - 30 ------------------

  {
    id: 21,
    question: "Middleware ใน Express คืออะไร?",
    options: [
      { id: "A", label: "ฟังก์ชันที่รันก่อน controller" },
      { id: "B", label: "CSS compiler" },
      { id: "C", label: "SQL Parser" },
      { id: "D", label: "Dockerfile engine" },
    ],
    correctAnswer: "A",
  },
  {
    id: 22,
    question: "Promise ใช้แก้ปัญหาอะไร?",
    options: [
      { id: "A", label: "Memory Leak" },
      { id: "B", label: "Callback Hell" },
      { id: "C", label: "CSS Bug" },
      { id: "D", label: "SQL Injection" },
    ],
    correctAnswer: "B",
  },
  {
    id: 23,
    question: "API Rate Limit คืออะไร?",
    options: [
      { id: "A", label: "จำกัดจำนวนคำขอในช่วงเวลาหนึ่ง" },
      { id: "B", label: "ล้าง cache" },
      { id: "C", label: "เพิ่ม API latency" },
      { id: "D", label: "ย้าย Server" },
    ],
    correctAnswer: "A",
  },
  {
    id: 24,
    question: "CI/CD คืออะไร?",
    options: [
      { id: "A", label: "ระบบ Firewall" },
      { id: "B", label: "กระบวนการ Build / Test / Deploy อัตโนมัติ" },
      { id: "C", label: "ระบบ Backup Database" },
      { id: "D", label: "ระบบ Version Control" },
    ],
    correctAnswer: "B",
  },
  {
    id: 25,
    question: "HTTPS ทำงานผ่านโปรโตคอลความปลอดภัยใด?",
    options: [
      { id: "A", label: "TLS/SSL" },
      { id: "B", label: "FTP" },
      { id: "C", label: "SSH" },
      { id: "D", label: "UDP" },
    ],
    correctAnswer: "A",
  },
  {
    id: 26,
    question: "LocalStorage รองรับขนาดประมาณเท่าไหร่?",
    options: [
      { id: "A", label: "5-10 MB" },
      { id: "B", label: "1 GB" },
      { id: "C", label: "500 MB" },
      { id: "D", label: "100 GB" },
    ],
    correctAnswer: "A",
  },
  {
    id: 27,
    question: "npm run dev ใช้เพื่ออะไร?",
    options: [
      { id: "A", label: "รัน Development Server" },
      { id: "B", label: "ลบ node_modules" },
      { id: "C", label: "แก้ Git" },
      { id: "D", label: "Deploy production" },
    ],
    correctAnswer: "A",
  },
  {
    id: 28,
    question: "Postman ใช้ทำอะไร?",
    options: [
      { id: "A", label: "วาด ER Diagram" },
      { id: "B", label: "ทดสอบ API" },
      { id: "C", label: "เขียน CSS" },
      { id: "D", label: "ตรวจสอบ Docker Container" },
    ],
    correctAnswer: "B",
  },
  {
    id: 29,
    question: "SQL Injection เกิดจากอะไร?",
    options: [
      { id: "A", label: "axios error" },
      { id: "B", label: "การต่อ String Query แบบไม่ sanitize" },
      { id: "C", label: "React crash" },
      { id: "D", label: "CSS ไม่โหลด" },
    ],
    correctAnswer: "B",
  },
  {
    id: 30,
    question: "WebSocket ใช้เพื่ออะไร?",
    options: [
      { id: "A", label: "ส่งข้อมูลแบบ real-time" },
      { id: "B", label: "เก็บ password" },
      { id: "C", label: "ทำ SEO" },
      { id: "D", label: "บันทึก Log" },
    ],
    correctAnswer: "A",
  }
];


