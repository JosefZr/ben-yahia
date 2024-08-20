import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import MyModal from '@/app/components/Modal';
import ConfirmDelete from '@/app/components/ConfirmDelete';
import CreatePatientForm from './CreatePatientForm';
import { useDeletePatient } from './useDeletePatient';
import { useQuery } from 'react-query';
import useFetchAppointmentsById from '@/app/user/hooks/useFetchAppointmentsById';

export default function PatientActionCell({user}) {
  const { isDeleting, deletePatient } = useDeletePatient();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {GettingAppointmemtsById, isGettingAppointmemtsById,isError, error} = useFetchAppointmentsById(user.id)
return (
    <div className="relative flex items-center w-fit">
        <Tooltip content="Details">
        <Button onPress={onOpen} variant="light" isIconOnly>
            <span className="text-lg  text-default-400 cursor-pointer active:opacity-50">
            <EyeIcon />
            </span>
        </Button>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    {GettingAppointmemtsById}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                    Action
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>

        <MyModal>
        <MyModal.Open opens="delete">
            <Button isIconOnly variant="light">
            <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
                </span>
            </Tooltip>
            </Button>
        </MyModal.Open>
        <MyModal.Window name="delete">
            <ConfirmDelete
                onConfirm={() => deletePatient(user.id)}
                resourceName={user.name}
                disabled={isDeleting}
            />
        </MyModal.Window>
        </MyModal>
        <MyModal>
        <MyModal.Open opens="edit">
        <Button
            variant="light"
            isIconOnly
            // onClick={() => {
            //   setSelectedPatientId(item.id);
            // }}
        >
            <Tooltip content="Modifier">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
            </span>
            </Tooltip>
        </Button>
        </MyModal.Open>
        <MyModal.Window name="edit">
            <CreatePatientForm patientToEdit={user}/>
        </MyModal.Window>
    </MyModal>
</div>
)
}
