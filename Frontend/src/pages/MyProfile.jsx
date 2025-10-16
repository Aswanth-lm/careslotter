import React, { useEffect, useRef, useState } from 'react';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaEdit, FaSave, FaCamera
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const fileInputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    image: '/default-profile.png',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: ''
    },
    gender: '',
    dob: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData(prev => ({
        ...prev,
        ...parsed,
        address: parsed.address || { line1: '', line2: '' },
      }));
    }
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success("Profile updated!");
    setIsEdit(false);
  };

  return (
    <div className='max-w-lg flex flex-col gap-4 text-sm bg-white p-6 rounded-lg shadow-lg mx-auto mt-10'>
      {/* Profile Image */}
      <div className="flex justify-center relative">
        <img className='w-36 h-36 rounded-full border-4 border-pink-300 object-cover' src={userData.image} alt="Profile" />
        {isEdit && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full text-white"
            >
              <FaCamera />
            </button>
          </>
        )}
      </div>

      {/* Name */}
      <div className="flex justify-between items-center mt-4">
        {
          isEdit
            ? <input
                className='bg-gray-50 text-3xl font-medium max-w-[60%] mt-4 p-2 rounded-md border-2 border-pink-400 focus:outline-none'
                type="text"
                value={userData.name}
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              />
            : <p className='font-medium text-3xl text-pink-600'>{userData.name}</p>
        }
      </div>

      <hr className='bg-zinc-400 h-[1px] border-none' />

      {/* Contact Info */}
      <div>
        <p className='text-neutral-500 underline mt-3 text-lg'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <div className='flex items-center'><FaEnvelope className='text-pink-500 mr-2' /><p className='font-medium'>Email:</p></div>
          <p className='text-blue-500'>{userData.email}</p>

          <div className='flex items-center'><FaPhone className='text-pink-500 mr-2' /><p className='font-medium'>Phone:</p></div>
          {isEdit
            ? <input
                className='bg-gray-100 max-w-52 p-2 rounded-md border-2 border-pink-400'
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            : <p className='text-blue-400'>{userData.phone}</p>
          }

          <div className='flex items-center'><FaMapMarkerAlt className='text-pink-500 mr-2' /><p className='font-medium'>Address:</p></div>
          {isEdit
            ? <>
                <input
                  className='bg-gray-50 p-2 mt-1 mb-1 rounded-md border-2 border-pink-400'
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                  type="text"
                />
                <input
                  className='bg-gray-50 p-2 mt-1 rounded-md border-2 border-pink-400'
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                  type="text"
                />
              </>
            : <p className='text-gray-500'>{userData.address.line1}<br />{userData.address.line2}</p>
          }
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className='text-neutral-500 underline mt-3 text-lg'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <div className='flex items-center'><p className='font-medium'>Gender:</p></div>
          {isEdit
            ? <select
                className='max-w-[120px] bg-gray-100 p-2 rounded-md border-2 border-pink-400'
                value={userData.gender}
                onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <div className='flex items-center'><p className='font-medium'>Birthday:</p></div>
          {isEdit
            ? <input
                className='max-w-[120px] bg-gray-100 p-2 rounded-md border-2 border-pink-400'
                type="date"
                value={userData.dob}
                onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      {/* Save/Edit Button */}
      <div className="mt-6">
        {
          isEdit
            ? <button
                className='border border-pink-500 text-pink-500 px-8 py-2 rounded-full hover:bg-pink-500 hover:text-white transition-all'
                onClick={handleSave}
              >
                <FaSave className='inline mr-2' /> Save Information
              </button>
            : <button
                className='border border-pink-500 text-pink-500 px-8 py-2 rounded-full hover:bg-pink-500 hover:text-white transition-all'
                onClick={() => setIsEdit(true)}
              >
                <FaEdit className='inline mr-2' /> Edit
              </button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
