import * as React from "react";

const AxAdminDashCard = ({title, value}) => {
    return (
        <div className='flex flex-col items-center
        w-[200px] '>
            <p className='font-epilogue font-normal
            text-[22px] text-[#fdfdfd] bg-[#567be0] 
            px-3 py-4 w-full rounded-t-[10px] text-center'>
                {title}
            </p>
            <h4 className='font-epilogue font-bold text-[40px]
            text-[#272727da] p-10 bg-[#e9f4fafd]
            rounded-b-[15px] w-full text-center truncate
            '>
                {value}
            </h4>
            
        </div>
      )
    }

export default AxAdminDashCard;
