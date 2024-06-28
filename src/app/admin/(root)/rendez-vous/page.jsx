"use client"
import { createContext, useState } from "react";
import { useQuery } from "react-query";

import PatientTableOpertations from "../../global/PatientTableOpertations";
import Spinner from "@/app/components/Spinner";
import AppointmentTable from "../../global/AppointmentTable";
import { getAppointment } from "./apiRendezVous";
import FilterProvider from "@/context/filterContext"

export const Context = createContext("");

export default function RenderVous() {
    const [appointments, setAppointments] = useState([]);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["appointment"],
        queryFn: () => getAppointment(),
        onSuccess: (data) => {
            console.log("Data fetched successfully!", data);
            setAppointments(data);
        },
    });

    if (isLoading) return <Spinner/>;

    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <FilterProvider> {/* Wrap with FilterProvider */}
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-3xl font-semibold">Tous les rendez-vous</h1>
                <PatientTableOpertations />
            </div>
            <div className="flex flex-col p-4">
                <AppointmentTable data={data}/>
            </div>
        </FilterProvider>
    );
}
