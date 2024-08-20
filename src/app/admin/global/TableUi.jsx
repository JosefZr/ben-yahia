import React, { useState, useMemo, useCallback } from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Input,Pagination,User,Link} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

import AddPatient from "../(root)/patient/AddPatient";
import PatientActionCell from "./PatientActionCell";

const columns = [
  // { name: "ID", uid: "id" },
  { name: "PRENOM", uid: "name" },
  { name: "NUM", uid: "phone" },
  // { name: "ROLE", uid: "role" },
  { name: "AGE", uid: "age" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TableUi({ data }) {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <>
      <div className="flex flex-col justify-center gap-4 ">
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
      <div className=" xl:w-2xl">
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
                  {column.uid === "name" ? (
                    <User
                      name={`${item.name} ${item.family_name}`}
                      avatar={item.avatar}
                      description={(
                        <Link href={`mailto:${item.email}`} size="sm" isExternal className=" text-light-green"> 
                          {item.email}
                        </Link>
                      )}
                    />
                  ) : column.uid === "actions" ? (
                    <PatientActionCell user={item}/>
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

      {/* {showForm && (
        <CreatePatientForm
          patientToEdit={data.find((patient) => patient.id === selectedPatientId)}
        />
      )} */}
    </>
  );
}
