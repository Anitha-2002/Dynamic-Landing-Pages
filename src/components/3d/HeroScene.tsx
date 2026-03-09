import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { CameraKeyframe } from '../../services/hotelApi'

function lerpArray(a: number[], b: number[], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

function interpolateCameraPath(
  cameraPath: CameraKeyframe[],
  progress: number
): { position: [number, number, number]; lookAt: [number, number, number] } {
  if (!cameraPath.length) {
    return { position: [0, 1.5, 4], lookAt: [0, 1, 0] }
  }
  if (cameraPath.length === 1) {
    return {
      position: cameraPath[0].position,
      lookAt: cameraPath[0].lookAt,
    }
  }
  let i = 0
  for (; i < cameraPath.length - 1; i++) {
    if (progress <= cameraPath[i + 1].scroll) break
  }
  const curr = cameraPath[i]
  const next = cameraPath[Math.min(i + 1, cameraPath.length - 1)]
  const range = next.scroll - curr.scroll
  const t = range === 0 ? 1 : (progress - curr.scroll) / range
  return {
    position: lerpArray(curr.position, next.position, t),
    lookAt: lerpArray(curr.lookAt, next.lookAt, t),
  }
}

interface HeroSceneProps {
  primaryImage: string | undefined
  cameraPath: CameraKeyframe[]
  scrollProgress: { get: () => number }
}

export function HeroScene({ primaryImage, cameraPath, scrollProgress }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), [])

  useEffect(() => {
    if (!primaryImage) {
      setTexture(null)
      return
    }
    let tex: THREE.Texture | null = null
    const loader = new THREE.TextureLoader()
    loader.load(
      primaryImage,
      (t) => {
        t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
        tex = t
        setTexture(t)
      },
      undefined,
      () => setTexture(null)
    )
    return () => { tex?.dispose() }
  }, [primaryImage])

  useFrame((state) => {
    const progress = typeof scrollProgress.get === 'function' ? scrollProgress.get() : 0
    const { position, lookAt } = interpolateCameraPath(cameraPath, progress)
    state.camera.position.set(...position)
    state.camera.lookAt(new THREE.Vector3(...lookAt))
    state.camera.updateProjectionMatrix()
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
      <mesh ref={meshRef} geometry={geometry} position={[0, 1, 0]}>
        {texture ? (
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        ) : (
          <meshBasicMaterial color="#1e3a5f" side={THREE.DoubleSide} />
        )}
      </mesh>
    </group>
  )
}
