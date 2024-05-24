"use client"
import CustomButton from '@/app/components/Button'
import CreatePatientForm from '../../global/CreatePatientForm'
import  Modal  from '@/app/components/Modal'; // Import the Modal component and Open component

export default function AddPatient(){
    return (
        <div>
        <Modal>
            <Modal.Open opens ='patient-form'>
                <CustomButton variant="solid" color='primary' className=' w-full mx-auto '>Ajouter un nouveau patient</CustomButton>
            </Modal.Open>
            <Modal.Window name='patient-form'>
                <CreatePatientForm />
            </Modal.Window>
        </Modal>
        </div>

    )
}
// export default function AddPatient() {
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <div>
//             <CustomButton className=" w-[90%] px-4 mx-auto text-center" color="primary" onClick={()=> setShowModal(!showModal)}> ajouter un patient</CustomButton>
//             <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//                 <CreatePatientForm onCloseModal={() => setShowModal(false)}/>
//             </Modal>
//         </div>
//     )
// }
