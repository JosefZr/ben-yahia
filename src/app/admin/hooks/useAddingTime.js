import { useMutation, useQueryClient } from "react-query";
import { AddingTime } from "../(root)/rendez-vous/apiRendezVous";
import toast from "react-hot-toast";

export default function useAddingTime(){
    const queryClient = useQueryClient();
    const {isLoading:isAddingTime, mutate:time,isError}= useMutation({
        mutationFn:async ({id,time})=>{
            const result = await AddingTime(id,time)
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: () => {
            toast.success("Appointment scheduled successfully.");
            queryClient.invalidateQueries({ queryKey: ["appointment"] }); // Invalidate to refresh data
        },
        onError: (err) => {
            console.error("Error scheduling appointment:", err);
            toast.error(`Error: ${err.message}`);
        },
    })
    return{isAddingTime,time,isError}
}