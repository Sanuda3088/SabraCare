import React from 'react'

const Appointments = ({appointments}) => {
  return (
  <table className='w-full text-left text-sm text-gray-500'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='px-6 py-3'>
            Name
          </th>
          <th scope='col' className='px-6 py-3'>
            Gender
          </th>
          <th scope='col' className='px-6 py-3'>
            Payment
          </th>
          <th scope='col' className='px-6 py-3'>
            Price
          </th>
          <th scope='col' className='px-6 py-3'>
            Booked on
          </th>
        </tr>
    </thead>
  </table>
  )
}

export default Appointments