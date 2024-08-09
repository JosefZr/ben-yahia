import React from "react";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ value, onChange, onClear }) => {
    return (
        <Input
        isClearable
        className="w-full sm:max-w-[250px]"
        placeholder="Search by name or email"
        startContent={<IoSearch />}
        value={value}
        onClear={onClear}
        onChange={onChange}
        size="lg"
        />
    );
};

export default SearchInput;
