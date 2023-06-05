import { ChangeEvent, useState } from 'react';
import  {debounce}  from 'lodash';
import { TSearchFilterProps } from '../Types/Filter';



function SearchFilter({ setPage, filter, setFilter }:TSearchFilterProps) {
  const [searchValue, setSearchValue] = useState(filter);

  const handleFilterChange = debounce((value: string) => {
    setFilter(value);
    setPage(1);
  }, 1000); // debounce delay 

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    handleFilterChange(value);
  };

  return (
    <div className='searchfilter-margin-auto'>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
        className="searchfilter"
      />
    </div>
  );
}

export default SearchFilter;
