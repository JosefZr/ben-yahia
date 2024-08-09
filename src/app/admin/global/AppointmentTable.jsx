import React, { useState, useMemo, useCallback, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Pagination,
  User,
  Link,
  TextField,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import Modal from "@/app/components/Modal";
import ConfirmDelete from "@/app/components/ConfirmDelete";
import { FilterContext } from "@/context/filterContext";
import { format, addDays } from "date-fns";
import { useMutation, useQueryClient } from "react-query";
import { deleteAppointment } from "../(root)/rendez-vous/apiRendezVous";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";
import MuiDatePicker from "./MuiDatePicker";

const columns = [
  { name: "NOM", uid: "userName" },
  { name: "DATE", uid: "date" },
  { name: "NUM", uid: "phone" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AppointmentTable({ data }) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteAppointment(id),
    onSuccess: () => {
      toast.success("Appointment has been deleted");
      queryClient.invalidateQueries({
        queryKey: ["appointment"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const [filter] = useContext(FilterContext);

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredItems = useMemo(() => {
    let items = filter
      ? data.filter((appointment) => appointment.status === filter)
      : data;

    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      items = items.filter(
        (item) => format(new Date(item.date), "yyyy-MM-dd") === formattedDate
      );
    }

    if (!filterValue) return items;

    const lowerCaseFilterValue = filterValue.toLowerCase();

    return items.filter((item) =>
      [
        item.user.name,
        item.user.family_name,
        item.user.email,
        item.user.phone,
        item.date,
        item.time,
        item.status,
      ].some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(lowerCaseFilterValue)
      )
    );
  }, [data, filter, filterValue, selectedDate]);

  const pages = useMemo(() => Math.ceil(filteredItems.length / rowsPerPage), [
    filteredItems,
    rowsPerPage,
  ]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((e) => {
    setFilterValue(e.target.value);
    setPage(1);
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const filterTomorrowAppointments = () => {
    const tomorrow = addDays(new Date(), 1);
    setSelectedDate(tomorrow);
  };
  const filterTodayAppointments = () => {
    const tomorrow = addDays(new Date(),0);
    setSelectedDate(tomorrow);
  };
  const filterYesterdayAppointments = () => {
    const tomorrow = addDays(new Date(),-1);
    setSelectedDate(tomorrow);
  };

  return (
    <>
        <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-between gap-3 items-end">
            <SearchInput
                value={filterValue}
                onChange={onSearchChange}
                onClear={() => setFilterValue("")}
            />
             <div className=" flex flex-row items-center gap-3 ">
                <Button onClick={filterTomorrowAppointments} size="lg" className="bg-default-100">Tomorrow</Button>
                <Button onClick={filterTodayAppointments}    size="lg" className="bg-default-100">Todays</Button>
                <Button onClick={filterYesterdayAppointments}size="lg" className="bg-default-100">Yesterday</Button>
            </div>
            <MuiDatePicker value={selectedDate} onChange={setSelectedDate} />
           

            </div>
            <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
                Total {filteredItems.length} items
            </span>
            <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
                >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                </select>
            </label>
            </div>
        </div>
        <div className="xl:w-2xl">
            <Table aria-label="Example table with custom cells">
            <TableHeader>
                {columns.map((column) => (
                <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                >
                    {column.name}
                </TableColumn>
                ))}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                <TableRow key={item.id}>
                    {columns.map((column) => (
                    <TableCell key={column.uid}>
                        {column.uid === "actions" ? (
                        <div className="relative flex items-center w-fit">
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
                                resourceName="appointment"
                                disabled={isDeleting}
                                />
                            </Modal.Window>
                            </Modal>
                            <Button
                            variant="light"
                            isIconOnly
                            onClick={() => {
                                // Handle edit action here
                            }}
                            >
                            <Tooltip content="Modifier">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                                </span>
                            </Tooltip>
                            </Button>
                        </div>
                        ) : column.uid === "date" ? (
                        <div className="flex flex-col font-semibold">
                            <div className="leading-6">
                            {format(new Date(item.date), "yyyy-MM-dd")}
                            </div>
                            <div className="text-default-400">{item.time}</div>
                        </div>
                        ) : column.uid === "userName" ? (
                        <User
                            className="font-semibold leading-6 text-2xl"
                            name={`${item.user.name} ${item.user.family_name}`}
                            avatar={item.user.avatar}
                            size="md"
                            description={
                            <Link
                                href={`mailto:${item.user.email}`}
                                size="md"
                                isExternal
                                className="text-light-green font-semibold"
                            >
                                {item.user.email}
                            </Link>
                            }
                        />
                        ) : column.uid === "status" ? (
                        <div
                            className={`${
                            item.status === "en_attent"
                                ? "bg-default-200"
                                : item.status === "confermer"
                                ? "bg-success-50"
                                : "bg-danger-50"
                            } text-center rounded-3xl px-[1.2rem] py-[0.4rem] font-semibold`}
                        >
                            {item.status}
                        </div>
                        ) : column.uid === "phone" ? (
                        <div>{item.user.phone}</div>
                        ) : (
                        item[column.uid]
                        )}
                    </TableCell>
                    ))}
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="py-2 px-2 flex justify-center items-center">
            <Pagination
            showControls
            classNames={{
                cursor: "bg-[#19592A] text-background",
            }}
            page={page}
            total={pages}
            variant="flat"
            onChange={setPage}
            isCompact
            showShadow
            />
        </div>
        </>
    );
}
