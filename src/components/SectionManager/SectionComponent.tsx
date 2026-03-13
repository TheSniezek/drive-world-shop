import React from 'react';
import { Section } from './SectionManager';
import Menu from './Menu';
import Overlay from './Overlay';
import './SectionComponent.scss';

interface SectionProps {
  section: Section;
  index: number;
  markAsSold: (index: number) => void;
  markAsReserved: (index: number) => void;
  markAsTV: (index: number) => void;
  removeSection: (index: number) => void;
  handleCountChange: (index: number, newCount: number) => void;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCustomTextChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleTvValueChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  openImageModal: (index: number) => void;
  handleOptionSelect: (index: number, option: string) => void;
  handleSerialChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  isEditing: boolean;
}

const SectionComponent: React.FC<SectionProps> = ({
  section,
  index,
  markAsSold,
  markAsReserved,
  markAsTV,
  removeSection,
  handleCountChange,
  handleCustomTextChange,
  handleTvValueChange,
  openImageModal,
  handleOptionSelect,
  handleSerialChange,
  isEditing,
}) => {
  return (
    <div
      className={`section-container ${section.isSold || section.isReserv ? 'section-overlay' : ''}`}
    >
      <div className="up-container">
        <Menu
          index={index}
          section={section}
          markAsSold={markAsSold}
          markAsReserved={markAsReserved}
          markAsTV={markAsTV}
          removeSection={removeSection}
          handleCountChange={handleCountChange}
          handleOptionSelect={handleOptionSelect}
        />
        {(section.selectedOption === 'FS' ||
          section.selectedOption === 'FM' ||
          section.selectedOption === 'PU') && (
          <div className="right-bottom-corner">
            {section.selectedOption === 'FS' && <span>FS</span>}
            {section.selectedOption === 'FM' && <span>FM</span>}
            {section.selectedOption === 'PU' && <span>PU</span>}
          </div>
        )}
        <div className="image-upload" onClick={() => openImageModal(index)}>
          {!section.image && <span className="plus-icon">+</span>}
          {section.image && <img src={section.image} alt="Uploaded" className="section-image" />}
          {section.count > 1 && !section.isSold && !section.isReserv && (
            <div className="count-display">
              <span>x{section.count}</span>
            </div>
          )}
          {(section.name === 'Epsilon Roadster' ||
            section.name === 'Verona Evo' ||
            section.name === 'Widow' ||
            section.name === 'Corsair' ||
            section.name === 'RB55 Evo' ||
            section.name === 'R299 GTR' ||
            section.name === 'Clover' ||
            section.name === 'Clover Evo' ||
            section.name === 'Oni' ||
            section.name === 'Sidewinder') &&
            (isEditing ? (
              <input
                type="text"
                placeholder="Serial"
                value={section.serial}
                className="serial-number-input section-input"
                onChange={(e) => handleSerialChange(e, index)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className={`serial-number-input section-input`}>{section.serial}</span>
            ))}
          <span className="section-input name-input">{section.name || 'Car'}</span>
        </div>
      </div>

      {!section.isTV && (
        <div className="under-image-content">
          <div className="dollar cash-indicator">$</div>
          {isEditing ? (
            <input
              type="text"
              value={section.price}
              onChange={(e) => handleCustomTextChange(e, index)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Price"
              className={`section-input price-input`}
            />
          ) : (
            <span className={`section-input price-input`}>{section.price}</span>
          )}
        </div>
      )}
      {section.isTV && (
        <div className="under-image-content">
          <div className="dollar value-indicator">$</div>
          {isEditing ? (
            <input
              type="text"
              value={section.price}
              onChange={(e) => handleCustomTextChange(e, index)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Price"
              className={`section-input price-input`}
            />
          ) : (
            <span className={`section-input price-input`}>{section.price}</span>
          )}

          <div className="tv value-indicator">TV</div>
          {isEditing ? (
            <input
              type="text"
              value={section.tvValue}
              onChange={(e) => handleTvValueChange(e, index)}
              onClick={(e) => e.stopPropagation()}
              placeholder="Value"
              className={`section-input price-input`}
            />
          ) : (
            <span className={`section-input price-input`}>{section.tvValue}</span>
          )}
        </div>
      )}

      <Overlay status={section.isSold ? 'sold' : section.isReserv ? 'reserved' : null} />
    </div>
  );
};

export default SectionComponent;
