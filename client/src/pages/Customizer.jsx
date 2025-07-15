// Forcing a re-render to solve potential import issues
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes, ItemTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");

  // This useEffect is added to force a re-render and solve potential cache issues.
  useEffect(() => {
    // No logic needed here, its presence is enough to trigger the update.
  }, [snap.activeItem]);

  // Get the current item's state from the global state
  const activeItemState = snap.items[snap.activeItem];

  // Define activeFilterTab based on the active item's state
  const activeFilterTab = {
    logoTexture: activeItemState.isLogoTexture,
    fullTexture: activeItemState.isFullTexture,
  };

  // Show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker
          key={snap.activeItem}
          // Pass color from the active item
          color={activeItemState.color}
          // Update color for the active item
          disableAlpha
          onChange={(color) => {
            state.items[state.activeItem].color = color.hex;
          }}
        />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state.items[snap.activeItem][decalType.stateProperty] = result;

    if (type === 'logo') {
      state.items[snap.activeItem].isLogoTexture = true;
      state.items[snap.activeItem].isFullTexture = false;
    } else {
      state.items[snap.activeItem].isFullTexture = true;
      state.items[snap.activeItem].isLogoTexture = false;
    }
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  // Switch the active item in the state
  const handleActiveItem = (itemName) => {
    state.activeItem = itemName;
  }

  const handleActiveFilterTab = (tabName) => {
    const activeItem = state.items[snap.activeItem];

    switch (tabName) {
      case "logoTexture":
        activeItem.isLogoTexture = !activeItem.isLogoTexture;
        activeItem.isFullTexture = false;
        break;
      case "fullTexture":
        activeItem.isFullTexture = !activeItem.isFullTexture;
        activeItem.isLogoTexture = false;
        break;
      default:
        activeItem.isLogoTexture = true;
        activeItem.isFullTexture = false;
    }
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>

          {/* Item switching tabs */}
          <motion.div
            className='item-tabs-container'
            {...slideAnimation("up")}
          >
            {ItemTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveItem(tab.name)}
                isActiveTab={snap.activeItem === tab.name}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer;