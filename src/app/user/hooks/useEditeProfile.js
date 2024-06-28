import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { editProfileInfo } from '../api/profileApi';

export default function useEditeProfile() {
    const queryClient = useQueryClient();
    const { mutate: editProfile, isLoading: isEditing } = useMutation({
        mutationFn: editProfileInfo,
        onSuccess: () => {
        toast.success('Patient a été modifié correctement');
        queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message || 'An error occurred'),
    });
    return { isEditing, editProfile };
}
