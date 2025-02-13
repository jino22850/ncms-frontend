import React, { useEffect, useState } from 'react'
import { FaRegCalendarMinus, FaUsers } from "react-icons/fa";
import { getCorrespondentCount, getCoveragesCurrentMonth } from '../api/correspondentAPI';

const Dashboard = () => {

    const [correspondentCount, setCorrespondentCount] = useState(0);
    const [coverageCount, setCoverageCount] = useState(0);

  
  useEffect(() => {
    const fetchCorrespondentCount = async () => {
      try {
        const data = await getCorrespondentCount(); 
        setCorrespondentCount(data.count); 
      } catch (error) {
        console.error('Error fetching correspondent count:', error);
      }
    };
    

    const fetchCoverageCount = async () => {
      try {
  
          const data = await getCoveragesCurrentMonth();
          setCoverageCount(data.count);
      } catch (error) {
          console.error('Error fetching coverage count:', error);
      }
  };
  

    fetchCorrespondentCount();
    fetchCoverageCount();
  }, []);
  return (
    <div className=' bg-[#F8F9FC]'>

<div className='grid grid-cols-3 gap-[100px] mt-[25px] pb-[15px]'>
  {/* 1 */}
  <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#342771] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#7b2687] text-[16px] leading-[17px] font-bold'>District</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>25</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>

  {/*2 */}
  <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#ebb955] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#b49547] text-[16px] leading-[17px] font-bold'>Correspondent</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{correspondentCount}</h1>
                    </div>
                    <FaUsers fontSize={28} color='' />
                </div>

   {/* 3 */}
  <div className='h-[100px] w-72 rounded-[8px] bg-white border-l-[4px] border-[#701953] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-105% transition duration-300 ease-out'>
                    <div>
                        <h2 className='text-[#7b2687] text-[16px] leading-[17px] font-bold'>Coverage (monthly)</h2>
                        <h1 className='text-[20px] leading-[24px] font-bold text-[gray-100] mt-[5px]'>{coverageCount}</h1>
                    </div>
                    <FaRegCalendarMinus fontSize={28} color='' />
                </div>

                

                

                
            

                </div>
                {/* Footer */}
      <footer className="bg-white p-4 text-center text-black text-sm">
        Copyright SLRC made by Department of ICT
      </footer>
                </div>

  )
}

export default Dashboard
