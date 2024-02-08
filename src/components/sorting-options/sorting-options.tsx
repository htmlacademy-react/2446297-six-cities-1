import { useState } from 'react';

type SortingOptionsProps = {
  sortingOption: string;
  onOptionChange: (option: string) => void;
};

function SortingOptions({sortingOption, onOptionChange}: SortingOptionsProps): JSX.Element {
  const options = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  const clickSortOptionsHandle = () => {
    setOptionsIsOpen(!optionsIsOpen);
  };

  const clickChooseOptionHandle = (option: string) => {
    onOptionChange(option);
    setOptionsIsOpen(!optionsIsOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={clickSortOptionsHandle}>
        {sortingOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${ optionsIsOpen ? 'places__options--opened' : ''}`}>
        {options.map((option) => {
          const keyValue = option;
          return (
            <li key={keyValue}
              className={`places__option ${ sortingOption === option ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => clickChooseOptionHandle(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </form>
  );
}


export default SortingOptions;
