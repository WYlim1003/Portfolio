import { useEffect, useMemo, useRef, useState } from 'react';

export type SceneHotspot = {
  id: string;
  title: string;
  x: number; // scene coordinates
  y: number; // scene coordinates (anchor is "feet"/bottom of the woman)
  dateLabel: string; // month + year (for route labeling)
};

const SCENE_W = 1000;
const SCENE_H = 1200;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function InteractiveScene(props: {
  hotspots: SceneHotspot[];
  disabled?: boolean;
  onSelect: (id: string) => void;
  moveToId?: string | null;
}) {
  const { hotspots, onSelect, disabled, moveToId} = props;

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const womanRef = useRef<HTMLDivElement | null>(null);

  const [viewport, setViewport] = useState({ w: 800, h: 460 });
  const viewportRefSize = useRef({ w: 800, h: 460 });

  const posRef = useRef({ x: 220, y: 525 });
  const directTargetRef = useRef<{ x: number; y: number } | null>(null);
  const waypointQueueRef = useRef<{ x: number; y: number }[]>([]);
  const pendingSelectIdRef = useRef<string | null>(null);

  const toPx = useMemo(() => {
    return (x: number, y: number) => {
      const { w, h } = viewportRefSize.current;
      return {
        left: (x / SCENE_W) * w,
        top: (y / SCENE_H) * h,
      };
    };
  }, []);

  const toScene = useMemo(() => {
    return (pxX: number, pxY: number) => {
      const { w, h } = viewportRefSize.current;
      const sx = clamp((pxX / w) * SCENE_W, 40, SCENE_W - 40);
      const sy = clamp((pxY / h) * SCENE_H, 60, SCENE_H - 10);
      return { x: sx, y: sy };
    };
  }, []);

  const nearestHotspotIndex = (scenePos: { x: number; y: number }) => {
    if (hotspots.length === 0) return -1;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < hotspots.length; i += 1) {
      const h = hotspots[i];
      const dx = h.x - scenePos.x;
      const dy = h.y - scenePos.y;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  const requestRunToHotspot = (id: string) => {
    if (disabled) return;
    const targetIdx = hotspots.findIndex((s) => s.id === id);
    if (targetIdx < 0) return;

    const startIdx = nearestHotspotIndex(posRef.current);
    const safeStartIdx = startIdx < 0 ? 0 : startIdx;

    const step = safeStartIdx <= targetIdx ? 1 : -1;
    const points: { x: number; y: number }[] = [];
    for (let i = safeStartIdx; ; i += step) {
      points.push({ x: hotspots[i].x, y: hotspots[i].y });
      if (i === targetIdx) break;
    }

    // Clear any background direct move and follow the timeline route instead.
    directTargetRef.current = null;
    waypointQueueRef.current = points;
    pendingSelectIdRef.current = id;
  };

  // Initialize mascot near the start of the route.
  useEffect(() => {
    if (hotspots.length === 0) return;
    if (waypointQueueRef.current.length > 0) return;
    if (directTargetRef.current) return;
    if (pendingSelectIdRef.current) return;

    const start = hotspots[0];
    posRef.current = {
      x: start.x,
      y: Math.min(SCENE_H - 10, start.y + 80),
    };
  }, [hotspots]);

  // Track viewport size so scene coordinates stay consistent.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cr = entry.contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const next = { w, h };
      viewportRefSize.current = next;
      setViewport(next);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // External move requests (e.g., user clicked a project in the list).
  useEffect(() => {
    if (disabled) return;
    if (!moveToId) return;
    requestRunToHotspot(moveToId);
  }, [disabled, moveToId, hotspots]);

  // Animation loop that updates the woman position.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = (t - last) / 1000;
      last = t;

      if (!disabled) {
        const speed = 320; // scene units per second
        const threshold = 8; // scene units

        const queue = waypointQueueRef.current;
        if (queue.length > 0) {
          const target = queue[0];
          const dx = target.x - posRef.current.x;
          const dy = target.y - posRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist <= threshold) {
            posRef.current.x = target.x;
            posRef.current.y = target.y;
            waypointQueueRef.current = queue.slice(1);

            if (waypointQueueRef.current.length === 0) {
              const pendingId = pendingSelectIdRef.current;
              pendingSelectIdRef.current = null;
              if (pendingId) onSelect(pendingId);
            }
          } else {
            const step = Math.min(speed * dt, dist);
            const nx = dx / dist;
            const ny = dy / dist;
            posRef.current.x = clamp(posRef.current.x + nx * step, 40, SCENE_W - 40);
            posRef.current.y = clamp(posRef.current.y + ny * step, 60, SCENE_H - 10);
          }
        } else {
          const target = directTargetRef.current;
          if (target) {
            const dx = target.x - posRef.current.x;
            const dy = target.y - posRef.current.y;
            const dist = Math.hypot(dx, dy);

            if (dist <= threshold) {
              posRef.current.x = target.x;
              posRef.current.y = target.y;
              directTargetRef.current = null;
              pendingSelectIdRef.current = null;
            } else {
              const step = Math.min(speed * dt, dist);
              const nx = dx / dist;
              const ny = dy / dist;
              posRef.current.x = clamp(posRef.current.x + nx * step, 40, SCENE_W - 40);
              posRef.current.y = clamp(posRef.current.y + ny * step, 60, SCENE_H - 10);
            }
          }
        }
      }

      const woman = womanRef.current;
      if (woman) {
        const { left, top } = toPx(posRef.current.x, posRef.current.y);
        woman.style.left = `${left}px`;
        woman.style.top = `${top}px`;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [disabled, onSelect, toPx]);

  const moveToScenePoint = (pxX: number, pxY: number) => {
    const scene = toScene(pxX, pxY);
    directTargetRef.current = scene;
    waypointQueueRef.current = [];
    pendingSelectIdRef.current = null;
  };

  return (
    <div
      ref={viewportRef}
      className="sceneViewport"
      tabIndex={0}
      aria-label="Interactive portfolio scene"
      onPointerDown={(e) => {
        if (disabled) return;
        // Only move when clicking the empty background (not hotspots).
        if (e.target !== e.currentTarget) return;
        const el = viewportRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        moveToScenePoint(e.clientX - rect.left, e.clientY - rect.top);
      }}
    >
      <div className="sceneGrid" aria-hidden="true" />

      <svg className="sceneRouteSvg" viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} preserveAspectRatio='none' style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} aria-hidden="true">
        {(() => {
          const points = hotspots.map((h) => ({ x: h.x, y: h.y }));
          if (points.length < 2) return null;

          const catmullRomToBezier = (pts: { x: number; y: number }[]) => {
            // Convert Catmull-Rom spline to cubic Bezier segments for a smooth "bent road" look.
            const d: string[] = [];
            d.push(`M ${pts[0].x} ${pts[0].y}`);

            for (let i = 0; i < pts.length - 1; i += 1) {
              const p0 = pts[i - 1] ?? pts[i];
              const p1 = pts[i];
              const p2 = pts[i + 1];
              const p3 = pts[i + 2] ?? p2;

              const cp1x = p1.x + (p2.x - p0.x) / 6;
              const cp1y = p1.y + (p2.y - p0.y) / 6;
              const cp2x = p2.x - (p3.x - p1.x) / 6;
              const cp2y = p2.y - (p3.y - p1.y) / 6;

              d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
            }

            return d.join(' ');
          };

          const routeD = catmullRomToBezier(points);

          return (
            <>
              <path className="sceneRouteLineShadow" d={routeD} fill="none" strokeLinecap="round" />
              <path
                className="sceneRouteLine"
                d={routeD}
                fill="none"
              />
              {hotspots.map((h) => (
                <text
                  key={h.id}
                  className="sceneRouteText"
                  x={h.x + 26}
                  y={h.y - 8}
                  aria-hidden="true"
                >
                  {h.dateLabel}
                </text>
              ))}
            </>
          );
        })()}
      </svg>

      <div ref={womanRef} className="woman" aria-hidden="true">
        <div className="hair" />
        <div className="head" />
        <div className="arm left" />
        <div className="arm right" />
        <div className="body" />
        <div className="dress" />
      </div>

      {hotspots.map((h) => {
        const left = (h.x / SCENE_W) * viewport.w;
        const top = (h.y / SCENE_H) * viewport.h;

        return (
          <button
            key={h.id}
            type="button"
            className="hotspot"
            style={{
              left,
              top,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => {
              requestRunToHotspot(h.id);
            }}
            aria-label={`Open project: ${h.title}`}
          >
            <span className="hotspotDot" aria-hidden="true" />
            <span className="hotspotLabel">{h.title}</span>
          </button>
        );
      })}
    </div>
  );
}

