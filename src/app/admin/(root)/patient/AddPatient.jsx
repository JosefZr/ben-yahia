"use client";
import CustomButton from '@/app/components/Button';
import CreatePatientForm from '../../global/CreatePatientForm';
import Modal from '@/app/components/Modal'; // Import the Modal component and Open component
import { MdAdd } from "react-icons/md";

export default function AddPatient() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='patient-form'>
                    <CustomButton variant="solid" className='w-full mx-auto text-md font-semibold bg-light-green text-white flex items-center justify-center'>
                        {/* Use Tailwind's responsive utilities to show/hide the text */}
                        <span className="hidden sm:inline">Ajouter un patient</span>
                        <MdAdd  className=' text-xl'/>
                    </CustomButton>
                </Modal.Open>
                <Modal.Window name='patient-form'>
                    <CreatePatientForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
