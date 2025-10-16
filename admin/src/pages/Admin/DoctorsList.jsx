import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
    // eslint-disable-next-line
  }, [aToken]);

  return (
    <div className='mt-5 max-h-[90vh] overflow-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>

      {doctors.length === 0 ? (
        <p className='text-gray-500 mt-4'>No doctors found.</p>
      ) : (
        <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
          {doctors.map((item, index) => (
            <div
              className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
              key={index}
            >
              <img
                className='bg-indigo-300 group-hover:bg-red-400 transition-all duration-500 w-full h-32 object-cover'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type='checkbox'
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
