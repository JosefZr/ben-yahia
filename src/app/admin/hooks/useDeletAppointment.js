import toast from "react-hot-toast";
import { deleteAppointment } from "../(root)/rendez-vous/apiRendezVous";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteAppointment(){
  const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate } = useMutation({
        mutationFn: (id) => deleteAppointment(id),
        onSuccess: () => {
            toast.success("Appointment has been deleted");
            queryClient.invalidateQueries({
                queryKey: ["appointment"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return{isDeleting, mutate}
}