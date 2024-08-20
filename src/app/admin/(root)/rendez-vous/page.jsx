"use client"
import React, { createContext } from "react";
import PatientTableOpertations from "../../global/PatientTableOpertations";
import AppointmentTable from "../../global/AppointmentTable";
import FilterProvider from "@/context/filterContext";
import StatCard from "../../global/StatCard";
import CustomSpinner from "@/app/components/CustomSpinner";
import useFetchAppointments from "../../hooks/useFetchAppointments";

export const Context = createContext("");

export default function RenderVous() {
    const {error, data,isError,isLoading}= useFetchAppointments()


    if (isError) return <div>Error: {error.message}</div>;
    return (
        <>
        {
            isLoading ? (<CustomSpinner/>)
            :(
                <FilterProvider>
            <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between p-4">
                    <h1 className="text-3xl font-semibold">Tous les rendez-vous</h1>
                    <PatientTableOpertations />
                </div>
                        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10 p-5">
                            <StatCard type="appointment" count={data.filter((appointment) => appointment.status === "confirmed").length} label="Scheduled Appointments" icon="/icons/appointments.svg" />
                            <StatCard type="pending" count={data.filter((appointment) => appointment.status === "en_attent").length} label="Pending Appointments" icon="/icons/pending.svg" />
                            <StatCard type="cancelled" count={data.filter((appointment) => appointment.status === "annuler").length} label="Cancelled Appointments" icon="/icons/cancelled.svg" />
                        </section>
            </div>
            <div className="flex flex-col p-4">
                <AppointmentTable data={data} />
            </div>
        </FilterProvider>
            )
        }
        </>
    );
}
