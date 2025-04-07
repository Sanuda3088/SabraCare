import React from 'react'
// import { doctors } from '../../assets/data/doctors';
import DoctorCard from './DoctorCard';
import { BASE_URL } from './../../config'
import useFetchData from './../../hooks/useFetchData'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const DoctorsList = () => {
  const { data:doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`)
  console.log(data);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}

      {
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px] ">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      }
    </>
  )
}

export default DoctorsList
