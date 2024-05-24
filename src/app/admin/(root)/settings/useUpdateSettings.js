import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '@/app/services/apiSettings';

export default function useUpdateSettings() {

    const queryClient = useQueryClient();
    
    const {mutate: updateSettings, isLoading: isUpdating} = useMutation({
        mutationFn:updateSetting,
        onSuccess:()=>{
            toast.success('paramétres ont était modifier correctement')
            queryClient.invalidateQueries({queryKey:["settings"]});
            // reset(patientToEdit);
        },
        onError: (err) => toast.error(err.message || 'An error occurred'),
    })
    return {isUpdating, updateSettings}
}
