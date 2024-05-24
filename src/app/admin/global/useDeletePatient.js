
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { deletePatient as deletePatientApi } from "../(root)/patient/apiPatinet";

export function useDeletePatient(){
    const queryClient = useQueryClient();
    
    const {isLoading:isDeleting, mutate: deletePatient} = useMutation({
    
        mutationFn:(id) => deletePatientApi(id),
        onSuccess:()=>{
            toast.success("patient a était suprimeé ")
            queryClient.invalidateQueries({
                queryKey:["patients"]
            })
        },
        onError:(err)=> toast.error(err.message),
    })
    return {isDeleting, deletePatient}
}
