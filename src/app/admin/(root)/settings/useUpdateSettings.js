import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { updateSetting } from '@/app/services/apiSettings';

export default function useUpdateSettings(id) {
    const queryClient = useQueryClient();
    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: (newSettings) => updateSetting(newSettings, id),
        onSuccess: () => {
            toast.success('Paramètres ont été modifiés correctement');
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message || 'Une erreur s\'est produite'),
    });
    return { isUpdating, updateSettings };
}
