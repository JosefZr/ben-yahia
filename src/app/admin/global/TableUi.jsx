import React, { useContext, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import CreatePatientForm from "@/app/admin/global/CreatePatientForm";
import { useDeletePatient } from "./useDeletePatient";
import  Modal  from '@/app/components/Modal'; // Import the Modal component and Open component
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { Context } from "../(root)/patient/page";
const columns = [
    { name: "ID", uid: "id" },
    { name: "PRENOM", uid: "name" },
    { name: "NOM", uid: "family_name"},
    { name: "EMAIL", uid: "email" },
    { name: "NUM", uid: "phone" },
    { name: "ROLE", uid: "role" },
    { name: "AGE", uid: "age"},
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];
export default function TableUi({ data }) {
    const [showForm, setShowForm] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState();
    const {isDeleting, deletePatient} = useDeletePatient();
    const [filter] = useContext(Context);

    console.log(filter)

    // const [searchParams]= useSearchParams();

        // const filterValue = searchParams.get("status");
        //     console.log("Filter Value:", filterValue);
        let filteredPatients = filter
        ? data.filter((patient) => patient.status === filter)
        : data;
    return (    
        <>
        <Table aria-label="Example table with custom cells" >
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody items={filteredPatients}>
                {(item) => (
                    <TableRow key={item.id}>
                        {columns.map((column) => (
                            <TableCell key={column.uid}>
                                {column.uid === "actions" ? (
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="Details">
                                            <Button variant="light" isIconOnly>
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeIcon />
                                                </span>
                                            </Button>
                                        </Tooltip>  
                                        <Modal>
                                            <Modal.Open opens="delete">
                                                <Button isIconOnly variant="light">
                                                    <Tooltip color="danger" content="Delete user">
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <DeleteIcon />
                                                        </span>
                                                    </Tooltip>
                                                </Button>
                                            </Modal.Open>
                                            <Modal.Window name="delete">
                                                <ConfirmDelete 
                                                    onConfirm={() => deletePatient(item.id)}
                                                    resourceName='patient' 
                                                    disabled={isDeleting} 
                                                />
                                            </Modal.Window>
                                        </Modal>
                                            <Button variant="light" isIconOnly onClick={() =>{
                                                        console.log("Item ID:", item.id); // Add this line
                                                        setShowForm((show)=>!show);
                                                        setSelectedPatientId(()=>item.id)  
                                                    }}  >
                                        <Tooltip content="Modifier">
                                                <span 
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                >
                                                    <EditIcon />
                                                </span>
                                        </Tooltip>
                                            </Button>
                                    </div>
                                ) : (
                                    item[column.uid]
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
            </TableBody>
        </Table>
        
        {/* Form */}    
        {showForm && (
                <CreatePatientForm
                    patientToEdit={data.find((patient) => patient.id === selectedPatientId)}
                />
            )}
        </>
    );
}
