import React, { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, ...inputProps }) => {
  return (
    <div className={`search-bar ${className || ''}`}>
      <Search size={20} className="search-icon" />
      <input {...inputProps} />
    </div>
  );
};

export default SearchBar;
