import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-wrap">
      <div className='lds-spinner'>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
}

export default Spinner;
