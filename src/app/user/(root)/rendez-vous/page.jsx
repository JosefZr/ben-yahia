"use client";

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react';

import CustomButton from '@/app/components/Button';
import ConfirmDelete from '@/app/components/ConfirmDelete';
import Modal from '@/app/components/Modal';
import { deleteAppointment } from '../../api/appointment';
import useFetchAppointmentById from '../../hooks/useFetchAppointmentsById';

const menuAppointmentPage = [
  { name: "tous les rendez-vous" },
  { name: "rendez-vous à venir" }
];

export default function Rendez() {
  const [active, setActive] = useState("rendez-vous à venir");
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteAppoin } = useMutation(deleteAppointment, {
    onSuccess: (res) => {
      toast.success(res);
      queryClient.invalidateQueries(["appointment", userId]); // Make sure this matches your useFetchAppointmentById query key
      queryClient.refetchQueries(["appointment", userId]); 
      setIsModalOpen(false);  // Close the modal after successful deletion
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setUserId(id);
    }
  }, []);

  const { appointments, isLoading, isError, error } = useFetchAppointmentById(userId); // Use the custom hook
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleDeleteAppointment = (appointmentId) => {
    deleteAppoin(appointmentId);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-5">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {menuAppointmentPage.map((item) => (
          <button
            key={item.name}
            className={`py-2 px-4 ${active === item.name ? 'bg-primary text-white' : 'bg-inherit'} border-1 border-solid border-primary rounded-full cursor-pointer transition-all`}
            onClick={() => setActive(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {active === "tous les rendez-vous" && (
        <div className="flex flex-row items-center gap-5 justify-center flex-wrap">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="flex flex-col shadow-xl">
              <CardHeader>
                <Image
                  alt='appointment'
                  className="object-cover"
                  src='https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  height={200}
                  width={400}
                />
              </CardHeader>

              <CardBody className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                  <h3>Date: </h3>
                  <h1 className="justify-end font-semibold px-2">{format(new Date(appointment.date), 'yyyy-MM-dd')}</h1>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h3>Debut: </h3>
                  <h1 className="justify-end font-semibold px-2">{appointment.time}</h1>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h3>Status: </h3>
                  <h1 className={`justify-end font-semibold px-2 py-1 rounded-full ${
                    appointment.status === "confermer" ? "bg-green-400" :
                    appointment.status === "en_attent" ? "bg-gray-300 dark:bg-slate-700" :
                    appointment.status === "annuler" ? "bg-danger-400" : ""
                  }`}>
                    {appointment.status}
                  </h1>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h3>description: </h3>
                  <h1 className="justify-end font-semibold px-2">{appointment.note}</h1>
                </div>
              </CardBody>

              <CardFooter className="flex items-start justify-center">
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                  <Modal.Open opens="cancel">
                    <CustomButton
                      color='primary'
                      variant="shadow"
                      className="w-[90%] rounded-2xl"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Cancel
                    </CustomButton>
                  </Modal.Open>
                  <Modal.Window name="cancel">
                    <ConfirmDelete
                      onConfirm={() => handleDeleteAppointment(appointment.id)}
                      resourceName={appointment.id}
                      disabled={isDeleting}
                    />
                  </Modal.Window>
                </Modal>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {active === "rendez-vous à venir" && (
        <div className="flex flex-row items-center gap-5 justify-around flex-wrap">
          {appointments
            .filter(appointment => new Date(appointment.date) > new Date())
            .map((appointment) => (
              <Card key={appointment.id} className="flex flex-col max-w-[400px]">
                <CardHeader>
                  <Image
                    alt='appointment'
                    className="object-cover"
                    src='https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    width={400}
                    height={200}
                  />
                </CardHeader>

                <CardBody className="flex flex-col gap-3">
                  <div className="flex flex-row items-center justify-between">
                    <h3>Date: </h3>
                    <h1 className="justify-end font-semibold px-2">
                      {format(new Date(appointment.date), 'yyyy-MM-dd')}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h3>Debut: </h3>
                    <h1 className="justify-end font-semibold px-2">
                      {appointment.time}
                    </h1>
                  </div>
                  
                  <div className="flex flex-row items-center justify-between">
                    <h3>Status: </h3>
                    <h1 className={`justify-end font-semibold px-2 py-1 rounded-full ${
                      appointment.status === "confermer" ? "bg-green-400" :
                      appointment.status === "en_attent" ? "bg-gray-300 dark:bg-slate-700" :
                      appointment.status === "annuler" ? "bg-danger" : ""
                    }`}>
                      {appointment.status}
                    </h1>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h3>description: </h3>
                    <h1 className="justify-end font-semibold px-2">{appointment.note}</h1>
                  </div>
                </CardBody>

                <CardFooter className="flex items-start justify-center">
                  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Modal.Open opens="cancel">
                      <CustomButton
                        color='warning'
                        onClick={() => setIsModalOpen(true)}
                      >
                        Cancel
                      </CustomButton>
                    </Modal.Open>
                    <Modal.Window name="cancel">
                      <ConfirmDelete
                        onConfirm={() => handleDeleteAppointment(appointment.id)}
                        resourceName='appointment'
                        disabled={isDeleting}
                      />
                    </Modal.Window>
                  </Modal>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
