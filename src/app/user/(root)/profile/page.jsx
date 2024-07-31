"use client"
import CreatePatientForm from '@/app/admin/global/CreatePatientForm';
import React from 'react';
import useUserId from '../../hooks/useUserId';
import Spinner from '@/app/components/Spinner';
import EditProfile from '../../components/EditProfile';
export default function Profile() {
  const { userInfo, isError, isLoading } = useUserId();

  if (isLoading) {
    return <div><Spinner/></div>;
  }

  if (isError) {
    return <div>Error loading user information.</div>;
  }

  return (
    <div>
      <h1>Modifier votre Compte</h1>
      <EditProfile userToEdit={userInfo} />
    </div>
  );
}
