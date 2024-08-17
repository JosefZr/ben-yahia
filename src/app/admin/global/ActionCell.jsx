import React, { useState } from "react";
import { 
    Button, Tooltip, DropdownTrigger, DropdownMenu, 
    DropdownItem, Dropdown, useDisclosure, 
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter 
} from "@nextui-org/react";
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { DeleteIcon } from "./DeleteIcon";
import useDeleteAppointment from "../hooks/useDeletAppointment";
import MyModal from "@/app/components/Modal";
import useCreateCancelationReason from "../hooks/useCreateCancellationReason";

export default function ActionsCell({ user }) {
    const { isOpen: isCloseOpen, onOpen: onCloseOpen, onOpenChange: onCloseOpenChange } = useDisclosure();
    const { isOpen: isSchedulOpen, onOpen: onSchedulOpen, onOpenChange: onSchedulOpenChange } = useDisclosure();

    const { isDeleting, mutate } = useDeleteAppointment();
    const { isCanceling, canceling } = useCreateCancelationReason();

    const [cancelReason, setCancelReason] = useState(""); // Store the cancellation reason

    const handleCancelAppointment = () => {
        canceling({ reason: cancelReason, id: user }); // Pass the reason and user ID
        onCloseOpenChange(false); // Close the modal after confirming
    };

    return (
        <div className="relative flex items-center w-fit">
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
                        onConfirm={() => mutate(user)}
                        resourceName="appointment"
                        disabled={isDeleting}
                    />
                </MyModal.Window>
            </MyModal>

            <Dropdown>
                <DropdownTrigger>
                    <Button variant="light" className="px-1 min-w-10">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">&#x22EE;</span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Actions">
                    <DropdownItem color="danger" onPress={onCloseOpen}>Cancel</DropdownItem>
                    <DropdownItem color="success" onPress={onSchedulOpen}>Schedule</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            {/* Modal for "Cancel" action */}
            <Modal isOpen={isCloseOpen} size="lg" onOpenChange={onCloseOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">Checking Booking #{user}</ModalHeader>
                            <ModalBody className=" mb-5">
                                <p className=" mb-5">Are you sure you want to cancel this appointment?</p>
                                <p>Reason for cancellation:</p>
                                <textarea
                                    className="w-full h-28 border border-default-400 p-4 rounded-md active:border-default-500"
                                    placeholder="e.g., Urgent meeting came up"
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button 
                                    color="danger" 
                                    className="w-full" 
                                    disabled={isCanceling} 
                                    onPress={handleCancelAppointment}
                                >
                                    Cancel Appointment
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal for "Schedule" action */}
            <Modal size="lg" isOpen={isSchedulOpen} onOpenChange={onSchedulOpenChange}>
                <ModalContent>
                    {onClose => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">Schedule Appointment #{user}</ModalHeader>
                            <ModalBody>
                                <p>Please select a new time for the appointment.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
