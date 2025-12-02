
import { useParams, useNavigate } from 'react-router-dom';
import { useTestStore } from '../../stores/useTestStore';
import { Play, Clock, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';


const WelcomeTestPage = () => {
    const { candidate_id } = useParams(); // รับ ID จาก URL
    const navigate = useNavigate();
    const { startTest, isLoading } = useTestStore();

      const handleStartTest = async () => {
        if (!candidate_id) {
            toast.error("ไม่พบข้อมูลผู้สมัคร กรุณาสมัครใหม่");
            return;
        }

        try {
            // 1. เรียก API เริ่มสอบ (Backend จะสุ่มข้อสอบมาให้)
            await startTest(candidate_id);
            
            // 2. ถ้าสำเร็จ ไปหน้าทำข้อสอบ
            toast.success("เริ่มการสอบ! ขอให้โชคดีครับ");
            navigate("/quiz"); 
            
        } catch (error) {
            console.error(error);
            toast.error("ไม่สามารถเริ่มสอบได้: " + (error.response?.data?.message || "ระบบขัดข้อง"));
        }
    };

   return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center text-white">
                    <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับสู่แบบทดสอบ</h1>
                    <p className="opacity-90">Pre-Screening Assessment</p>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    
                    {/* Instructions */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <Clock className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-800">เวลาในการทำสอบ</h3>
                                <p className="text-sm text-gray-600">คุณมีเวลาจำกัดในการทำแบบทดสอบ (เช่น 30 นาที)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <FileText className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-800">จำนวนข้อสอบ</h3>
                                <p className="text-sm text-gray-600">แบบทดสอบปรนัย (Multiple Choice) จำนวน 20 ข้อ</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <AlertCircle className="text-yellow-600 w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-gray-800">ข้อควรระวัง</h3>
                                <p className="text-sm text-gray-600">
                                    ห้ามปิดหน้าต่างหรือกด Refresh ระหว่างทำข้อสอบ ระบบจะบันทึกคะแนนทันทีเมื่อส่งคำตอบ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button 
                            onClick={handleStartTest}
                            disabled={isLoading}
                            className="w-full group bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" /> กำลังโหลดข้อสอบ...
                                </>
                            ) : (
                                <>
                                    เริ่มทำแบบทดสอบ <Play className="fill-current w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            ID ผู้สมัคร: {candidate_id}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeTestPage;