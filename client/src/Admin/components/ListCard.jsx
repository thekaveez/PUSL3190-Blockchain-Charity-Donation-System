import React from 'react'

const ListCard = ({
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    handleClick,
    index
  }) => {
  return (
    <div
    className="flex flex-row w-full mx-3 bg-[#fffffffd] cursor-pointer"
      onClick={handleClick}
      >
        <p className="text-[#575761] mx-3">{index+1}.</p>
        <p className="text-[#575761] w-[400px] ml-3 mr-5">{owner}</p>
        <p className="text-[#575761] text-left truncate">{title}</p>
        </div>
  )
}

export default ListCard