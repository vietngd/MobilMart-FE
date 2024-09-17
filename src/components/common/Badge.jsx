import clsx from 'clsx'
import React from 'react'

const Badge = ({ type = 'success', title, isCustom }) => {
  const renderClassByType = () => {
    switch (type) {
      case 'warning':
        return 'text-[#FF6B00] bg-[#FFF1E6]'
      case 'primary':
        return 'text-[#AD7645] bg-[#DFC9A9]'
      case 'danger':
        return 'text-[#ED1F42] bg-[#FBD2D9]'
      case 'info':
        return 'text-[#315BF1] bg-[#EBEFFE]'
      case 'default':
        return 'text-[#334155] bg-[#E5E7EB]'
      default:
        return 'text-[#19CD35] bg-[#C6F8CE]'
    }
  }

  return (
    <div
      className={clsx(
        renderClassByType(),
        'px-3 py-2',
        isCustom ? 'font-inter-500 text-[14px] w-[120px] rounded-[16px]' : 'w-auto rounded-[16px] text-[14px] text-nowrap'
      )}
    >
      <p className='text-center font-medium'>{title}</p>
    </div>
  )
}

export default Badge
