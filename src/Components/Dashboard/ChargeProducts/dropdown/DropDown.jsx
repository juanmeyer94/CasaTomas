import React from 'react';

const DropDown = ({ name, subtypes, func, title }) => {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    func(selectedValue);
  };

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-br px-4 py-4 mx-4 my-4'>
      <h1 className="text-4xl font-bold mb-4">{title}...</h1>
      <label className="for-dropdown mb-2" htmlFor="dropdown">
        ¿Qué tipo de {name}? <i className="uil uil-arrow-down"></i>
      </label>
      <select
        className="outline-none focus:outline-none p-2 bg-white rounded-3xl"
        onChange={handleSelectChange}
      >
        <option value="#" disabled selected hidden>
          Selecciona una opción
        </option>
        {subtypes.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;

