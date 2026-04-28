/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import * as THREE from 'three';

// ═══════════════════════════════════════════════
// Layer 1: Primary particle field with connection lines
// ═══════════════════════════════════════════════
const PrimaryParticles = () => {
    const points = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const count = 35000;
    const connectionCount = 600; // max connection line pairs

    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const r = 20 + Math.random() * 12;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            scales[i] = 0.3 + Math.random() * 0.7;
        }
        return { positions, scales };
    }, []);

    // Pre-allocate connection line geometry
    const linePositions = useMemo(() => new Float32Array(connectionCount * 6), [connectionCount]);
    const lineColors = useMemo(() => new Float32Array(connectionCount * 6), [connectionCount]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        return geo;
    }, [positions, scales]);

    const lineGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
        geo.setDrawRange(0, 0);
        return geo;
    }, [linePositions, lineColors]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(9999, 9999, 0) },
    }), []);

    const targetMouse = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        const { clock, pointer, viewport } = state;

        if (points.current && points.current.material instanceof THREE.ShaderMaterial) {
            const t = clock.getElapsedTime();
            points.current.material.uniforms.uTime.value = t;

            const x = (pointer.x * viewport.width) / 2;
            const y = (pointer.y * viewport.height) / 2;
            targetMouse.set(x, y, 0);
            points.current.material.uniforms.uMouse.value.lerp(targetMouse, 0.1);

            points.current.rotation.y = t * 0.025;

            // Update connection lines between nearby particles
            if (linesRef.current) {
                const posAttr = geometry.attributes.position;
                const posArray = posAttr.array as Float32Array;
                let lineIdx = 0;
                const maxDist = 3.5;
                const maxDistSq = maxDist * maxDist;
                const sampleStep = Math.max(1, Math.floor(count / 200)); // sample subset for perf

                for (let i = 0; i < count && lineIdx < connectionCount; i += sampleStep) {
                    const ax = posArray[i * 3];
                    const ay = posArray[i * 3 + 1];
                    const az = posArray[i * 3 + 2];

                    for (let j = i + sampleStep; j < count && lineIdx < connectionCount; j += sampleStep) {
                        const dx = ax - posArray[j * 3];
                        const dy = ay - posArray[j * 3 + 1];
                        const dz = az - posArray[j * 3 + 2];
                        const distSq = dx * dx + dy * dy + dz * dz;

                        if (distSq < maxDistSq) {
                            const alpha = 1 - distSq / maxDistSq;
                            linePositions[lineIdx * 6] = ax;
                            linePositions[lineIdx * 6 + 1] = ay;
                            linePositions[lineIdx * 6 + 2] = az;
                            linePositions[lineIdx * 6 + 3] = posArray[j * 3];
                            linePositions[lineIdx * 6 + 4] = posArray[j * 3 + 1];
                            linePositions[lineIdx * 6 + 5] = posArray[j * 3 + 2];

                            // Color with alpha-based fade
                            const c = alpha * 0.3;
                            lineColors[lineIdx * 6] = 0.4 * c;
                            lineColors[lineIdx * 6 + 1] = 0.4 * c;
                            lineColors[lineIdx * 6 + 2] = 0.95 * c;
                            lineColors[lineIdx * 6 + 3] = 0.4 * c;
                            lineColors[lineIdx * 6 + 4] = 0.4 * c;
                            lineColors[lineIdx * 6 + 5] = 0.95 * c;

                            lineIdx++;
                        }
                    }
                }

                lineGeometry.setDrawRange(0, lineIdx * 2);
                lineGeometry.attributes.position.needsUpdate = true;
                lineGeometry.attributes.color.needsUpdate = true;

                linesRef.current.rotation.y = t * 0.025;
            }
        }
    });

    const vertexShader = `
        uniform float uTime;
        uniform vec3 uMouse;
        attribute float aScale;
        varying float vAlpha;
        varying float vDepth;

        void main() {
            vec3 pos = position;
            
            // Mouse interaction
            float dx = pos.x - uMouse.x;
            float dy = pos.y - uMouse.y;
            float distSq = dx*dx + dy*dy;
            float radiusSq = 6400.0;

            if (distSq < radiusSq) {
                float dist = sqrt(distSq);
                float force = (80.0 - dist) / 80.0;
                vec2 dir = normalize(vec2(dx, dy));
                pos.xy += dir * force * 10.0;
                pos.z += force * 9.0;
            }

            // Gentle wave
            float wave = sin(uTime * 0.12 + pos.x * 0.08) * 0.6;
            pos.y += wave;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Varied sizing for depth
            gl_PointSize = (500.0 * aScale) / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
            
            float lenSq = dot(pos, pos);
            vAlpha = smoothstep(2500.0, 80.0, lenSq);
            vDepth = smoothstep(50.0, 15.0, -mvPosition.z);
        }
    `;

    const fragmentShader = `
        varying float vAlpha;
        varying float vDepth;

        void main() {
            vec2 center = gl_PointCoord - 0.5;
            float distSq = dot(center, center);
            
            if (distSq > 0.25) discard;
            
            float glow = 1.0 - (sqrt(distSq) * 2.0);
            glow = pow(glow, 1.5);
            
            // Multi-color gradient: blue-violet → cyan based on depth
            vec3 colorDeep = vec3(0.6, 0.5, 1.0);    // violet
            vec3 colorNear = vec3(0.5, 0.8, 1.0);     // cyan
            vec3 color = mix(colorDeep, colorNear, vDepth);
            
            gl_FragColor = vec4(color, vAlpha * glow * 0.85);
        }
    `;

    return (
        <>
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
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial
                    vertexColors
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </lineSegments>
        </>
    );
};

// ═══════════════════════════════════════════════
// Layer 2: Background ambient dust (slower, larger, dimmer)
// ═══════════════════════════════════════════════
const AmbientDust = () => {
    const points = useRef<THREE.Points>(null);
    const count = 8000;

    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const r = 30 + Math.random() * 20;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            scales[i] = 0.5 + Math.random() * 0.5;
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
    }), []);

    useFrame((state) => {
        if (points.current && points.current.material instanceof THREE.ShaderMaterial) {
            points.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
            points.current.rotation.y = state.clock.getElapsedTime() * -0.01;
            points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
        }
    });

    const vertexShader = `
        uniform float uTime;
        attribute float aScale;
        varying float vAlpha;

        void main() {
            vec3 pos = position;
            
            // Very gentle floating drift
            pos.y += sin(uTime * 0.08 + pos.x * 0.05) * 1.2;
            pos.x += cos(uTime * 0.06 + pos.z * 0.04) * 0.8;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            gl_PointSize = (300.0 * aScale) / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
            
            float lenSq = dot(pos, pos);
            vAlpha = smoothstep(4000.0, 400.0, lenSq) * 0.4;
        }
    `;

    const fragmentShader = `
        varying float vAlpha;

        void main() {
            vec2 center = gl_PointCoord - 0.5;
            float distSq = dot(center, center);
            
            if (distSq > 0.25) discard;
            
            float glow = 1.0 - (sqrt(distSq) * 2.0);
            glow = pow(glow, 2.0);
            
            // Warm amber/brand accent
            vec3 color = vec3(0.95, 0.7, 0.4);
            
            gl_FragColor = vec4(color, vAlpha * glow);
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
                    depth: false
                }}
                dpr={[1, 1.5]}
                frameloop="always"
                performance={{ min: 0.5 }}
            >
                <PrimaryParticles />
                <AmbientDust />
            </Canvas>
        </div>
    );
};

export default HeroBackground3D;
