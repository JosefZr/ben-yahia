import React from "react";

const StatusCell = ({ status }) => {
  const bgClass = status === "en_attent" ? "bg-default-200" : status === "confirmed" ? "bg-success" : "bg-danger";

  return (
    <div className={`${bgClass} text-center rounded-3xl px-[0.8rem] py-[0.4rem] font-semibold`}>
      {status}
    </div>
  );
};

export default StatusCell;
