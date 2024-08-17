import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Avatar, Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import useFetchUsers from "../hooks/useFetchUsers";
import { IoSearch } from "react-icons/io5";
import CalendarComponent2 from "@/app/user/components/CalendarComponent-v2";
import { useDays } from "@/app/lib/data";
import "../../user/style/calendar.css"
export default function SearchUserSelect() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isLoading, isError, data: patients, error } = useFetchUsers();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const days = useDays();

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    function handleUserClick(patientId) {
        setSelectedUserId(patientId);
        onOpen(); // This will open the modal
    }

    return (
        <>
            <Autocomplete
                classNames={{
                    base: "max-w-xs",
                    listboxWrapper: "max-h-[320px]",
                    selectorButton: "text-default-500"
                }}
                defaultItems={patients}
                inputProps={{
                    classNames: {
                        input: "ml-1",
                        inputWrapper: "py-[15.5px]",
                    },
                    'aria-label': 'Search users', // ensuring accessible naming
                }}
                listboxProps={{
                    hideSelectedIcon: true,
                    itemClasses: {
                        base: [
                            "rounded-medium",
                            "text-default-500",
                            "transition-opacity",
                            "data-[hover=true]:text-foreground",
                            "dark:data-[hover=true]:bg-default-50",
                            "data-[pressed=true]:opacity-70",
                            "data-[hover=true]:bg-default-200",
                            "data-[selectable=true]:focus:bg-default-100",
                            "data-[focus-visible=true]:ring-default-500",
                        ],
                    },
                }}
                popoverProps={{
                    offset: 10,
                    classNames: {
                        base: "rounded-large",
                        content: "p-1 border-small border-default-100 bg-background",
                    },
                }}
                startContent={<IoSearch className="text-default-400" strokeWidth={2.5} size={20} />}
                radius="lg"
                variant="flat"
                label="Search users"
                placeholder="Type to search..."
                isLoading={isLoading}
                allowsCustomValue={true} 
                scrollShadowProps={{
                    isEnabled: false
                }}
            >
                {patients && patients.length > 0 ? (
                    patients.map((patient) => (
                        <AutocompleteItem
                            key={patient.id}
                            textValue={`${patient.name} ${patient.email}`}
                        >
                            <div className="relative flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Avatar alt={patient.name} className="flex-shrink-0" size="sm" />
                                    <div className="flex flex-col">
                                        <span className="text-small">{patient.name}</span>
                                        <span className="text-tiny text-default-400">{patient.email}</span>
                                    </div>
                                </div>
                                <Button
                                    className="border-small mr-0.5 font-medium "
                                    radius="full"
                                    size="sm"
                                    variant="bordered"
                                    onPress={() => handleUserClick(patient.id)}
                                >
                                    Add
                                </Button>
                            </div>
                        </AutocompleteItem>
                    ))
                ) : (
                    <AutocompleteItem value="" disabled textValue="No users found">
                        No users found
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody className="flex flex-col gap-1">
                                <CalendarComponent2
                                    days={days}
                                    onCloseModal={onClose}
                                    userId={selectedUserId} // Pass the selected user ID here
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
