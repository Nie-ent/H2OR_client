import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar'; 

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* ส่วนที่ 1: Sidebar (เมนูซ้าย) - จะอยู่ตรงนี้ตลอดไป */}
      <Sidebar />

      {/* ส่วนที่ 2: Content Area (เนื้อหาขวา) */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* ตรงนี้สามารถใส่ Header (Navbar บน) ของ Admin ได้ถ้ามี */}
        {/* <AdminHeader /> */}

        {/* ส่วนเนื้อหาที่จะเปลี่ยนไปตาม Route (เจาะรูไว้) */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet /> 
        </main>
        
      </div>

    </div>
  );
};

export default AdminLayout;