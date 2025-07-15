import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if(type === 'filled') {
      return {
        backgroundColor: snap.items[snap.activeItem].color,
        color: getContrastingColor(snap.items[snap.activeItem].color)
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: snap.items[snap.activeItem].color,
        color: snap.items[snap.activeItem].color
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton