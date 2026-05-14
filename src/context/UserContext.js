import React, { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [profile, setProfile] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    email: '',
    language: '',
    photoUrl: null,
  });

  useEffect(() => {
    console.log('Profile loaded');
  }, []);

  const updateProfile = (newData) => {
    setProfile(newData);
    console.log('Profile updated:', newData);
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );

};

export const useUser = () => useContext(UserContext);