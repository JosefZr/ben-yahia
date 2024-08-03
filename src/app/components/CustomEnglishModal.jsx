// components/CustomModal.jsx
"use client";
import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const CustomEnglishModal = ({ isOpen, onOpenChange }) => {

    return (
        <Modal size='lg' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} >
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1 items-center  bg-divider">
                <Image
                src="/logo/White Black Simple Illustration Dental Clinic Logo.webp"
                alt='White and Black Simple Illustration Dental Clinic Logo'
                width={200}
                height={200}
                className=" rounded-full"
                priority // Indique que cette image doit être chargée en priorité
                loading="eager" // Demande au navigateur de charger cette image immédiatement
                quality={80} // Ajuste la qualité de l'image pour un meilleur compromis entre qualité et taille
                />
                </ModalHeader>
                <ModalBody className="flex flex-col items-center text-center  bg-divider" >
                <h1 className='text-3xl font-semibold mb-4'>This service will be soon available.</h1>
                <p className='text-lg'>Please stay updated for more to come. We appreciate your patience!</p>
                </ModalBody>
                <ModalFooter className="flex justify-center  bg-divider">
                <Button color="danger" variant="shadow" onPress={onClose}>
                    Close
                </Button>
                </ModalFooter>
            </>
            )}
        </ModalContent>
        </Modal>
    );
};

export default CustomEnglishModal;
