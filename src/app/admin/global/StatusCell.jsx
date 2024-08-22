import React from "react";
import { GoX } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { GiSandsOfTime } from "react-icons/gi";

const StatusCell = ({ status }) => {
  const bgClass =
    status === "en_attent"
      ? "bg-sky-100 dark:bg-[#152432]"
      : status === "confirmed"
      ? "bg-emerald-200 dark:bg-[#0D2A1F]"
      : "bg-rose-200 dark:bg-[#3E1716]";

  const Icon =
    status === "en_attent" ? GiSandsOfTime :
    status === "confirmed" ? GoCheck :
    GoX;

  return (
    <div
      className={`${bgClass} text-center rounded-3xl px-[0.8rem] py-[0.4rem] font-semibold flex items-center justify-center gap-2`}
    >
      <Icon className={`${status==="en_attent"? "text-[#79B5EC]":status==="confirmed"?"text-[#24AE7C]":"text-[#F37877]"} w-4 h-4`}  />
      <span className={`${status==="en_attent"? "text-[#79B5EC]":status==="confirmed"?"text-[#24AE7C]":"text-[#F37877]"}`}>{status}</span>
    </div>
  );
};

export default StatusCell;
