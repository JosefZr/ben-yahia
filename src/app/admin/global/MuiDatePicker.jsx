import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import "../../[locale]/globals.css"
const MuiDatePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select a date"
        value={value}
        onChange={onChange}
        className="rounded-date-picker "

        renderInput={(params) => (
          <TextField
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;
