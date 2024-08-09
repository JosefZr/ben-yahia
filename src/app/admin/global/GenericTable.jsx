import React, { useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Input,
  Pagination,
  User,
  Link,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import Modal from "@/app/components/Modal";
import ConfirmDelete from "@/app/components/ConfirmDelete";
import AddPatient from "../(root)/patient/AddPatient";
import { format } from "date-fns";

export default function GenericTable({
  columns,
  data,
  filterValue,
  setFilterValue,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  onDelete,
  onEdit,
}) {
  const filteredItems = useMemo(() => {
    if (!filterValue) return data;

    return data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [data, filterValue]);

  const pages = useMemo(() => Math.ceil(filteredItems.length / rowsPerPage), [filteredItems, rowsPerPage]);

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

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name or email"
            startContent={<IoSearch />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={onSearchChange}
          />
          <div className="flex gap-3">
            <AddPatient />
          </div>
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
                              <Tooltip color="danger" content="Delete">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                  <DeleteIcon />
                                </span>
                              </Tooltip>
                            </Button>
                          </Modal.Open>
                          <Modal.Window name="delete">
                            <ConfirmDelete
                              onConfirm={() => onDelete(item.id)}
                              resourceName={item.name}
                              disabled={false}
                            />
                          </Modal.Window>
                        </Modal>
                        <Modal>
                          <Modal.Open opens="edit">
                            <Button variant="light" isIconOnly>
                              <Tooltip content="Edit">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                  <EditIcon />
                                </span>
                              </Tooltip>
                            </Button>
                          </Modal.Open>
                          <Modal.Window name="edit">
                            {onEdit(item)}
                          </Modal.Window>
                        </Modal>
                      </div>
                    ) : column.uid === "date" ? (
                      <div className="flex flex-col font-semibold">
                        <div className="leading-6">{format(new Date(item.date), 'yyyy-MM-dd')}</div>
                        <div className="text-default-400">{item.time}</div>
                      </div>
                    ) : column.uid === "userName" ? (
                      <User
                        className="font-semibold leading-6 text-2xl"
                        name={`${item.user.name} ${item.user.family_name}`}
                        avatar={item.user.avatar}
                        description={
                          <Link href={`mailto:${item.user.email}`} size="lg" isExternal className="text-light-green font-semibold">
                            {item.user.email}
                          </Link>
                        }
                      />
                    ) : column.uid === "status" ? (
                      <div className={`${item.status === "en_attent" ? "bg-slate-200" : item.status === "confermer" ? "bg-success-50" : "bg-danger-50"} text-center rounded-3xl px-[1.2rem] py-[0.4rem] font-semibold`}>
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
