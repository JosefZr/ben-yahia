"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { format, isSameDay, parseISO } from "date-fns";
import { Button } from "@nextui-org/react";
import "../../../user/style/calendar.css";
import useFetchClosedDays from "../../hooks/useFetchClosedDays";
import useCreateClosedDay from "../../hooks/useCreateClosedDay";
import useDeleteClosedDay from "../../hooks/useDeleteCloseDay";
import CustomSpinner from "@/app/components/CustomSpinner";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Opening() {
  const [selectedDate, setSelectedDate] = useState(null);

  const { fetchedClosedDays = [], isLoading, isError } = useFetchClosedDays();
  const { saveCloseDay, isSaving } = useCreateClosedDay();
  const { deleteClosedDay, isDeleting } = useDeleteClosedDay();

  const tileClassName = ({ date, view }) => {
    if (
      view === "month" &&
      fetchedClosedDays.some((closedDay) =>
        isSameDay(parseISO(closedDay.date), date)
      )
    ) {
      return "closed-day"; // Apply a CSS class to visually indicate the closed day
    }
    return null;
  };

  if (isError) return <p>Error fetching closed days.</p>;

  const handleSaveOrDelete = () => {
    if (selectedDate) {
      const isAlreadyClosed = fetchedClosedDays.some((closedDay) =>
        isSameDay(parseISO(closedDay.date), parseISO(selectedDate))
      );

      if (isAlreadyClosed) {
        const dayToDelete = fetchedClosedDays.find((closedDay) =>
          isSameDay(parseISO(closedDay.date), parseISO(selectedDate))
        );
        if (dayToDelete) {
          deleteClosedDay(dayToDelete.id); // Use ID for deletion
        }
      } else {
        saveCloseDay(selectedDate);
      }
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <Toaster />
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Calendar
            minDate={new Date()}
            className="REACT-CALENDAR p-2 bg-default-50 dark:bg-black-50 shadow-2xl shadow-default-300 dark:text-gray-300"
            view="month"
            onClickDay={(date) =>
              setSelectedDate(format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"))
            }
            tileClassName={tileClassName} // Apply styles without disabling the tile
          />
          <Button
            onClick={handleSaveOrDelete}
            disabled={!selectedDate || isSaving || isDeleting}
            color="primary"
          >
            {isSaving
              ? "Saving..."
              : isDeleting
              ? "Deleting..."
              : fetchedClosedDays.some((closedDay) =>
                  isSameDay(parseISO(closedDay.date), parseISO(selectedDate))
                )
              ? "Remove Closed Day"
              : "Save Selected Date"}
          </Button>
        </div>
      )}
    </div>
  );
}
