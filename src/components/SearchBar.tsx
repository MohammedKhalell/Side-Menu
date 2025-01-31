import React, { InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, ...inputProps }) => {
  return (
    <div className={`search-bar ${className || ""}`}>
      <img
        src={`/icons/${className}.svg`}
        alt={`icon`}
        className="search-icon-button"
      />
      <input {...inputProps} className="search-input" />
    </div>
  );
};

export default SearchBar;
