// data.js

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