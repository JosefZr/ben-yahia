// File: useDeleteClosedDay.js
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deleteCloseDay } from "../(root)/opening/useSaveClosedDates";

export default function useDeleteClosedDay() {
    const queryClient = useQueryClient();
    const { mutate: deleteClosedDay, isLoading: isDeleting } = useMutation({
        mutationFn: (id) => deleteCloseDay(id),
        onSuccess: () => {
            toast.success("Closed day has been deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["closedDays"] });
        },
        onError: (err) => {
            console.error("Error deleting closed day:", err);
            toast.error(`Error: ${err.message}`);
        },
    });
    return { deleteClosedDay, isDeleting };
}
