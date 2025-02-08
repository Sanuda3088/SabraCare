import React from 'react';
import { dateFormat } from '../../../utils/dateFormat';


const DoctorAbout = ({name, about, qualifications=[], experiences=[]}) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
           Dr. Sanuda Senod{name}
          </span>
        </h3>
        <p className="text_para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. {about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px] border-2 border-irisBlueColor p-3 rounded"
            >
              <div>
                <span className="text-irisBlueColor text-[16px] leading-6 font-semibold">
                  {dateFormat(item.startingDate)} -{" "}
                  {dateFormat(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  PHD in BioChemistry
                </p>
              </div>
              <p className="text-[16px] leading-5 font-medium text-textColor">
                Sabaragamuwa University
              </p>
            </li>
           ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold ">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experiences.map((item, index) => (
            <li key={index} className="p-4 rounded-[10px] bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                Doctor
              </p>

              <p className="text-[14px] leading-5 font-medium text-textColor">
                Lanka Hospital
              </p>
            </li>
         ))} 
        </ul>
      </div>
    </div>
  )
}

export default DoctorAbout