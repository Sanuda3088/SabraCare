import React, { useContext, useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const MyBookings = () => {
  const {
    data: appointment,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errorMsg={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointment.map(doctor =>(
            <DoctorCard doctor={doctor} key={doctor._id}/>
          ))}
        </div>
      )}

      {!loading && !error && appointment.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have no bookings yet
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
