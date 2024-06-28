import { useMutation, useQueryClient } from 'react-query';
import { editPatientInfo } from '../(root)/patient/apiPatinet';
import toast from 'react-hot-toast';

export default function useEditPatient() {
    const queryClient = useQueryClient();
    const {mutate:editPatient, isLoading:isEditing} = useMutation({
        mutationFn:editPatientInfo,
        onSuccess:()=>{
            toast.success('patient a était modifier correctement')
            queryClient.invalidateQueries({queryKey:["patients"]});
            // reset(patientToEdit);
        },
        onError: (err) => toast.error(err.message || 'An error occurred'),
    })
    return {isEditing, editPatient}
}
