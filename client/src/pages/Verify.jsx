import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const transactionId = searchParams.get("transactionId");
  const { backendUrl, loadCreditData } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(backendUrl + '/api/user/verify', { success, transactionId });
    if (response.data.success) {
      console.log('response',response)
      loadCreditData();
      navigate('/result');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-[60vh] grid">
      <div className="w-[100px] h-[100px] place-self-center border-[5px] border-gray-400 border-t-[5px] border-t-[#2563EB] rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;
