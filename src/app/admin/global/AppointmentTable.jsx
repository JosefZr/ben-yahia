import React, { useContext } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import Modal from '@/app/components/Modal';
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { FilterContext } from "@/context/filterContext"; // import the context
import { format } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { deleteAppointment } from "../(root)/rendez-vous/apiRendezVous";
import toast from "react-hot-toast";

const columns = [
    { name: "ID", uid: "id" },
    { name: "DATE", uid: "date" },
    { name: "TIME", uid: "time" },
    { name: "NOTE", uid: "note" },
    { name: "STATUS", uid: "status" },
    { name: "USERID", uid: "userId" },
    { name: "ACTIONS", uid: "actions" },
];

export default function AppointmentTable({ data }) {
    
        const queryClient = useQueryClient();
        
        const {isLoading:isDeleting, mutate} = useMutation({
        
            mutationFn:(id) => deleteAppointment(id),
            onSuccess:()=>{
                toast.success("patient a était suprimeé ")
                queryClient.invalidateQueries({
                    queryKey:["patients"]
                })
            },
            onError:(err)=> toast.error(err.message),
        })
    const [filter] = useContext(FilterContext); // use the context

    let filteredAppointment = filter
        ? data.filter((appointment) => appointment.status === filter)
        : data;

    return (    
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody items={filteredAppointment}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.uid}>
                                    {column.uid === "actions" && (
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
                                                        onConfirm={() => mutate(item.id)}
                                                        resourceName='appointment'
                                                        disabled={isDeleting}
                                                    />
                                                </Modal.Window>
                                            </Modal>
                                            <Button variant="light" isIconOnly onClick={() => {
                                                // Handle edit action here
                                            }}>
                                                <Tooltip content="Modifier">
                                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                        <EditIcon />
                                                    </span>
                                                </Tooltip>
                                            </Button>
                                        </div>
                                    )}
                                    {column.uid === "date" ? (
                                        <div>{format(new Date(item.date), 'yyyy-MM-dd')}</div>
                                    ) : (
                                        item[column.uid]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
