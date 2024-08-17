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
        value={value}
        onChange={onChange}
        className="rounded-date-picker rounded-2xl min-w-28 max-[400px]:w-full bg-default-100"
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              style: {
                color: 'white', // Ensures the input text is white
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white', // Ensures the label text is white
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;
