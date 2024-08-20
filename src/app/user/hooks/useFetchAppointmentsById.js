import { useQuery, useQueryClient } from 'react-query';
import { getAppointments } from '../api/appointment';

export default function useFetchAppointmentById(userId) {
  const queryClient = useQueryClient();

  const { data:appointments=[], isLoading, isError, error } = useQuery({
    queryFn: () => getAppointments({ userId }),
    enabled: !!userId,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients","appointment"],);
    },
    onError: (error) => {
      console.error("Error fetching appointments:", error);
    }
  });

  return { appointments, isLoading, isError, error };
}
