import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { createReservation } from '../api/appointment';

export default function useCreateReservation(onCloseModal) {
    const queryClient = useQueryClient();
    
    const { mutate, isLoading } = useMutation({
        mutationFn: createReservation,
        queryKey: ["patients","appointment"],
        onSuccess: async () => {
            await queryClient.invalidateQueries('appointment');
            toast.success('Reservation is set correctly');
            if (onCloseModal) onCloseModal();
        },
        onError: (error) => {
            toast.error('Reservation is not set correctly');
            console.error('Error occurred during reservation:', error);
        },
    });

    return { mutate, isLoading };
}
