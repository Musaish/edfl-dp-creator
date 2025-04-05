import React from 'react';
import { LuUploadCloud } from "react-icons/lu";

const UploadForm = ({ onFileChange}) => {
  return (
    <>
   
    <div className=" flex justify-between items-center  border-dashed border mt-8 px-4 py-5 rounded-[10px] shadow-md w-full lg:max-w-[500px]">
      
      <div className="flex gap-1 lg:gap-3 items-center ">
        <div className=' w-[32px] h-[32px] rounded-[50%] bg-slate-100 flex items-center justify-center'>
          <LuUploadCloud className=" w-[16px] h-[16px] md:w-[20px] md:h-[20px] " />
        </div>
        <div className='items-center'>
          <h2 className="text-[14px] leading-[20.3px] lg:text-[20px] font-[500] ">Upload Image</h2>
          <div className='font-[400] text-[11px] leading-[15.95px] text-[#98A2B3] items-center '>
          <p> PNG, JPG, PDF | 10MB max</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <label className="cursor-pointer inline-block border border-[#5574FB] text-[#5574FB] text-[7.62px] lg:text-[12px] px-[12.2px] py-[9.15px] lg:px-4  lg:py-3 rounded-md hover:bg-[#c7ceee] ">
          SELECT FILE
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden" 
            onChange={onFileChange}
          />
        </label>
      </div>
      

    </div>
    </>
  );
};

export default UploadForm;
