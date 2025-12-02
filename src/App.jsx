//src/App.jsx

import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import router
import router from './router/index';

function App() {
  // ถ้า router เป็น undefined หน้าจอจะขาวครับ
  // if (!router) {
  //     return <div>Loading Router... (หรือแสดง Error: Router Not Found)</div>;
  // }
  
  return (
    <>
      {/* Test Mode: บังคับใช้ userRouter */}
      <RouterProvider router={router} />
      
      {/* จำเป็นต้องมีเพื่อให้ toast.success ทำงาน */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;