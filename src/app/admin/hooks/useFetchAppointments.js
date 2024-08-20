import { useQuery } from "react-query";
import { getAppointment } from "../(root)/rendez-vous/apiRendezVous";

export default function useFetchAppointments(){
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["appointment"],
        queryFn: () => getAppointment(),
        onSuccess: (data) => {
            console.log("Data fetched successfully!", data);
        },
    });
    return {error, data,isError,isLoading}
}