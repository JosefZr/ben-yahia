import styled, { css } from "styled-components";
import { useContext } from "react";
import { FilterContext } from "@/context/filterContext";

const FilterButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.44rem 0.8rem;
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

export default function Filter() {
  const [searchParams, setSearchParams] = useContext(FilterContext); // use the context
  const currentFilter = searchParams;

  function handleClick(value) {
    setSearchParams(value);
  }

  return (
    <div className="border-solid border-1 border-gray-150 bg-white dark:bg-[#242428] dark:border-gray-900 shadow-lg rounded-xl p-2 flex gap-2">
      <FilterButton
        active={currentFilter === "en_attent"}
        onClick={() => handleClick("en_attent")}
      >
        En_attent
      </FilterButton>
      <FilterButton
        active={currentFilter === "confermer"}
        onClick={() => handleClick("confermer")}
      >
        Confermer
      </FilterButton>
      <FilterButton
        active={currentFilter === "annuler"}
        onClick={() => handleClick("annuler")}
      >
        Annuler
      </FilterButton>
      <FilterButton
        active={currentFilter === ""}
        onClick={() => handleClick("")}
      >
        All
      </FilterButton>
    </div>
  );
}
