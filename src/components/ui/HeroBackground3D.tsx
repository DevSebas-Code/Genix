/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import * as THREE from 'three';

const ParticleField = () => {
    const points = useRef<THREE.Points>(null);
    // Optimized: Reduced count but increased individual particle presence
    const count = 40000;

    // Generate positions and stable random attributes
    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            // Optimized distribution: Spherical distribution
            const r = 12 + Math.random() * 11.9; // Spread out more
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            scales[i] = Math.random();
        }
        return { positions, scales };
    }, []);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        return geo;
    }, [positions, scales]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
        uColor: { value: new THREE.Color('#e9d5ff') }
    }), []);

    // OPTIMIZATION: Create reusable vector to avoid GC in useFrame
    const targetMouse = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        const { clock, pointer, viewport } = state;

        if (points.current && points.current.material instanceof THREE.ShaderMaterial) {
            points.current.material.uniforms.uTime.value = clock.getElapsedTime();

            // Simple mouse tracking for interacion
            const x = (pointer.x * viewport.width) / 2;
            const y = (pointer.y * viewport.height) / 2;

            // Linear interpolation for smooth mouse movement
            targetMouse.set(x, y, 0);
            points.current.material.uniforms.uMouse.value.lerp(targetMouse, 0.1);

            // Very slow global rotation
            points.current.rotation.y = clock.getElapsedTime() * 0.03;
        }
    });

    // Highly optimized Vertex Shader
    // Removed branching and expensive distance calculations where possible
    const vertexShader = `
        uniform float uTime;
        uniform vec3 uMouse;
        attribute float aScale;
        varying float vAlpha;

        void main() {
            vec3 pos = position;
            
            // Interaction Logic:
            // Calculate squared distance to avoid expensive sqrt() for check
            float dx = pos.x - uMouse.x;
            float dy = pos.y - uMouse.y;
            float distSq = dx*dx + dy*dy;
            float radiusSq = 8000.0; // Squared radius (approx 90.0 units)

            if (distSq < radiusSq) {
                float dist = sqrt(distSq);
                float force = (70.0 - dist) / 70.0;
                
                // Push particles away
                vec2 dir = normalize(vec2(dx, dy));
                pos.xy += dir * force * 9.0; 
                pos.z += force * 12.5; 
            }

            // Gentle wave effect based on time and position
            // Pre-calculate factor to reduce trig calls
            float wave = sin(uTime * 0.15 + pos.x * 0.1) * 0.5;
            pos.y += wave;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Size attenuation
            // Increased base size (300.0) to compensate for lower particle count
            gl_PointSize = (500.0 * aScale) / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
            
            // Fade out particles near camera or far away
            float lenSq = dot(pos, pos);
            // Smooth fade without expensive length() calls if possible, 
            // but length needed for spherical gradient.
            // Using a simple distance falloff
            vAlpha = smoothstep(2500.0, 100.0, lenSq); // Squared thresholds
        }
    `;

    // Optimized Fragment Shader
    const fragmentShader = `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
            // Circular particle drawing optimization
            vec2 center = gl_PointCoord - 0.5;
            float distSq = dot(center, center); // Squared distance
            
            // Discard pixels outside circle radius (0.5^2 = 0.25)
            if (distSq > 0.25) discard;
            
            // Soft glow gradient
            float glow = 1.0 - (sqrt(distSq) * 2.0);
            glow = pow(glow, 1.5); // Sharpen the glow slightly
            
            gl_FragColor = vec4(uColor, vAlpha * glow);
        }
    `;

    return (
        <points ref={points} geometry={geometry}>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

interface HeroBackground3DProps {
    containerRef?: React.RefObject<HTMLElement | null>;
}

// Optimization: Prevent unnecessary re-renders of the entire 3D context
const HeroBackground3D = ({ containerRef }: HeroBackground3DProps) => {
    return (
        <div className="absolute inset-0 z-0 will-change-transform">
            <Canvas
                eventSource={containerRef as React.RefObject<HTMLElement> | undefined}
                className="pointer-events-none"
                camera={{ position: [0, 0, 35], fov: 60 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false // Disable depth buffer for 2D particle overlay effect
                }}
                dpr={[1, 1.5]}
                frameloop="always"
                performance={{ min: 0.5 }}
            >
                <ParticleField />
            </Canvas>
        </div>
    );
};

export default HeroBackground3D;
