"use client"
import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import PatientTableOpertations from "../../global/PatientTableOpertations";
import Spinner from "@/app/components/Spinner";
import AppointmentTable from "../../global/AppointmentTable";
import { getAppointment } from "./apiRendezVous";
import FilterProvider from "@/context/filterContext";
import StatCard from "../../global/StatCard";

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

    if (isLoading) return <Spinner />;

    if (isError) return <div>Error: {error.message}</div>;
   
    return (
        <FilterProvider>
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between p-4">
                    <h1 className="text-3xl font-semibold">Tous les rendez-vous</h1>
                    <PatientTableOpertations />
                </div>
                <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10 p-5">
                    <StatCard type="appointment" count={data.filter((appointment) => appointment.status === "confermed").length} label="Scheduled Appointments" icon="/icons/appointments.svg" />
                    <StatCard type="pending" count={data.filter((appointment) => appointment.status === "en_attent").length} label="Pending Appointments" icon="/icons/pending.svg" />
                    <StatCard type="cancelled" count={data.filter((appointment) => appointment.status === "annuler").length} label="Cancelled Appointments" icon="/icons/cancelled.svg" />
                </section>
            </div>
            <div className="flex flex-col p-4">
                <AppointmentTable data={data} />
            </div>
        </FilterProvider>
    );
}
