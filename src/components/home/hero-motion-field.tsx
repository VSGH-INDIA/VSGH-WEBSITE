"use client";

import { useEffect, useRef } from "react";

export function HeroMotionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 64rem)");
    if (reduceMotion.matches || !desktop.matches) {
      return;
    }

    let disposed = false;
    let frame: number | null = null;
    let cleanup = () => undefined;

    void import("three")
      .then((THREE) => {
        if (disposed) {
          return;
        }

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            canvas,
            powerPreference: "high-performance",
          });
        } catch {
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
        camera.position.set(0, 0, 7);

        const field = new THREE.Group();
        field.position.set(2.5, -0.1, 0);
        scene.add(field);

        const pointCount = 420;
        const positions = new Float32Array(pointCount * 3);
        const colors = new Float32Array(pointCount * 3);
        for (let index = 0; index < pointCount; index += 1) {
          const offset = index * 3;
          const radius = 0.55 + Math.random() * 2.85;
          const angle = Math.random() * Math.PI * 2;
          positions[offset] = Math.cos(angle) * radius;
          positions[offset + 1] = (Math.random() - 0.5) * 4.8;
          positions[offset + 2] =
            Math.sin(angle) * 1.2 + (Math.random() - 0.5) * 2;

          const blueBias = 0.64 + Math.random() * 0.25;
          colors[offset] = 0.22 * blueBias;
          colors[offset + 1] = 0.54 * blueBias;
          colors[offset + 2] = 0.94 * blueBias;
        }

        const pointsGeometry = new THREE.BufferGeometry();
        pointsGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );
        pointsGeometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3),
        );
        const pointsMaterial = new THREE.PointsMaterial({
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: 0.75,
          size: 0.035,
          transparent: true,
          vertexColors: true,
        });
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
        field.add(points);

        const orbitGeometry = new THREE.TorusGeometry(2.7, 0.006, 8, 180);
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color: 0x7fb8f2,
          opacity: 0.26,
          transparent: true,
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.set(1.1, -0.34, 0.22);
        field.add(orbit);

        let pointerX = 0;
        let pointerY = 0;
        let targetPointerX = 0;
        let targetPointerY = 0;
        let scrollProgress = 0;
        let isVisible = false;

        const resize = () => {
          const bounds = host.getBoundingClientRect();
          renderer.setSize(bounds.width, bounds.height, false);
          camera.aspect = bounds.width / bounds.height;
          camera.updateProjectionMatrix();
        };

        const onPointerMove = (event: PointerEvent) => {
          const bounds = host.getBoundingClientRect();
          targetPointerX =
            ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          targetPointerY =
            ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };

        const onScroll = () => {
          const bounds = host.getBoundingClientRect();
          scrollProgress = Math.min(
            1,
            Math.max(0, -bounds.top / Math.max(bounds.height, 1)),
          );
        };

        const render = (time: number) => {
          if (!isVisible || document.visibilityState !== "visible") {
            frame = null;
            return;
          }

          pointerX += (targetPointerX - pointerX) * 0.045;
          pointerY += (targetPointerY - pointerY) * 0.045;
          const elapsed = time * 0.0001;

          field.rotation.y = elapsed + scrollProgress * 0.85 + pointerX * 0.14;
          field.rotation.x = -0.2 + pointerY * 0.1 - scrollProgress * 0.18;
          field.position.y = -0.1 - scrollProgress * 0.45;
          points.rotation.z = elapsed * 1.8;
          orbit.rotation.z = elapsed * 0.7 - scrollProgress * 0.25;
          camera.position.z = 7 + scrollProgress * 0.7;
          renderer.render(scene, camera);
          frame = window.requestAnimationFrame(render);
        };

        const startAnimation = () => {
          if (
            frame === null &&
            isVisible &&
            document.visibilityState === "visible"
          ) {
            frame = window.requestAnimationFrame(render);
          }
        };

        const stopAnimation = () => {
          if (frame !== null) {
            window.cancelAnimationFrame(frame);
            frame = null;
          }
        };

        const visibility = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry?.isIntersecting ?? false;
            if (isVisible) {
              startAnimation();
            } else {
              stopAnimation();
            }
          },
          { threshold: 0.01 },
        );
        const onDocumentVisibility = () => {
          if (document.visibilityState === "visible") {
            startAnimation();
          } else {
            stopAnimation();
          }
        };
        visibility.observe(host);

        resize();
        onScroll();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        host.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("visibilitychange", onDocumentVisibility);

        cleanup = () => {
          stopAnimation();
          resizeObserver.disconnect();
          visibility.disconnect();
          host.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("scroll", onScroll);
          document.removeEventListener(
            "visibilitychange",
            onDocumentVisibility,
          );
          pointsGeometry.dispose();
          pointsMaterial.dispose();
          orbitGeometry.dispose();
          orbitMaterial.dispose();
          renderer.dispose();
        };
      })
      .catch(() => undefined);

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full mix-blend-screen opacity-80 lg:block"
    />
  );
}
