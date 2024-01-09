import React, { useState } from 'react';

const ConfigArea = ({
  propertyType,
  setPropertyType,
  houseAge,
  setHouseAge,
  address,
  setAddress,
  onSubmit,
}) => {
  const [selectedButton, setSelectedButton] = useState(propertyType);

  const handlePropertyTypeClick = (selectedType) => {
    setPropertyType(selectedType);
    setSelectedButton(selectedType);
  };

  return (
    <div className="config-area">
      <h2>Configuration</h2>
      <form onSubmit={onSubmit}>
        <label>
            Property Type:
            <div className="property-type-buttons">
            <button
                type="button"
                className={selectedButton === 'apartment' ? 'selected' : ''}
                onClick={() => handlePropertyTypeClick('apartment')}
            >
                Apartment
            </button>
            <button
                type="button"
                className={selectedButton === 'building' ? 'selected' : ''}
                onClick={() => handlePropertyTypeClick('building')}
            >
                Building
            </button>
            <button
                type="button"
                className={selectedButton === 'house' ? 'selected' : ''}
                onClick={() => handlePropertyTypeClick('house')}
            >
                House
            </button>
            </div>
        </label>
        <label>
          House Age:
          <input
            type="text"
            value={houseAge}
            onChange={(e) => setHouseAge(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConfigArea;
