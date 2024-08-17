import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { fetchClosedDays } from '../(root)/opening/useSaveClosedDates';

export default function useFetchClosedDays() {
    const queryClient = useQueryClient();

    const { data: fetchedClosedDays = [], isError, isLoading } = useQuery({
      queryKey: ["closedDays","appointment"],
      queryFn: async () => {
        const result = await fetchClosedDays();
        if (result.error) {
          throw new Error(result.error);
        }
        return result;
      },
      onError: (err) => {
        console.error("Error fetching closed days:", err);
        toast.error(`Erreur lors du chargement des dates fermées: ${err.message}`);
      },
    });
    return{isLoading, isError,fetchedClosedDays}
}
