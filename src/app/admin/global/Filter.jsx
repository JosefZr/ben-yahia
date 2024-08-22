"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";
const FilterButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  font-size:0.9rem;
  padding: 0.2rem 0.4rem;
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      background-color: #2727ff;
      color: white;
    `}

  &:hover:not(:disabled) {
    background-color: #2727ff;
    color: white;
  }

  /* Dark mode styles */
  .dark & {
    background-color: #363639;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2727ff;
      color: white;
    }

    ${(props) =>
      props.active &&
      css`
        background-color: #2727ff;
        color: white;
      `}
  }
`;
function Filter({ filterField, options }) {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(filterField, value);

    // Update the URL with new search params
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }

  return (
    <div className="border-solid border-1 border-gray-150 bg-white dark:bg-[#242428] dark:border-gray-900 shadow-lg rounded-xl p-1 flex gap-1">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

export default Filter;
