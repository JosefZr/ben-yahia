"use client"
import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { getPatients } from "./apiPatinet";
import TableUi from "../../global/TableUi";
import AddPatient from "./AddPatient";
import PatientTableOpertations from "../../global/PatientTableOpertations";

export const Context = createContext("");

export default function Patient() {

    const [searchParams, setSearchParams] = useState();

    const [patients, setPatients] = useState([]);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["patients"], // unique cache key
        queryFn: () => getPatients(), // returns a promise
        onSuccess: (data) => {
            console.log("Data fetched successfully!", data);
            setPatients(data);
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <Context.Provider value={[searchParams, setSearchParams]}>
        <div className="flex flex-row items-center justify-between p-4">
            <h1 className=" text-3xl font-semibold">All pateints</h1>
            <PatientTableOpertations />

        </div>
        <div className="flex flex-col p-4">
            <TableUi data={data}/>
            <AddPatient/>
        </div>
        </Context.Provider>
    );
}
