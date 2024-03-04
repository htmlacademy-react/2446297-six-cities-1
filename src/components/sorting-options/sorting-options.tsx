import { useState, useEffect, memo } from 'react';
import { SORT_OPTIONS } from '../../const';
import { City } from '../../types/offer';

type SortingOptionsProps = {
  sortingOption: string;
  onOptionChange: (option: string) => void;
  city: City | null;
};

function SortingOptionsBlock({sortingOption, onOptionChange, city}: SortingOptionsProps): JSX.Element {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  const handleSortBlockClick = () => {
    setOptionsIsOpen(!optionsIsOpen);
  };

  const handleSortOptionClick = (option: string) => {
    onOptionChange(option);
    setOptionsIsOpen(!optionsIsOpen);
  };

  useEffect(() => {
    setOptionsIsOpen(false);
  }, [city]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortBlockClick}>
        {sortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${ optionsIsOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => {
          const keyValue = option;
          return (
            <li key={keyValue}
              className={`places__option ${ sortingOption === option ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSortOptionClick(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

const SortingOptions = memo(SortingOptionsBlock);
export default SortingOptions;
