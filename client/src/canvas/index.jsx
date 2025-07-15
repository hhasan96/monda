import { Canvas } from '@react-three/fiber'
import { Center } from '@react-three/drei';
import { useSnapshot } from 'valtio';

import state from '../store';
import Shirt from './Shirt';
import Shirt2 from './Shirt2';
import Hoodie from './Hoodie'; // Import the Hoodie component
import CameraRig from './CameraRig';

const CanvasModel = () => {
  const snap = useSnapshot(state);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />

      <CameraRig>
        <Center>
          {/* Render the correct model based on the active item */}
          {snap.activeItem === 'shirt' && <Shirt />}
          {snap.activeItem === 'shirt2' && <Shirt2 />}
          {snap.activeItem === 'hoodie' && <Hoodie />}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
