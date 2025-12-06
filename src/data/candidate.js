//src/data/candidate.js


export const initialCandidates = [

  {
    id: 1,
    firstName: 'สุดา',
    lastName: 'ขยัน',
    email: 'suda.k@email.com',
    phone: '081-234-5678',
    position: 'developer',
    positionName: 'Senior Full Stack Developer',
    experience: 5,
    education: 'bachelor',
    status: 'interview',
    skills: 'JavaScript, React, Node.js',
    notes: 'มีประสบการณ์ทำงานในบริษัทชั้นนำ',
    examScore: 85,
    evaluation: null
  },
  {
    id: 2,
    firstName: 'ประกาย',
    lastName: 'ใจดี',
    email: 'prakai.j@email.com',
    phone: '082-345-6789',
    position: 'designer',
    positionName: 'UX/UI Designer',
    experience: 3,
    education: 'bachelor',
    status: 'pending',
    skills: 'Figma, Adobe XD, Sketch',
    notes: 'Portfolio สวยงาม',
    examScore: 78,
    evaluation: null
  },
  {
    id: 3,
    firstName: 'วิชัย',
    lastName: 'สมาร์ท',
    email: 'wichai.s@email.com',
    phone: '083-456-7890',
    position: 'marketing',
    positionName: 'Digital Marketing Manager',
    experience: 7,
    education: 'master',
    status: 'passed',
    skills: 'SEO, Google Ads, Social Media',
    notes: 'เคยทำงานในต่างประเทศ',
    examScore: 92,
    evaluation: {
        overall: 9.2,
        recommendation: 'highly_recommended',
        evaluatedDate: new Date().toISOString()
    }
  },
  {
    id: 4,
    firstName: 'สมศรี',
    lastName: 'รักงาน',
    email: 'somsri.r@email.com',
    phone: '084-567-8901',
    position: 'developer',
    positionName: 'Backend Developer (Node.js)',
    experience: 4,
    education: 'bachelor',
    status: 'interview',
    skills: 'Node.js, MongoDB, PostgreSQL',
    notes: 'มีประสบการณ์ด้าน microservices',
    examScore: 88,
    evaluation: null
  },
  {
    id: 5,
    firstName: 'จิตรา',
    lastName: 'มีใจ',
    email: 'jitra.m@email.com',
    phone: '085-678-9012',
    position: 'hr',
    positionName: 'HR Specialist',
    experience: 2,
    education: 'bachelor',
    status: 'pending',
    skills: 'Recruitment, HR Management',
    notes: 'จบใหม่แต่มีความกระตือรือร้น',
    examScore: 72,
    evaluation: null
  },
  {
    id: 6,
    firstName: "สมชาย",
    lastName: "ใจดี",
    status: "passed",
    position: "Frontend Developer",
    email: "somchai.j@email.com",
    phone: "082-555-4444",
    experience: 4,
    skills: "Vue.js, Tailwind, TypeScript",
    examScore: 92,
    interviewDetails: {
      interviewDate: "2023-12-20T14:00:00",
      interviewType: "online",
    },
    photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },

  {
    id: 7,
    firstName: "วิภา",
    lastName: "รักงาน",
    status: "rejected",
    position: "QA Engineer",
    email: "wipa.r@email.com",
    phone: "086-777-6666",
    experience: 2,
    skills: "Selenium, Cypress, Manual Testing",
    examScore: 45,
    interviewDetails: {
      interviewDate: "2023-12-15T09:30:00",
      interviewType: "online",
    },
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 8,
    firstName: "ธนา",
    lastName: "มั่นคง",
    status: "interview",
    position: "Project Manager",
    email: "thana.m@email.com",
    phone: "089-111-2222",
    experience: 8,
    skills: "Agile, Scrum, Jira, Leadership",
    examScore: 78,
    interviewDetails: {
      interviewDate: "2024-01-15T13:00:00",
      interviewType: "on-site", // ทดสอบแบบ On-site
    },
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 9,
    firstName: "กานดา",
    lastName: "สุขใจ",
    status: "pending",
    position: "UX/UI Designer",
    email: "kanda.s@email.com",
    phone: "090-333-4444",
    experience: 3,
    skills: "Figma, Adobe XD, Prototyping",
    examScore: null, // ยังไม่ได้สอบ
    interviewDetails: null, // ยังไม่ได้นัด
    // เคสทดสอบ: ไม่มีรูป (photoUrl) แต่มี Resume
    photoUrl: "", 
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 10,
    firstName: "เอกพล",
    lastName: "เทพcode",
    status: "pending",
    position: "DevOps Engineer",
    email: "ekapol.t@email.com",
    phone: "081-999-0000",
    experience: 6,
    skills: "AWS, Kubernetes, Docker, CI/CD",
    examScore: 88,
    interviewDetails: null,
    // เคสทดสอบ: มีรูป แต่ไม่มี Resume (ปุ่มดูเรซูเม่ไม่ควรขึ้น)
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    resumeUrl: "",
  }
];

export const initialJobs = [
  { id: 1, title: 'Senior Full Stack Developer', dept: 'IT Department', location: 'กรุงเทพมหานคร', type: 'เต็มเวลา', applicants: 24 },
  { id: 2, title: 'UX/UI Designer', dept: 'Design Team', location: 'กรุงเทพมหานคร', type: 'เต็มเวลา', applicants: 18 },
  { id: 3, title: 'Digital Marketing Manager', dept: 'Marketing', location: 'กรุงเทพมหานคร', type: 'เต็มเวลา', applicants: 32 },
  { id: 4, title: 'Backend Developer (Node.js)', dept: 'IT Department', location: 'กรุงเทพมหานคร', type: 'เต็มเวลา', applicants: 15 },
  { id: 5, title: 'HR Specialist', dept: 'Human Resources', location: 'กรุงเทพมหานคร', type: 'เต็มเวลา', applicants: 9 },
];

export const interviews = [
  { id: 1, name: 'สุดา ขยัน', position: 'Senior Developer', round: 'สัมภาษณ์รอบสอง กับทีม Tech', time: '10:00' },
  { id: 2, name: 'ประกาย ใจดี', position: 'UX Designer', round: 'สัมภาษณ์รอบแรก กับ HR', time: '13:30' },
  { id: 3, name: 'วิชัย สมาร์ท', position: 'Marketing Manager', round: 'สัมภาษณ์รอบสาม กับ CMO', time: '15:00' },
];

export const statusColors = {
    pending: 'bg-[#f2b724]',
    interview: 'bg-[#3b5474]',
    passed: 'bg-[#28a745]',
    rejected: 'bg-[#dc3545]'
};

export const statusLabels = {
    pending: 'รอตรวจสอบ',
    interview: 'กำลังสัมภาษณ์',
    passed: 'ผ่านการคัดเลือก',
    rejected: 'ไม่ผ่าน'
};