import React, { useEffect, useState } from "react";
import { getTeachersDetails } from "../Redux/Apis/getTeachersDetails";
import { MoonLoader } from "react-spinners";

function Teachers() {
  const [teachersDetails, setTeachersDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const femaleAvatar =
    "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg";
  const maleAvatar =
    "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg";

  useEffect(() => {
    async function getTeachers() {
      const getTeachersData = await getTeachersDetails();
      setLoading(false);
      setTeachersDetails(getTeachersData?.teachers);
    }
    getTeachers();
  }, []);

  if (loading)
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <MoonLoader />
      </div>
    );

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {teachersDetails?.map((val, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transform transition-all hover:scale-105 duration-200"
        >
          <div className="p-6 flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shadow-md">
              <img
                src={
                  val?.gender === "female"
                    ? femaleAvatar
                    : val?.gender === "male"
                    ? maleAvatar
                    : "https://via.placeholder.com/150"
                }
                alt={`${val?.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              Faculty: {val?.name.toUpperCase()}
            </h3>
            <div className="space-y-2 text-center">
              <p className="text-gray-700">
                <strong>Email: </strong>
                {val?.email}
              </p>
              <p className="text-gray-700">
                <strong>Mobile: </strong>
                {val?.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Subject: </strong>
                {val?.subject}
              </p>
              <p className="text-gray-700">
                <strong>Gender: </strong>
                {val?.gender}
              </p>
              <p className="text-gray-700">
                <strong>Date of Birth: </strong>
                {val?.dob}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teachers;
