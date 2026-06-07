import React from 'react';
import './Menu.scss';

interface MenuProps {
  index: number;
  section: {
    count: number;
    selectedOption: string;
    isSold: boolean;
    isReserv: boolean;
    isTV: boolean;
    isSerialless: boolean;
    name: string;
  };
  markAsSold: (index: number) => void;
  markAsReserved: (index: number) => void;
  markAsTV: (index: number) => void;
  markAsSerialless: (index: number) => void;
  removeSection: (index: number) => void;
  handleCountChange: (index: number, newCount: number) => void;
  handleOptionSelect: (index: number, option: string) => void;
}

const SERIAL_CARS = [
  'Epsilon Roadster',
  'Verona Evo',
  'Widow',
  'Corsair',
  'RB55 Evo',
  'R299 GTR',
  'Clover',
  'Clover Evo',
  'Oni',
  'Rocket Kart',
  'Carbon Prodigo',
  'Trout XTreme',
  'Sidewinder',
];

const Menu: React.FC<MenuProps> = ({
  index,
  section,
  markAsSold,
  markAsReserved,
  markAsTV,
  markAsSerialless,
  removeSection,
  handleCountChange,
  handleOptionSelect,
}) => {
  const hasSerial = SERIAL_CARS.includes(section.name);

  return (
    <div className="menu">
      <button className="menu-button">☰</button>

      <div className="menu-content">
        <div className="count-controls">
          <button
            onClick={() => {
              if (section.count > 1) {
                handleCountChange(index, section.count - 1);
              }
            }}
            disabled={section.count <= 1}
            className="count-controls-button"
          >
            -
          </button>
          <input
            type="number"
            value={section.count}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value) && value > 0) {
                handleCountChange(index, value);
              }
            }}
            className="count-controls-button"
            min="1"
            onWheel={(e) => {
              e.preventDefault();
              if (e.deltaY < 0) {
                handleCountChange(index, section.count + 1);
              } else {
                if (section.count > 1) {
                  handleCountChange(index, section.count - 1);
                }
              }
            }}
          />
          <button
            onClick={() => handleCountChange(index, section.count + 1)}
            className="count-controls-button"
          >
            +
          </button>
        </div>

        <div className="option-buttons">
          {['PU', 'FM', 'FS'].map((option) => (
            <button
              key={option}
              className={`option-button ${section.selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(index, option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button className="allow-tv-button menu-button" onClick={() => markAsTV(index)}>
          {section.isTV ? 'Disallow TV' : 'Allow TV'}
        </button>
        <button className="sold-button menu-button" onClick={() => markAsSold(index)}>
          {section.isSold ? 'Not Sold' : 'Sold'}
        </button>
        <button className="reserved-button menu-button" onClick={() => markAsReserved(index)}>
          {section.isReserv ? 'Not Reserved' : 'Reserved'}
        </button>
        {hasSerial && (
          <button
            className={`serialless-button menu-button ${section.isSerialless ? 'serialless-active' : ''}`}
            onClick={() => markAsSerialless(index)}
          >
            {section.isSerialless ? 'Serial' : 'Serialless'}
          </button>
        )}
        <button className="close-button menu-button" onClick={() => removeSection(index)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Menu;
