import { useMutation, useQueryClient } from "react-query";
import { addCancelReason } from "../(root)/rendez-vous/apiRendezVous";
import toast from "react-hot-toast";

export default function useCreateCancelationReason() {
    const queryClient = useQueryClient();

    const { isLoading: isCanceling, mutate: canceling } = useMutation({
        mutationFn: async ({ reason, id }) => {
            const result = await addCancelReason(reason, id);
            if (result.error) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: () => {
            toast.success("Appointment canceled successfully.");
            queryClient.invalidateQueries({ queryKey: ["appointment"] }); // Invalidate to refresh data
        },
        onError: (err) => {
            console.error("Error canceling appointment:", err);
            toast.error(`Error: ${err.message}`);
        },
    });

    return { isCanceling, canceling };
}
