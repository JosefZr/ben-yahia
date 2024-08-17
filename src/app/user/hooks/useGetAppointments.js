import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { getAppointmentsByDate } from '../api/appointment';

export default function useGetAppointmentsByDate(setReservedTimes) {
    const { mutate: getAppointmentsTimes, isLoading: isGetting } = useMutation({
        mutationFn: getAppointmentsByDate,
        onSuccess: (res) => {
            toast.success('Appointments fetched successfully');
            setReservedTimes(res);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { getAppointmentsTimes, isGetting };
}
