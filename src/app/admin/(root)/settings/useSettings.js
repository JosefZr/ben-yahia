
import { findSettings } from "@/app/services/apiSettings";
import { useQuery } from "react-query";

export function GetSettings() {
    const { isLoading, data, error } = useQuery({
        queryKey: ["settings"],
        queryFn: () => findSettings(),
    });
    
    // Extract the first item from the array
    const settings = data && data.length > 0 ? data[0] : null;
    
    return { isLoading, error, settings };
}