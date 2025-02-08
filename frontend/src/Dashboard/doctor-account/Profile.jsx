import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specailization: "",
    ticketPrice: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", hospital: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2 className="Otext-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form>
        <div className="mb-5">
          <p className="form_label">Name *</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Email *</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Mobile Number *</p>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <p className="form_label">Bio *</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form_input"
            maxLength={150}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form_label">Gender *</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form_label">Specailization *</p>
              <select
                name="specailization"
                value={formData.specailization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatalogist">Dermatalogist</option>
              </select>
            </div>
            <div>
              <p className="form_label">Ticket Price *</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form_input"
              ></input>
            </div>
          </div>
        </div>

        {/* qualifications */}
        <div className="mb-5">
          <p className="form_label">Qualifications *</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date *</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">Ending Date *</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                    ></input>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Degree *</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">University *</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form_input"
                    ></input>
                  </div>
                </div>

                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button className="bg-[#000] py-2  px-5 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
            {" "}
            Add Qualification
          </button>
        </div>

        {/* experiences */}
        <div className="mb-5">
          <p className="form_label">Experiences *</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form_label">Starting Date *</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">Ending Date *</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                    ></input>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position *</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">Hospital *</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form_input"
                    ></input>
                  </div>
                </div>

                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button className="bg-[#000] py-2  px-5 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
            {" "}
            Add Experiences
          </button>
        </div>

        {/* time slots */}
        <div className="mb-5">
          <p className="form_label">Time Slots *</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                  <div>
                    <p className="form_label">Day *</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form_input py-3.5"
                    >
                      <option value="">Select</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="friday">Friday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time *</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">Ending Time *</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form_input"
                    ></input>
                  </div>

                  <div className="flex items-center">
                    <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form_label">Position *</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form_input"
                    ></input>
                  </div>
                  <div>
                    <p className="form_label">Hospital *</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form_input"
                    ></input>
                  </div>
                </div> */}
              </div>
            </div>
          ))}

          <button className="bg-[#000] py-2  px-5 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
            {" "}
            Add Time Slot
          </button>
        </div>
       
        {/* start about section here  */}
        <div className="mb-5"><p>About</p></div>
      </form>
    </div>
  );
};

export default Profile;
