
import { findSettings } from "@/app/services/apiSettings";
import { useQuery } from "react-query";

export function GetSettings() {
    const { isLoading, data: settings, error } = useQuery({
        queryKey: ["settings"], // unique cache key
        queryFn: () => findSettings(), // returns a promise
    });
    
    return { isLoading, error, settings };
}
