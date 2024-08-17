import React from "react";
import { Pagination } from "@nextui-org/react";

const TableFooterPagination = ({ page, pages, setPage }) => (
  <div className="py-2 px-2 flex justify-center items-center">
    <Pagination
      showControls
      classNames={{ cursor: "bg-[#19592A] text-background" }}
      page={page}
      total={pages}
      variant="flat"
      onChange={setPage}
      isCompact
      showShadow
    />
  </div>
);

export default TableFooterPagination;
