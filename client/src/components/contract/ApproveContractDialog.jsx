import React from 'react';
import { Button } from '../commons';
import { toast } from 'react-toastify';
import { apiUpdateRoomStatus } from '~/apis/room'; 

const ApproveContractDialog = ({ contract, onClose, onApprove }) => {
  const handleApprove = async () => {
    try {
      const data ={
        userId: contract?.rUser?.id,
      }
      const response = await apiUpdateRoomStatus(contract?.rRoom?.id, data); 
      if (response.success) {
        toast.success(response.mes);
        onApprove(); 
        onClose();
      } else {
        toast.error(response.mes);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Duyệt hợp đồng</h2>
        <p>Bạn có chắc chắn muốn duyệt hợp đồng cho phòng <strong>{contract?.rRoom?.title}</strong> không?</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2">❌</Button>
          <Button onClick={handleApprove} className="bg-green-500 text-white hover:bg-green-600">Chấp nhận</Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveContractDialog;
