"use client"
import Header from "@/app/components/Header";
import PatientTable from "../../global/TableUi";
import useFetchUsers from "../../hooks/useFetchUsers";
import CustomSpinner from "@/app/components/CustomSpinner";


export default function Patient() {
    const { isLoading, isError, data:patients, error } = useFetchUsers()
    if (isError) return <div>Error: {error.message}</div>;

    return ( 
        <>
        {isLoading ? (
            <CustomSpinner/>
        ):(
        <>
            <div className="flex flex-row items-center justify-between p-4">
                <Header title="All patients">All pateints</Header>
            </div>
            <div className="flex flex-col p-4">
                <PatientTable data={patients} />
            </div>
        </>
        )}
        </>
    );
}
