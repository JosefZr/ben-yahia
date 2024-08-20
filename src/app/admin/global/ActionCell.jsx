import React, { useState } from "react";
import {
  Button,
  Tooltip,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { DeleteIcon } from "./DeleteIcon";
import useDeleteAppointment from "../hooks/useDeletAppointment";
import MyModal from "@/app/components/Modal";
import useCreateCancelationReason from "../hooks/useCreateCancellationReason";
import { IoIosCalendar } from "react-icons/io";
import useAddingTime from "../hooks/useAddingTime";

export default function ActionsCell({ user }) {
  const {
    isOpen: isCloseOpen,
    onOpen: onCloseOpen,
    onOpenChange: onCloseOpenChange,
  } = useDisclosure();
  const {
    isOpen: isSchedulOpen,
    onOpen: onSchedulOpen,
    onOpenChange: onSchedulOpenChange,
  } = useDisclosure();

  const { isDeleting, mutate } = useDeleteAppointment();
  const { isCanceling, canceling } = useCreateCancelationReason();
  const { isAddingTime, time } = useAddingTime();
  const [cancelReason, setCancelReason] = useState(""); // Store the cancellation reason
  const [selectedTime, setSelectedTime] = useState("08:00"); // Store the selected time

  const handleCancelAppointment = () => {
    canceling({ reason: cancelReason, id: user.id }); // Pass the reason and user ID
    onCloseOpenChange(false); // Close the modal after confirming
  };

  const handleConfirmAppointment = () => {
    if (!selectedTime) {
      console.error("Selected time is required");
      return;
    }
    time({ id: user.id, time: selectedTime.toString(), }); // Ensure time is passed as a string
    onSchedulOpenChange(false); // Close the modal after confirming
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
            onConfirm={() => mutate(user.id)}
            resourceName="appointment"
            disabled={isDeleting}
          />
        </MyModal.Window>
      </MyModal>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" className="px-1 min-w-10">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              &#x22EE;
            </span>
          </Button>
        </DropdownTrigger>
        
        <DropdownMenu aria-label="Actions" aria-hidden="true">
          {user.status!=="annuler" &&
            <DropdownItem color="danger" onPress={onCloseOpen}>
              Cancel
            </DropdownItem>
          }
          {user.status !=="confirmed" &&
            <DropdownItem color="success" onPress={onSchedulOpen}>
              Schedule
            </DropdownItem>
          }
        </DropdownMenu>
      </Dropdown>

      {/* Modal for "Cancel" action */}
      <Modal isOpen={isCloseOpen} size="lg" onOpenChange={onCloseOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
                Checking Booking #{user.id}
              </ModalHeader>
              <ModalBody className=" mb-5">
                <p className=" mb-5">
                  Are you sure you want to cancel this appointment?
                </p>
                <p>Reason for cancellation:</p>
                <textarea
                  className="w-full h-28 border border-default-400 p-4 rounded-md active:border-default-500"
                  placeholder="e.g., Urgent meeting came up"
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
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
      <Modal
        size="xl"
        isOpen={isSchedulOpen}
        onOpenChange={onSchedulOpenChange}
      >
        <ModalContent>
          {onClose => (
            <div className="p-6 bg-default-50 rounded-lg shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-default-800">
                  Appointment Request #{user.id}
                </h2>
                <span className="text-sm text-default-500">
                  {new Date(user.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-default-800 mb-2">
                  Patient Details:
                </h3>
                <p className="text-default-600">Email: {user.user.email}</p>
                <p className="text-default-600">Phone: {user.user.phone}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-default-800 mb-2">
                  Patient Notes:
                </h3>
                <ol className="list-decimal list-inside text-default-600">
                  <li>{user.note}</li>
                  <li>{user.additinalNote}</li>
                </ol>
              </div>

              <div className="text-xl border-t-1 border-b-1 py-5 pl-5 flex flex-row items-center font-semibold">
                Requested Appointment Date :
                <div className="flex flex-row items-top gap-2 pl-3">
                  <IoIosCalendar className="text-default-600 text-2xl font-bold" />
                  {new Date(user.date).toLocaleDateString()}
                </div>
              </div>

              <div className="my-10">
                <h3 className="text-lg font-semibold text-default-700 mb-2">
                  Set Appointment Time:
                </h3>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    className="p-2 border border-default-300 rounded-xl focus:ring-default-500 focus:border-default-500"
                    defaultValue={selectedTime}
                    onChange={e => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="submit"
                  className="px-4 py-2 rounded-xl hover:bg-danger-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={onClose}
                  color="danger"
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 py-2 bg-light-green rounded-xl text-white hover:bg-bold-green focus:outline-none focus:ring-2 focus:ring-light-green"
                  onClick={handleConfirmAppointment}
                >
                  Confirm Appointment
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
