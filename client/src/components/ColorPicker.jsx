import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = ({ color, disableAlpha, onChange }) => {
  // This component is now a controlled component.
  // It receives the current color and an onChange handler from its parent.
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={color}
        disableAlpha={disableAlpha}
        onChange={onChange}
      />
    </div>
  );
};

export default ColorPicker