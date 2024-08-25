import React, { useState, useMemo, useCallback, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FilterContext } from "@/context/filterContext";
import { format, addDays } from "date-fns";
import SearchInput from "./SearchInput";
import MuiDatePicker from "./MuiDatePicker";
import SearchUserSelect from "./SearchUserSelect";
import UserCell from "./UserCell";
import StatusCell from "./StatusCell";
import ActionsCell from "./ActionCell";
import TableFooterPagination from "./TableFooterPagination";

const columns = [
  { name: "NOM", uid: "userName" },
  { name: "DATE", uid: "date" },
  { name: "NUM", uid: "phone" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AppointmentTable({ data }) {
  const [filter] = useContext(FilterContext);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState("earliestToLatest");

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
    const sortedItems = useMemo(() => {
      let items = [...filteredItems];
    
      if (sortOrder) {
        items.sort((a, b) => {
          if (sortOrder === "firstToLast") {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else if (sortOrder === "lastToFirst") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return 0;
        });
      }
  
    if (dateSortOrder) {
      items.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return dateSortOrder === "earliestToLatest" ? aDate - bDate : bDate - aDate;
      });
    }
  
    return items;
  }, [filteredItems, sortOrder, dateSortOrder]);
  
  // Use sortedItems instead of filteredItems for pagination and rendering
const pages = useMemo(() => Math.ceil(sortedItems.length / rowsPerPage), [
  sortedItems,
  rowsPerPage,
]);

const items = useMemo(() => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return sortedItems.slice(start, end);
}, [page, sortedItems, rowsPerPage]);

  const onSearchChange = useCallback((e) => {
    setFilterValue(e.target.value);
    setPage(1);
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const handleDateFilterChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case "tomorrow":
        setSelectedDate(addDays(new Date(), 1));
        break;
      case "today":
        setSelectedDate(addDays(new Date(), 0));
        break;
      case "yesterday":
        setSelectedDate(addDays(new Date(), -1));
        break;
      case "none":
      default:
        setSelectedDate(null);
    }
  };

  const handleSortOrderChange = (e) => {
    console.log("New sort order:", e.target.value);
    setSortOrder(e.target.value);
  };
  
  const handleDateSortOrderChange = (e) => {
    console.log("New date sort order:", e.target.value);
    setDateSortOrder(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex flex-row max-[1120px]:flex-col gap-4 w-full">
            <div className="flex flex-row justify-around gap-3 max-[350px]:flex-wrap">
              <SearchInput
                value={filterValue}
                onChange={onSearchChange}
                onClear={() => setFilterValue("")}
              />
              <SearchUserSelect />
            </div>
            <div className="flex flex-row justify-around gap-3 max-[500px]:flex-wrap max-[500px]:justify-start">
              <select
                onChange={handleDateFilterChange}
                className="bg-default-100 px-5 max-[400px]:w-full py-[15.5px] border dark:border-default-100 rounded-2xl"
              >
                <option value="none">None</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="yesterday">Yesterday</option>
              </select>
              <MuiDatePicker value={selectedDate} onChange={setSelectedDate} />
              <div className="w-full sm:max-w-[250px]">
                <select
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                  className="bg-default-100 max-[400px]:w-full px-5 py-[15.5px] rounded-2xl border dark:border-default-100"
                >
                  
                  <option value="firstToLast">First to Last Reserved</option>
                  <option value="lastToFirst">Last to First Reserved</option>
                </select>
              </div>
              <div className="w-full sm:max-w-[250px]">
                <select
                  value={dateSortOrder}
                  onChange={handleDateSortOrderChange}
                  className="bg-default-100 max-[400px]:w-full px-5 py-[15.5px] rounded-2xl border dark:border-default-100"
                >
                  <option value="earliestToLatest">Earliest to Latest</option>
                  <option value="latestToEarliest">Latest to Earliest</option>
                </select>
              </div>
            </div>
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
              <option value="15">15</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      </div>
      <div className="xl:w-2xl">
        <Table aria-label="Example table with custom cells" className="bordered-table">
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
                      <ActionsCell user={item} />
                    ) : column.uid === "date" ? (
                      <div className="flex flex-col font-semibold">
                        <div className="leading-6 text-nowrap">
                          {format(new Date(item.date), "yyyy-MM-dd")}
                        </div>
                        <div className="text-default-400">{item.time}</div>
                      </div>
                    ) : column.uid === "userName" ? (
                      <UserCell user={item.user} />
                    ) : column.uid === "status" ? (
                      <StatusCell status={item.status} />
                    ) : column.uid === "phone" ? (
                      <span>{item.user.phone}</span>
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TableFooterPagination
        currentPage={page}
        totalPages={pages}
        onPageChange={setPage}
      />
    </>
  );
}
