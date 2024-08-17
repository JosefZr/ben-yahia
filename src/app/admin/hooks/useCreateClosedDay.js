import { useMutation, useQueryClient } from 'react-query';
import { addCloseDay } from '../(root)/opening/useSaveClosedDates';
import toast from 'react-hot-toast';

export default function useCreateClosedDay() {
  const queryClient = useQueryClient(); // Ensure queryClient is initialized

  const { mutate: saveCloseDay, isLoading: isSaving } = useMutation({
    mutationFn: async (date) => {
      const result = await addCloseDay(date);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      toast.success("Une nouvelle date fermée a été créée");
      queryClient.invalidateQueries({ queryKey: ["closedDays"] }); // Correctly invalidate queries
    },
    onError: (err) => {
      console.error("Error saving closed day:", err);
      toast.error(`Erreur: ${err.message}`);
    },
  });

  return { saveCloseDay, isSaving };
}
