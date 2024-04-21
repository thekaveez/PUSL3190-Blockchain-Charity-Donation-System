import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span
          className="text-[#808191] font-epilogue font-medium 
            text-[14px] leading-[22px] mb-[10px]"
        >
          {labelName}
        </span>
      )}
        {isTextArea ? (
            <textarea
            required
            rows={10}
            className=" py-[15px] sm:px-[25px] px[15px] 
            outline-none border-[1px] border-[#7d7d8f] bg-transparent
             rounded-[10px] text-[#272727da] font-epilogue font-medium 
            text-[14px] sm:min-w-[300px]"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            />
        ) : (
            <input
            required
            type={inputType}
            step='0.1'
            className=" py-[15px] sm:px-[25px] px[15px] 
            outline-none border-[1px] border-[#7d7d8f] bg-transparent
             rounded-[10px] text-[#272727da] font-epilogue font-medium 
            text-[14px] sm:min-w-[400px]"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            />
        )}
    </label>
  );
};

export default FormField;
