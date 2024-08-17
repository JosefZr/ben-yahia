import { useQuery } from "react-query";
import { getPatients } from "../(root)/patient/apiPatinet";

export default function useFetchUsers(){
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["patients","appointment"], // unique cache key
        queryFn: () => getPatients(), // returns a promise
        onSuccess: (data) => {
            console.log("Data fetched successfully!", data)
        },
    });
    return{isLoading, isError, data, error}
}