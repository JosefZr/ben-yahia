"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { format, isSameDay, parseISO } from "date-fns";
import { Button, Spinner } from "@nextui-org/react";
import "../../../user/style/calendar.css";
import useFetchClosedDays from "../../hooks/useFetchClosedDays";
import useCreateClosedDay from "../../hooks/useCreateClosedDay";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function Opening() {
  const [selectedDate, setSelectedDate] = useState(null);

  const {fetchedClosedDays=[], isLoading, isError}= useFetchClosedDays();
  const {saveCloseDay,isSaving}= useCreateClosedDay()

  const tileClassName = ({ date, view }) => {
    if (view === "month" && fetchedClosedDays.some((closedDay) => isSameDay(parseISO(closedDay.date), date))) {
      return "closed-day";
    }
    return null;
  };

  if (isError) return <p>Error fetching closed days.</p>;

  return (
    <div className="mx-auto max-w-xl">
      <Toaster />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-6">
          <Calendar
            minDate={new Date()}
            className="REACT-CALENDAR p-2 bg-default-50 dark:bg-black-50 shadow-2xl shadow-default-300 dark:text-gray-300"
            view="month"
            onClickDay={(date) => setSelectedDate(format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"))}
            tileDisabled={tileClassName}
          />
          <style jsx>{`
            .react-calendar--doubleView {
              @apply w-[700px];
            }
            .react-calendar--doubleView .react-calendar__viewContainer {
              @apply flex -m-2;
            }
            .react-calendar--doubleView .react-calendar__viewContainer > * {
              @apply w-[50%] m-2;
            }
            .react-calendar *,
            .react-calendar *::before,
            .react-calendar *::after {
              @apply box-border;
            }

            /* Custom Navigation Styles */
            @media screen and (max-width: 500px) {
              .react-calendar__navigation__prev2-button,
              .react-calendar__navigation__prev-button {
                @apply hidden;
              }
              .react-calendar__navigation__label {
                @apply pl-4 text-left;
              }
            }

            .react-calendar button {
              @apply m-0 border-0 outline-none;
            }
            .react-calendar button:enabled:hover {
              @apply cursor-pointer;
            }
            .react-calendar__navigation {
              @apply flex h-11 mb-4;
            }
            .react-calendar__navigation button {
              @apply min-w-[44px] bg-none;
            }
            .react-calendar__navigation button:disabled {
              @apply invisible bg-default-200 dark:bg-gray-600;
            }
            .react-calendar__navigation button:enabled:hover,
            .react-calendar__navigation button:enabled:focus {
              @apply bg-default-100 dark:bg-gray-700;
            }
            .react-calendar__month-view__weekdays {
              @apply text-indigo-600 dark:text-indigo-300 text-center uppercase font-bold text-[0.8em];
            }
            .react-calendar__month-view__days__day {
              @apply p-1.5 rounded-lg;
            }
            .react-calendar__navigation__label__labelText {
              @apply font-medium text-[1.05em];
            }
            .react-calendar__navigation__label {
              @apply pointer-events-none;
            }
            .react-calendar__navigation__arrow {
              @apply bg-white dark:bg-gray-700 p-1.5 rounded-full text-[1.25em];
            }
            .react-calendar__navigation__arrow:hover {
              @apply bg-gray-600 dark:bg-gray-500;
            }
            .react-calendar__month-view__weekdays__weekday {
              @apply p-3;
            }
            .react-calendar__month-view__weekdays__weekday abbr {
              @apply no-underline;
            }
            .react-calendar__month-view__weekNumbers .react-calendar__tile {
              @apply flex items-center justify-center text-[0.75em] font-bold;
            }
            .react-calendar__month-view__days__day--neighboringMonth {
              @apply text-default-400 dark:text-gray-500;
            }
            .react-calendar__year-view .react-calendar__tile,
            .react-calendar__decade-view .react-calendar__tile,
            .react-calendar__century-view .react-calendar__tile {
              @apply p-8 py-2;
            }
            .react-calendar__tile {
              @apply aspect-square max-w-full bg-none text-center;
            }
            .react-calendar__tile:disabled {
              @apply bg-gray-200 dark:bg-red-600 text-gray-600 dark:text-gray-400 ;
            }
            .react-calendar__tile:enabled:hover,
            .react-calendar__tile:enabled:focus {
              @apply bg-indigo-50 dark:bg-gray-700;
            }
            .react-calendar__tile--now {
              @apply rounded-lg border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-300;
            }
            .react-calendar__tile--now:enabled:hover,
            .react-calendar__tile--now:enabled:focus {
              @apply bg-default-50 dark:bg-gray-700;
            }
            .react-calendar__tile--hasActive {
              @apply bg-default-400 dark:bg-gray-700;
            }
            .react-calendar__tile--hasActive:enabled:hover,
            .react-calendar__tile--hasActive:enabled:focus {
              @apply bg-default-300 dark:bg-gray-600;
            }
            .react-calendar__tile--active:enabled:hover,
            .react-calendar__tile--active:enabled:focus {
              @apply bg-default-600 text-default dark:bg-gray-600 dark:text-white;
            }
            .react-calendar--selectRange .react-calendar__tile--hover {
              @apply bg-indigo-50 dark:bg-gray-700;
            }

            .closed-day {
              @apply bg-red-600 text-white rounded-lg;
            }
          `}</style>
          <Button
            onClick={() => {
              if (selectedDate) {
                const isAlreadyClosed = fetchedClosedDays.some(closedDay =>
                  isSameDay(parseISO(closedDay.date), parseISO(selectedDate))
                );
                if (!isAlreadyClosed) {
                  saveCloseDay(selectedDate);
                } else {
                  toast.error("This date is already marked as closed.");
                }
              }
            }}
            disabled={!selectedDate || isSaving}
            color="primary"
          >
            {isSaving ? "Saving..." : "Save Selected Date"}
          </Button>
        </div>
      )}
    </div>
  );
}
