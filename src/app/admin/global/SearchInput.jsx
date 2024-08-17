import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ value, onChange, onClear }) => {
    return (
        <div className="relative w-full sm:max-w-[250px]">
            <IoSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-default-800" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-full pl-8 pr-2 py-[15.5px] bg-default-100 border dark:border-default-100 rounded-2xl focus:outline-none focus:black focus:black"
                placeholder="Search by name or email"
            />
            {value && (
                <button
                    onClick={onClear}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default SearchInput;
