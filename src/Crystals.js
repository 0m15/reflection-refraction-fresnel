import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import BackfaceMaterial from './BackfaceMaterial'
import RefractionMaterial from './RefractionMaterial'
import { WebGLRenderTarget, Object3D } from 'three'

// material taken from https://codesandbox.io/embed/r3f-moksha-f1ixt
export default function Crystals({ count = 10 }) {
  const mesh = useRef()

  const { size, gl, scene, camera } = useThree()
  const ratio = gl.getPixelRatio()

  const [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial] = useMemo(() => {
    const envFbo = new WebGLRenderTarget(size.width * ratio, size.height * ratio)
    const backfaceFbo = new WebGLRenderTarget(size.width * ratio, size.height * ratio)
    const backfaceMaterial = new BackfaceMaterial()
    const refractionMaterial = new RefractionMaterial({
      envMap: envFbo.texture,
      backfaceMap: backfaceFbo.texture,
      resolution: [size.width * ratio, size.height * ratio]
    })
    return [envFbo, backfaceFbo, backfaceMaterial, refractionMaterial]
  }, [size, ratio])

  let initialTarget
  useFrame(({ gl: glCurrent, clock }) => {
    if (!initialTarget) initialTarget = glCurrent.getRenderTarget()

    mesh.current.rotation.set(0, clock.getElapsedTime() * 0.15, 0)

    gl.autoClear = false
    camera.layers.set(0)
    gl.setRenderTarget(envFbo)
    gl.clearColor()
    gl.render(scene, camera)
    gl.clearDepth()
    camera.layers.set(1)
    mesh.current.material = backfaceMaterial
    gl.setRenderTarget(backfaceFbo)
    gl.clearDepth()
    gl.render(scene, camera)
    camera.layers.set(0)
    gl.setRenderTarget(null)
    gl.render(scene, camera)
    gl.clearDepth()
    camera.layers.set(1)
    mesh.current.material = refractionMaterial
    gl.render(scene, camera)
  })

  return (
    <mesh ref={mesh} layers={1} position={[0, 0, 0]}>
      {/*<dodecahedronBufferGeometry attach="geometry" args={[1.5]} />*/}
      {/*<sphereBufferGeometry attach="geometry" args={[1, 3, 2]} />*/}
      <coneBufferGeometry attach="geometry" args={[1, 2, 4]} />
    </mesh>
  )
}
