import { useMutation, useQueryClient } from 'react-query';
import { addPatient } from '../(root)/patient/apiPatinet';
import toast from 'react-hot-toast';

export default function useCreatePatient() {
    const queryClient = useQueryClient();

        const {mutate:createPatient, isLoading:isAdding} = useMutation({
            mutationFn: addPatient,
            onSuccess:()=>{
                toast.success('Un nouveau patient a été créé')
                queryClient.invalidateQueries({queryKey:['patients']});
                // reset();
            },
            onError:(err)=> toast.error(err),
        });
        return{ isAdding, createPatient}
}
