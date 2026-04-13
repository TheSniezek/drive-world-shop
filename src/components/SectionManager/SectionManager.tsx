import React, { useState, useEffect, useRef } from 'react';
import SectionComponent from './SectionComponent';
import ImageModal from './ImageModal';
import './SectionManager.scss';
import ReactDOM from 'react-dom';
import { carImages } from './CarList';

export interface Section {
  id: number;
  image: string;
  name: string;
  price: string;
  tvValue: string;
  isSold: boolean;
  isReserv: boolean;
  isTV: boolean;
  isDesc: boolean;
  selectedOption: string;
  count: number;
  serial: string;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddSectionVisible, setIsAddSectionVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isWatermark, setIsWatermark] = useState(true);
  const [copiedText, setCopiedText] = useState<string>('Copy as text');
  const [isUpdateVisible, setIsUpdateVisible] = useState(true);

  useEffect(() => {
    const savedSections = localStorage.getItem('sections');
    if (savedSections) {
      console.log('Loaded sections from localStorage:', JSON.parse(savedSections));
      setSections(JSON.parse(savedSections));
    }

    const savedWatermarkState = localStorage.getItem('watermarkVisible');
    if (savedWatermarkState !== null) {
      setIsWatermark(savedWatermarkState === 'true');
    }

    const savedInfoState = localStorage.getItem('infoVisible');
    if (savedInfoState !== null) {
      setIsInfoVisible(savedInfoState === 'true');
    }
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      console.log('Saving sections to localStorage:', sections);
      localStorage.setItem('sections', JSON.stringify(sections));
    }
  }, [sections]);

  useEffect(() => {
    setImageList(carImages);
  }, []);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length,
        image: '',
        name: '',
        price: '',
        tvValue: '',
        isSold: false,
        isReserv: false,
        isTV: false,
        isDesc: false,
        selectedOption: 'FS',
        count: 1,
        serial: '',
      },
    ]);
  };

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const markAsSold = (index: number) => {
    const newSections = [...sections];
    newSections[index].isSold = !newSections[index].isSold;
    if (newSections[index].isSold) {
      newSections[index].isReserv = false;
    }
    setSections(newSections);
  };

  const markAsReserved = (index: number) => {
    const newSections = [...sections];
    newSections[index].isReserv = !newSections[index].isReserv;
    if (newSections[index].isReserv) {
      newSections[index].isSold = false;
    }
    setSections(newSections);
  };

  const markAsTV = (index: number) => {
    const newSections = [...sections];
    newSections[index].isTV = !newSections[index].isTV;
    setSections(newSections);
  };

  const openImageModal = (index: number) => {
    setSelectedSectionIndex(index);
    setIsModalOpen(true);
  };

  const selectImage = (image: string) => {
    if (selectedSectionIndex !== null) {
      const newSections = [...sections];
      newSections[selectedSectionIndex].image = image;

      const imageName = image.split('/').pop()?.split('.')[0] || '';
      const cleanedImageName =
        imageName === "'Rotary Evo'"
          ? '"Rotary Evo"'
          : imageName === "Insect 'Hubert'"
            ? 'Insect "Hubert"'
            : imageName === "B-127 'Bumblebee'"
              ? 'B-127 "Bumblebee"'
              : imageName === "D-16 'Megatron'"
                ? 'D-16 "Megatron"'
                : imageName === "Elita-1 'Elita'"
                  ? 'Elita-1 "Elita"'
                  : imageName === "Nightline S35 'Fury'"
                    ? 'Nightline S35 "Fury"'
                    : imageName === "Orion Pax 'Optimus Prime'"
                      ? 'Orion Pax "Optimus Prime"'
                      : imageName === 'KITE'
                        ? 'K.I.T.E'
                        : imageName === "LUX 800 'Morikawa'"
                          ? 'LUX 800 "Morikawa"'
                          : imageName === "Camo 'Medal Edition'"
                            ? 'Camo "Medal Edition"'
                            : imageName === "Camo 'elf Edition'"
                              ? 'Camo "e.l.f. Edition"'
                              : imageName === "Cherry Stock 'Twitch Edition'"
                                ? 'Cherry Stock "Twitch Edition"'
                                : imageName;
      newSections[selectedSectionIndex].name = cleanedImageName;

      setSections(newSections);
      setIsModalOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredImages = imageList.filter((image) =>
    image.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].name = e.target.value;
    setSections(newSections);
  };

  const handleOptionSelect = (index: number, option: string) => {
    const newSections = [...sections];
    newSections[index].selectedOption = option;
    setSections(newSections);
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].price = e.target.value;
    setSections(newSections);
  };

  const handleTvValueChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    newSections[index].tvValue = e.target.value;
    setSections(newSections);
  };

  const handleCountChange = (index: number, newCount: number) => {
    const newSections = [...sections];
    newSections[index].count = newCount;
    setSections(newSections);
  };

  const toggleAddSectionVisibility = () => {
    setIsAddSectionVisible((prev) => !prev);
  };

  const toggleOwnerInfoVisibility = () => {
    const newState = !isInfoVisible;
    setIsInfoVisible(!isInfoVisible);
    localStorage.setItem('infoVisible', newState.toString());
  };

  const toggleUpdateVisibility = () => {
    setIsUpdateVisible(!isUpdateVisible);
  };

  const toggleWatermarkVisibility = () => {
    const newState = !isWatermark;
    setIsWatermark(!isWatermark);
    localStorage.setItem('watermarkVisible', newState.toString());
  };

  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSections = [...sections];
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      newSections[index].serial = inputValue ? `#${inputValue}` : '';
    } else {
      newSections[index].serial = inputValue;
    }

    setSections(newSections);
  };

  const handleDragStart = (index: number) => {
    setSelectedSectionIndex(index);
  };

  const handleDrop = (index: number) => {
    if (selectedSectionIndex !== null && selectedSectionIndex !== index) {
      const newSections = [...sections];
      const [movedSection] = newSections.splice(selectedSectionIndex, 1);
      newSections.splice(index, 0, movedSection);
      setSections(newSections);
      setSelectedSectionIndex(null);
    }
  };

  const detailsRef = useRef<HTMLDivElement>(null);

  const handleAction = async (
    action: 'screenshot' | 'copy' | 'slicedScreenshot' | 'copyFormattedText',
  ) => {
    setIsEditing(false); // Set editing to false

    if (action === 'screenshot') {
      await captureFullSiteScreenshot();
    } else if (action === 'slicedScreenshot') {
      await captureScreenshotsInGroups();
    } else if (action === 'copy') {
      await copyToClipboard();
    } else if (action === 'copyFormattedText') {
      // New action
      await copyFormattedTextToClipboard();
    }

    setIsEditing(true); // Set editing back to true after action
  };

  const captureScreenshotsInGroups = async () => {
    const sectionsPerImage = 6; // Number of sections per image
    const totalSections = sections.length; // Total number of sections
    const numberOfImages = Math.ceil(totalSections / sectionsPerImage); // Calculate how many images we need

    for (let i = 0; i < numberOfImages; i++) {
      const start = i * sectionsPerImage; // Starting index for the current group
      const end = start + sectionsPerImage; // Ending index for the current group
      const sectionsToCapture = sections.slice(start, end); // Get the sections for the current image

      // Create a temporary container to render the sections to capture
      const tempContainer = document.createElement('div');
      tempContainer.style.display = 'flex'; // Optional: Adjust layout as needed
      tempContainer.style.flexWrap = 'wrap'; // Optional: Adjust layout as needed
      tempContainer.style.backgroundColor = '#1e2122'; // Optional: Adjust layout as needed
      tempContainer.style.padding = '10px'; // Optional: Add padding for better spacing

      // Render only the sections that belong to the current group
      sectionsToCapture.forEach((section) => {
        const sectionElement = document.createElement('div');
        sectionElement.style.width = 'calc(100% / 3)'; // Adjust width for 3 sections per row
        sectionElement.style.boxSizing = 'border-box'; // Ensure padding/margin doesn't affect width
        sectionElement.style.padding = '10px';
        ReactDOM.render(
          <SectionComponent
            key={section.id}
            section={section}
            index={section.id}
            markAsSold={() => {}}
            markAsReserved={() => {}}
            markAsTV={() => {}}
            removeSection={() => {}}
            handleCountChange={() => {}}
            handleTextChange={() => {}}
            handleCustomTextChange={() => {}}
            handleTvValueChange={() => {}}
            openImageModal={() => {}}
            handleOptionSelect={() => {}}
            handleSerialChange={() => {}}
            isEditing={false}
          />,
          sectionElement,
        );

        tempContainer.appendChild(sectionElement);
      });

      // Append the temporary container to the body
      document.body.appendChild(tempContainer);

      // Capture the screenshot of the current group
      await captureScreenshot(tempContainer); // Pass the tempContainer here

      // Remove the temporary container from the body
      document.body.removeChild(tempContainer);
    }
  };

  const captureFullSiteScreenshot = async () => {
    if (detailsRef.current) {
      await captureScreenshot(detailsRef.current);
    }
  };

  const captureScreenshot = async (element: HTMLElement) => {
    const initialAddSectionVisibility = isAddSectionVisible;
    setIsAddSectionVisible(false);

    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');

    const date = new Date();
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}.${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}.${date.getSeconds().toString().padStart(2, '0')}`;
    const dynamicFilename = `project_drive_world_${formattedDate}_${formattedTime}.png`;

    const link = document.createElement('a');
    link.href = imgData;
    link.download = dynamicFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsAddSectionVisible(initialAddSectionVisibility);
  };

  const copyToClipboard = async () => {
    if (detailsRef.current) {
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(detailsRef.current, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });

      canvas.toBlob(async (blob: Blob | null) => {
        if (blob) {
          try {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          } catch (err) {
            console.error('Failed to copy image:', err);
          }
        }
      }, 'image/png');
    }
  };

  const copyFormattedTextToClipboard = async () => {
    const formattedText = sections
      .map((section) => {
        if (section.name && section.selectedOption) {
          return `${section.selectedOption} ${section.name}`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(formattedText);
      setCopiedText('Copied!');
      setTimeout(() => setCopiedText('Copy as text'), 2000);
    } catch (err) {
      console.error('Failed to copy formatted text:', err);
      setCopiedText('Failed to copy');
    }
  };

  return (
    <div>
      {isInfoVisible && (
        <div className="info-header">
          <span>Site made by @v1sniezek on Discord</span>
          <span>
            If you want to support the project here's my kofi&nbsp;
            <a href="https://ko-fi.com/Z8Z21P9ZG6" target="blank" className="info-header-link">
              TheSniezek
            </a>
          </span>
        </div>
      )}
      {isUpdateVisible && (
        <div className="update-section">
          <div className="update-title">April 13, 2026 - Update 96</div>
          {/* <div className="update-updated-section">
            <div className="update-updated section-tittle">UPDATED</div>
            <div className="update-updated">
              Andromeda ● Arcane Evo ● Crescendo ● Fury ● Requiem ● Spectra ● Trident ● Trident
              'Victory'
            </div>
            <div className="update-updated count">8 Cars</div>
          </div> */}
          <div className="update-added-section">
            <div className="update-added section-tittle left">ADDED</div>
            <div className="update-added">
              Bunny Pal ● Carbon Chrono ● Cavalier ● Couchmobile ● Honey Bee ● Manta CT3 ● Streiter
              DLR
            </div>
            <div className="update-added count right">7 Cars</div>
          </div>
          {/* <div className="update-deleted-section">
            <div className="update-deleted left section-tittle">DELETED</div>
            <div className="update-deleted">
              Trex Beast ● Beast ● Trex ● Stallion ● Stallion M ● Stallion M Race ● Stallion
              Cabriolet ● Stallion Patrol ● Stallion350 ● Stallion500 ● Buck ● Buck Rally ● Focal RS
              ● Rally RS
            </div>
            <div className="update-deleted right count">14 Cars</div>
          </div> */}
        </div>
      )}
      <div className="toolbar-header">
        <div className="toolbar-header-container">
          <div className="toolbar-section" onClick={() => handleAction('screenshot')}>
            <div className="toolbar-info">Save as image</div>
          </div>

          <div className="toolbar-section" onClick={() => handleAction('copy')}>
            <div className="toolbar-info">Copy to the clipboard</div>
          </div>
          <div className="toolbar-section" onClick={() => handleAction('copyFormattedText')}>
            <div className="toolbar-info">{copiedText}</div>
          </div>
        </div>
        <div className="toolbar-header-container">
          <div className="toolbar-section" onClick={toggleAddSectionVisibility}>
            <div className="toolbar-info">
              {isAddSectionVisible ? 'Hide add section indicator' : 'Show add section indicator'}
            </div>
          </div>
          <div className="toolbar-section" onClick={toggleWatermarkVisibility}>
            <div className="toolbar-info">{isWatermark ? 'Hide watermark' : 'Show watermark'}</div>
          </div>
        </div>
        <div className="toolbar-header-container">
          <div className="toolbar-section" onClick={toggleUpdateVisibility}>
            <div className="toolbar-info">
              {isUpdateVisible ? 'Hide update info' : 'Show update info'}
            </div>
          </div>
          <div className="toolbar-section end" onClick={toggleOwnerInfoVisibility}>
            <div className="toolbar-info">
              {isInfoVisible ? "Hide owner's info" : "Show owner's info"}
            </div>
          </div>
        </div>
        {/* <div className="toolbar-section"></div> */}
      </div>
      <div className="sections-body" ref={detailsRef}>
        {isWatermark && (
          <div className="watermark">
            <span>Made with projectdriveworld.netlify.app</span>
          </div>
        )}
        <div className={`sections-center ${isWatermark ? 'sections-center-watermark' : ''}`}>
          <div className="sections-container">
            {sections.map((section, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              >
                <SectionComponent
                  key={index}
                  section={section}
                  index={index}
                  markAsSold={markAsSold}
                  markAsReserved={markAsReserved}
                  markAsTV={markAsTV}
                  removeSection={removeSection}
                  handleCountChange={handleCountChange}
                  handleTextChange={handleTextChange}
                  handleCustomTextChange={handleCustomTextChange}
                  handleTvValueChange={handleTvValueChange}
                  openImageModal={openImageModal}
                  handleOptionSelect={handleOptionSelect}
                  handleSerialChange={handleSerialChange}
                  isEditing={isEditing}
                />
              </div>
            ))}

            {isModalOpen && (
              <ImageModal
                images={filteredImages}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                selectImage={selectImage}
                closeModal={() => setIsModalOpen(false)}
              />
            )}

            {isAddSectionVisible && (
              <div className="add-section" onClick={addSection}>
                <span>+</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionManager;
