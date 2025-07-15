import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Hoodie = () => {
  const snap = useSnapshot(state);
  const hoodieState = snap.items.hoodie;
  const { nodes, materials } = useGLTF('/hoodie.glb');


  const logoTexture = useTexture(hoodieState.logoDecal);
  const fullTexture = useTexture(hoodieState.fullDecal);

  useFrame((state, delta) => {
    if (materials.DefaultMaterial?.color) {
      easing.dampC(materials.DefaultMaterial.color, snap.items.hoodie.color, 0.25, delta);
    }
  });

  return (
    <group rotation={[90, Math.PI, Math.PI]} scale={0.3}>
      <mesh
        castShadow
        geometry={nodes.Mesh10.geometry}
        material={materials.DefaultMaterial}
        material-roughness={1}
        dispose={null}
      >
        {hoodieState.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {hoodieState.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Hoodie;