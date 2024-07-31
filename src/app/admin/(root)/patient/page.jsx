"use client"
import { Children, createContext, useState } from "react";
import { useQuery } from "react-query";
import { getPatients } from "./apiPatinet";
import TableUi from "../../global/TableUi";
import AddPatient from "./AddPatient";
import PatientTableOpertations from "../../global/PatientTableOpertations";
import Spinner from "@/app/components/Spinner";
import Header from "@/app/components/Header";


export default function Patient() {


    const [patients, setPatients] = useState([]);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["patients"], // unique cache key
        queryFn: () => getPatients(), // returns a promise
        onSuccess: (data) => {
            console.log("Data fetched successfully!", data);
            setPatients(data);
        },
    });

    if (isLoading) return <Spinner/>;

    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <>
        <div className="flex flex-row items-center justify-between p-4">
            <Header title="All patients">All pateints</Header>
        </div>
        <div className="flex flex-col p-4">
            <TableUi data={data} />
        </div>
        </>
    );
}
