// /* eslint-disable react/no-unknown-property */
// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { Canvas, extend, useFrame } from '@react-three/fiber';
// import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
// import {
//   BallCollider,
//   CuboidCollider,
//   Physics,
//   RigidBody,
//   useRopeJoint,
//   useSphericalJoint,
//   RigidBodyProps
// } from '@react-three/rapier';
// import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
// import * as THREE from 'three';
// import { Mail, Linkedin, Github, Code, Instagram, ExternalLink } from 'lucide-react';

// // You'll need to replace these with your actual imports
// // import cardGLB from './card.glb';
// // import lanyard from './lanyard.png';

// extend({ MeshLineGeometry, MeshLineMaterial });

// interface LanyardProps {
//   position?: [number, number, number];
//   gravity?: [number, number, number];
//   fov?: number;
//   transparent?: boolean;
// }

// function LanyardScene({
//   position = [0, 0, 24],
//   gravity = [0, -40, 0],
//   fov = 20,
//   transparent = true
// }: LanyardProps) {
//   const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = (): void => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <Canvas
//       camera={{ position, fov }}
//       dpr={[1, isMobile ? 1.5 : 2]}
//       gl={{ alpha: transparent }}
//       onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
//     >
//       <ambientLight intensity={Math.PI} />
//       <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
//         <Band isMobile={isMobile} />
//       </Physics>
//       <Environment blur={0.75}>
//         <Lightformer
//           intensity={2}
//           color="white"
//           position={[0, -1, 5]}
//           rotation={[0, 0, Math.PI / 3]}
//           scale={[100, 0.1, 1]}
//         />
//         <Lightformer
//           intensity={3}
//           color="white"
//           position={[-1, -1, 1]}
//           rotation={[0, 0, Math.PI / 3]}
//           scale={[100, 0.1, 1]}
//         />
//         <Lightformer
//           intensity={3}
//           color="white"
//           position={[1, 1, 1]}
//           rotation={[0, 0, Math.PI / 3]}
//           scale={[100, 0.1, 1]}
//         />
//         <Lightformer
//           intensity={10}
//           color="white"
//           position={[-10, 0, 14]}
//           rotation={[0, Math.PI / 2, Math.PI / 3]}
//           scale={[100, 10, 1]}
//         />
//       </Environment>
//     </Canvas>
//   );
// }

// interface BandProps {
//   maxSpeed?: number;
//   minSpeed?: number;
//   isMobile?: boolean;
// }

// function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
//   const band = useRef<any>(null);
//   const fixed = useRef<any>(null);
//   const j1 = useRef<any>(null);
//   const j2 = useRef<any>(null);
//   const j3 = useRef<any>(null);
//   const card = useRef<any>(null);

//   const vec = new THREE.Vector3();
//   const ang = new THREE.Vector3();
//   const rot = new THREE.Vector3();
//   const dir = new THREE.Vector3();

//   const segmentProps: any = {
//     type: 'dynamic' as RigidBodyProps['type'],
//     canSleep: true,
//     colliders: false,
//     angularDamping: 4,
//     linearDamping: 4
//   };

//   // Mock geometry - replace with actual GLTF
//   const nodes = {
//     card: { geometry: new THREE.BoxGeometry(1, 1.5, 0.02) },
//     clip: { geometry: new THREE.BoxGeometry(0.3, 0.1, 0.05) },
//     clamp: { geometry: new THREE.BoxGeometry(0.2, 0.15, 0.03) }
//   };
  
//   const materials = {
//     base: { map: null },
//     metal: new THREE.MeshStandardMaterial({ color: '#888888', metalness: 0.9, roughness: 0.3 })
//   };

//   // Create a simple texture for the lanyard
//   const canvas = document.createElement('canvas');
//   canvas.width = 512;
//   canvas.height = 64;
//   const ctx = canvas.getContext('2d')!;
//   ctx.fillStyle = '#ffffff';
//   ctx.fillRect(0, 0, 512, 64);
//   ctx.fillStyle = '#000000';
//   ctx.font = 'bold 24px Arial';
//   ctx.fillText('CONTACT ME', 180, 40);
//   const texture = new THREE.CanvasTexture(canvas);

//   const [curve] = useState(
//     () =>
//       new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
//   );
//   const [dragged, drag] = useState<false | THREE.Vector3>(false);
//   const [hovered, hover] = useState(false);

//   useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
//   useSphericalJoint(j3, card, [
//     [0, 0, 0],
//     [0, 1.45, 0]
//   ]);

//   useEffect(() => {
//     if (hovered) {
//       document.body.style.cursor = dragged ? 'grabbing' : 'grab';
//       return () => {
//         document.body.style.cursor = 'auto';
//       };
//     }
//   }, [hovered, dragged]);

//   useFrame((state, delta) => {
//     if (dragged && typeof dragged !== 'boolean') {
//       vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
//       dir.copy(vec).sub(state.camera.position).normalize();
//       vec.add(dir.multiplyScalar(state.camera.position.length()));
//       [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
//       card.current?.setNextKinematicTranslation({
//         x: vec.x - dragged.x,
//         y: vec.y - dragged.y,
//         z: vec.z - dragged.z
//       });
//     }
//     if (fixed.current) {
//       [j1, j2].forEach(ref => {
//         if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
//         const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
//         ref.current.lerped.lerp(
//           ref.current.translation(),
//           delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
//         );
//       });
//       curve.points[0].copy(j3.current.translation());
//       curve.points[1].copy(j2.current.lerped);
//       curve.points[2].copy(j1.current.lerped);
//       curve.points[3].copy(fixed.current.translation());
//       band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
//       ang.copy(card.current.angvel());
//       rot.copy(card.current.rotation());
//       card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
//     }
//   });

//   curve.curveType = 'chordal';
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

//   return (
//     <>
//       <group position={[0, 4, 0]}>
//         <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
//         <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody
//           position={[2, 0, 0]}
//           ref={card}
//           {...segmentProps}
//           type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
//         >
//           <CuboidCollider args={[0.8, 1.125, 0.01]} />
//           <group
//             scale={2.25}
//             position={[0, -1.2, -0.05]}
//             onPointerOver={() => hover(true)}
//             onPointerOut={() => hover(false)}
//             onPointerUp={(e: any) => {
//               e.target.releasePointerCapture(e.pointerId);
//               drag(false);
//             }}
//             onPointerDown={(e: any) => {
//               e.target.setPointerCapture(e.pointerId);
//               drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
//             }}
//           >
//             <mesh geometry={nodes.card.geometry}>
//               <meshPhysicalMaterial
//                 color="#1a1a1a"
//                 clearcoat={isMobile ? 0 : 1}
//                 clearcoatRoughness={0.15}
//                 roughness={0.9}
//                 metalness={0.8}
//               />
//             </mesh>
//             <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
//             <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
//           </group>
//         </RigidBody>
//       </group>
//       <mesh ref={band}>
//         <meshLineGeometry />
//         <meshLineMaterial
//           color="white"
//           depthTest={false}
//           resolution={isMobile ? [1000, 2000] : [1000, 1000]}
//           useMap
//           map={texture}
//           repeat={[-4, 1]}
//           lineWidth={1}
//         />
//       </mesh>
//     </>
//   );
// }

// export default function ContactLanyardCard() {
//   const socialLinks = [
//     {
//       name: 'Email',
//       href: 'mailto:dhayanithianandan@gmail.com',
//       icon: Mail,
//       label: 'dhayanithianandan@gmail.com'
//     },
//     {
//       name: 'Portfolio',
//       href: 'https://dhayanithi.vercel.app',
//       icon: ExternalLink,
//       label: 'dhayanithi.vercel.app'
//     },
//     {
//       name: 'GitHub',
//       href: 'https://github.com/Dhayanithi-545',
//       icon: Github,
//       label: '@Dhayanithi-545'
//     },
//     {
//       name: 'LinkedIn',
//       href: 'https://www.linkedin.com/in/dhayanithi-anandan/',
//       icon: Linkedin,
//       label: 'Dhayanithi Anandan'
//     },
//     {
//       name: 'LeetCode',
//       href: 'https://leetcode.com/u/Dhayanithi_Anandan/',
//       icon: Code,
//       label: '@Dhayanithi_Anandan'
//     },
//     {
//       name: 'Instagram',
//       href: 'https://www.instagram.com/dhaya_545/',
//       icon: Instagram,
//       label: '@dhaya_545'
//     }
//   ];

//   return (
//     <div className="flex items-center justify-center gap-12 w-full">
//       {/* Lanyard Animation */}
//       <div className="relative w-80 h-96">
//         <LanyardScene position={[0, 0, 24]} gravity={[0, -40, 0]} />
//       </div>

//       {/* Contact Links */}
//       <div className="flex flex-col gap-4">
//         <h3 
//           className="text-4xl font-bold text-white mb-2"
//           style={{ fontFamily: "'Times New Roman', Times, serif" }}
//         >
//           Connect With Me
//         </h3>
        
//         <div className="grid grid-cols-1 gap-3">
//           {socialLinks.map((link) => {
//             const Icon = link.icon;
//             return (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 target={link.href.startsWith('mailto') ? '_self' : '_blank'}
//                 rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
//                 className="group flex items-center gap-4 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-lg transition-all duration-300"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span 
//                     className="text-lg font-semibold text-white"
//                     style={{ fontFamily: "'Times New Roman', Times, serif" }}
//                   >
//                     {link.name}
//                   </span>
//                   <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
//                     {link.label}
//                   </span>
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }