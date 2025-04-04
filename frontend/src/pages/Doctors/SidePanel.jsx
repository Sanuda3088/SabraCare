// const SidePanel = ({doctorId, ticketPrice, timeSlots }) => {
//   return (
//     <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
//       <div className='flex items-center justify-between'>
//         <p className='text_para mt-0 font-semibold'>Ticket Price</p>
//         <span className='text-[16px] leading-7 lg:text[22px] lg:leading-8 text-headingColor font-bold'>500 BDT</span>
//       </div>
//       <div className='mt-[30px]'>
//         <p className='text_para mt-0 font-semibold text-headingColor'>
//           Available Time Slots
//         </p>
//         <ul className='mt-3'>
//           <li className='flex items-center justify-between mb-2'>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>Sunday</p>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 pm - 9:30 p.m</p>
//           </li>
//           <li className='flex items-center justify-between mb-2'>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>Tuesday</p>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 pm - 9:30 p.m</p>
//           </li>
//           <li className='flex items-center justify-between mb-2'>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>Wedneday</p>
//             <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 pm - 9:30 p.m</p>
//           </li>
//         </ul>
//       </div>
//       <button className='btn px-2 w-full rounded-md'>Book Appointment</button>
//     </div>
//   )
// }

// export default SidePanel


import convertTime from "../../../utils/convertTime"

const SidePanel = ({doctorId, ticketPrice, timeSlots }) => {
  console.log("Doctor id is ",doctorId)
  console.log("Doctor ticketPrice is ",ticketPrice)
  console.log("Doctor timeSlots is ",timeSlots)
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text_para mt-0 font-semibold'>Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text[22px] lg:leading-8 text-headingColor font-bold'>{ticketPrice} LKR</span>
      </div>
      <div className='mt-[30px]'>
        <p className='text_para mt-0 font-semibold text-headingColor'>
          Available Time Slots
        </p>
        <ul className='mt-3'>
  {timeSlots?.map((item, index) => (  // Changed 'Map' to 'map'
    <li key={index} className="flex items-center justify-between mb-2">
      <p className="text-[15px] leading-6 text-textColor font-semibold">
        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
      </p>
      <p className="text-[15px] leading-6 text-textColor font-semibold">
        {convertTime(item.startingTime)} - {convertTime(item.endingTime)}  {/* Fixed the typos */}
      </p>
    </li>
  ))}
</ul>

      </div>
      <button className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>
  )
}

export default SidePanel