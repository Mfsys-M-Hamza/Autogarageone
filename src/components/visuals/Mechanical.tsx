/**
 * Custom mechanical illustrations — original SVG artwork created for this site.
 * Animations are pure CSS (classes a-* in globals.css), so they cost almost nothing,
 * pause off-screen and switch off under prefers-reduced-motion.
 * Shared gradients live in <SvgDefs/> (rendered once in the root layout).
 */
import type { VisualKey } from "@/data/services";
import type { ReactElement } from "react";

function gearPath(cx: number, cy: number, teeth: number, ro: number, ri: number) {
  const step = (Math.PI * 2) / teeth;
  const p = (a: number, r: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    d += `${i ? "L" : "M"}${p(a, ri)}L${p(a + step * 0.12, ro)}L${p(a + step * 0.38, ro)}L${p(a + step * 0.5, ri)}`;
  }
  return d + "Z";
}

export function SvgDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="ag-metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5f8f6" />
          <stop offset=".45" stopColor="#b9c1bd" />
          <stop offset="1" stopColor="#4d5551" />
        </linearGradient>
        <linearGradient id="ag-metal-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b635f" />
          <stop offset=".5" stopColor="#e9eeeb" />
          <stop offset="1" stopColor="#5b635f" />
        </linearGradient>
        <linearGradient id="ag-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8cff95" />
          <stop offset=".5" stopColor="#3ddc4a" />
          <stop offset="1" stopColor="#157a20" />
        </linearGradient>
        <linearGradient id="ag-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f3633" />
          <stop offset="1" stopColor="#0f1211" />
        </linearGradient>
        <radialGradient id="ag-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#3ddc4a" stopOpacity=".55" />
          <stop offset="1" stopColor="#3ddc4a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const Glow = () => <circle cx="100" cy="100" r="92" fill="url(#ag-glow)" className="a-glow" />;

const Gear = ({ cx, cy, t, ro, ri, cls, fill = "url(#ag-metal)" }: { cx: number; cy: number; t: number; ro: number; ri: number; cls: string; fill?: string }) => (
  <g className={cls}>
    <path d={gearPath(cx, cy, t, ro, ri)} fill={fill} stroke="#1a1f1d" strokeWidth="1.5" />
    <circle cx={cx} cy={cy} r={ri * 0.55} fill="url(#ag-dark)" stroke="#3ddc4a" strokeWidth="2" />
    <circle cx={cx} cy={cy} r={ri * 0.18} fill="#c9cfcc" />
  </g>
);

const art: Record<VisualKey, () => ReactElement> = {
  gear: () => (
    <>
      <Glow />
      <Gear cx={82} cy={90} t={14} ro={52} ri={43} cls="a-spin" />
      <Gear cx={142} cy={140} t={10} ro={34} ri={27} cls="a-spin-rev" fill="url(#ag-green)" />
    </>
  ),
  scanner: () => (
    <>
      <Glow />
      <rect x="38" y="30" width="124" height="140" rx="16" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="4" />
      <rect x="50" y="44" width="100" height="78" rx="6" fill="#061208" stroke="#1f9e2c" strokeWidth="1.5" />
      {[62, 80, 98].map((y) => <line key={y} x1="54" x2="146" y1={y} y2={y} stroke="#1f9e2c" strokeOpacity=".25" />)}
      <path d="M54 92 L70 92 L76 70 L84 110 L92 60 L100 100 L108 84 L116 92 L146 92" fill="none" stroke="#6cf277" strokeWidth="2.5" className="a-dash" strokeLinejoin="round" />
      <rect x="50" y="44" width="100" height="3" fill="#6cf277" opacity=".7" className="a-scan" style={{ ["--scan" as string]: "74px" }} />
      <circle cx="78" cy="146" r="9" fill="#3ddc4a" className="a-blink" />
      <rect x="96" y="139" width="44" height="14" rx="7" fill="#2a302d" />
      <text x="100" y="116" fill="#3ddc4a" fontSize="9" fontFamily="monospace" textAnchor="middle">OBD-II OK</text>
      <path d="M100 170 C100 186 130 186 140 192" stroke="url(#ag-metal)" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  engine: () => (
    <>
      <Glow />
      <rect x="40" y="58" width="120" height="96" rx="10" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="3" />
      <rect x="52" y="44" width="96" height="20" rx="5" fill="url(#ag-metal)" />
      {[
        { x: 62, c: "a-piston" },
        { x: 100, c: "a-piston-alt" },
        { x: 138, c: "a-piston" },
      ].map(({ x, c }) => (
        <g key={x}>
          <rect x={x - 13} y={66} width={26} height={62} rx="3" fill="#0b0d0c" />
          <g className={c}>
            <rect x={x - 11} y={70} width={22} height={18} rx="3" fill="url(#ag-metal)" />
            <rect x={x - 11} y={74} width={22} height={2} fill="#4d5551" />
            <rect x={x - 3} y={88} width={6} height={30} fill="#9aa3a0" />
          </g>
        </g>
      ))}
      <Gear cx={100} cy={170} t={12} ro={20} ri={15} cls="a-spin-fast" fill="url(#ag-green)" />
    </>
  ),
  piston: () => (
    <>
      <Glow />
      <rect x="58" y="30" width="84" height="110" rx="6" fill="#0b0d0c" stroke="url(#ag-metal)" strokeWidth="3" />
      <g className="a-piston">
        <rect x="64" y="42" width="72" height="42" rx="6" fill="url(#ag-metal)" />
        {[50, 57, 64].map((y) => <rect key={y} x="64" y={y} width="72" height="2.5" fill="#4d5551" />)}
        <circle cx="100" cy="76" r="6" fill="#2a302d" />
        <path d="M94 78 L88 150 L112 150 L106 78 Z" fill="#9aa3a0" />
        <circle cx="100" cy="156" r="16" fill="none" stroke="#9aa3a0" strokeWidth="8" />
      </g>
      {[[70, 38], [90, 34], [118, 37], [128, 40], [80, 36]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#3ddc4a" className="a-blink" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </>
  ),
  injector: () => (
    <>
      <Glow />
      <rect x="84" y="20" width="32" height="26" rx="4" fill="url(#ag-green)" />
      <rect x="88" y="46" width="24" height="70" rx="4" fill="url(#ag-metal)" />
      {[58, 70, 82].map((y) => <rect key={y} x="86" y={y} width="28" height="4" rx="2" fill="#2a302d" />)}
      <path d="M92 116 L108 116 L103 136 L97 136 Z" fill="#9aa3a0" />
      <g className="a-spray">
        <path d="M100 138 L70 186 Q100 196 130 186 Z" fill="#6cf277" opacity=".35" />
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={78 + (i % 6) * 9} cy={156 + Math.floor(i / 6) * 16} r="2" fill="#bfffc4" />
        ))}
      </g>
    </>
  ),
  catalytic: () => (
    <>
      <Glow />
      <rect x="10" y="88" width="46" height="24" rx="4" fill="url(#ag-metal)" />
      <rect x="144" y="88" width="46" height="24" rx="4" fill="url(#ag-metal)" />
      <path d="M48 70 Q56 60 70 60 L130 60 Q144 60 152 70 L152 130 Q144 140 130 140 L70 140 Q56 140 48 130 Z" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="4" />
      <g opacity=".85">
        {[...Array(5)].map((_, r) =>
          [...Array(7)].map((_, c) => (
            <polygon key={`${r}-${c}`} points="0,-6 5.2,-3 5.2,3 0,6 -5.2,3 -5.2,-3" transform={`translate(${70 + c * 10 + (r % 2) * 5} ${76 + r * 12})`} fill="none" stroke="#3ddc4a" strokeWidth="1.2" />
          )),
        )}
      </g>
      {[78, 100, 122].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#6cf277" strokeWidth="2" className="a-flow" opacity=".7" />)}
    </>
  ),
  hybrid: () => (
    <>
      <Glow />
      <rect x="18" y="64" width="86" height="72" rx="8" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={28 + i * 18} y="76" width="12" height="48" rx="3" fill="url(#ag-green)" opacity={0.55 + i * 0.12} />)}
      <path d="M104 100 L132 100" stroke="#6cf277" strokeWidth="4" className="a-flow" />
      <circle cx="160" cy="100" r="30" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="4" />
      <g className="a-spin-fast">
        {[0, 60, 120, 180, 240, 300].map((a) => <rect key={a} x="157" y="76" width="6" height="18" rx="3" fill="#3ddc4a" transform={`rotate(${a} 160 100)`} />)}
      </g>
      <path d="M58 40 L50 56 L60 56 L52 72" stroke="#6cf277" strokeWidth="4" fill="none" className="a-blink" strokeLinejoin="round" />
    </>
  ),
  ac: () => (
    <>
      <Glow />
      <rect x="30" y="30" width="140" height="140" rx="14" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="3" />
      {[...Array(9)].map((_, i) => <line key={i} x1={44 + i * 14} x2={44 + i * 14} y1="40" y2="160" stroke="#2f3633" strokeWidth="3" />)}
      <circle cx="100" cy="100" r="50" fill="#0b0d0c" stroke="#3ddc4a" strokeWidth="2" />
      <g className="a-spin-fast">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M100 100 C 96 78, 108 60, 122 58 C 118 76, 112 90, 100 100 Z" fill="url(#ag-metal)" transform={`rotate(${a} 100 100)`} />
        ))}
      </g>
      <circle cx="100" cy="100" r="8" fill="#3ddc4a" />
      {[70, 100, 130].map((y) => <path key={y} d={`M172 ${y} q8 -6 16 0 t16 0`} stroke="#9ff5a6" strokeWidth="2.5" fill="none" className="a-flow" />)}
    </>
  ),
  suspension: () => (
    <>
      <Glow />
      <g className="a-spring-top">
        <rect x="80" y="18" width="40" height="14" rx="4" fill="url(#ag-metal)" />
        <rect x="94" y="30" width="12" height="60" fill="#c9cfcc" />
      </g>
      <g className="a-spring">
        <path d="M70 52 L130 64 L70 76 L130 88 L70 100 L130 112 L70 124 L130 136 L70 148" stroke="url(#ag-green)" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="88" y="90" width="24" height="76" rx="5" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="2.5" />
      <rect x="76" y="164" width="48" height="14" rx="4" fill="url(#ag-metal)" />
    </>
  ),
  brake: () => (
    <>
      <Glow />
      <g className="a-spin">
        <circle cx="100" cy="100" r="74" fill="url(#ag-metal)" stroke="#4d5551" strokeWidth="2" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#7c8581" strokeWidth="1" />
        {[...Array(18)].map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          return <circle key={i} cx={100 + 52 * Math.cos(a)} cy={100 + 52 * Math.sin(a)} r="3.2" fill="#2a302d" />;
        })}
        <circle cx="100" cy="100" r="30" fill="url(#ag-dark)" />
        {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx="100" cy="82" r="4" fill="#c9cfcc" transform={`rotate(${a} 100 100)`} />)}
      </g>
      <path d="M150 42 Q182 60 184 100 Q182 140 150 158 L140 142 Q164 126 164 100 Q164 74 140 58 Z" fill="url(#ag-green)" stroke="#0b3d12" strokeWidth="2" />
      <text x="165" y="104" fontSize="8" fontWeight="700" fill="#04110a" textAnchor="middle" transform="rotate(90 165 100)">AG1</text>
    </>
  ),
  oil: () => (
    <>
      <Glow />
      <rect x="62" y="56" width="76" height="112" rx="12" fill="url(#ag-green)" />
      {[80, 96, 112, 128, 144].map((y) => <rect key={y} x="62" y={y} width="76" height="4" fill="#0b3d12" opacity=".6" />)}
      <rect x="74" y="40" width="52" height="20" rx="4" fill="url(#ag-metal)" />
      <path d="M100 6 C 100 6, 86 24, 86 32 a14 14 0 0 0 28 0 C114 24, 100 6, 100 6 Z" fill="#e9c46a" className="a-float" />
      <circle cx="100" cy="110" r="16" fill="#0b0d0c" stroke="#c9cfcc" strokeWidth="3" />
    </>
  ),
  battery: () => (
    <>
      <Glow />
      <rect x="36" y="58" width="128" height="100" rx="12" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="4" />
      <rect x="56" y="44" width="22" height="16" rx="3" fill="url(#ag-metal)" />
      <rect x="122" y="44" width="22" height="16" rx="3" fill="url(#ag-metal)" />
      <text x="67" y="84" fontSize="16" fill="#fff" textAnchor="middle" fontWeight="700">−</text>
      <text x="133" y="84" fontSize="16" fill="#3ddc4a" textAnchor="middle" fontWeight="700">+</text>
      <rect x="52" y="112" width="96" height="26" rx="5" fill="#061208" stroke="#1f9e2c" />
      <rect x="55" y="115" width="90" height="20" rx="3" fill="url(#ag-green)" className="a-charge" />
      <path d="M104 88 L92 108 L102 108 L96 124 L112 102 L102 102 Z" fill="#fff" className="a-blink" transform="translate(0 -6)" />
    </>
  ),
  inspection: () => (
    <>
      <Glow />
      <path d="M22 128 L32 102 Q40 86 58 84 L78 66 Q86 60 100 60 L130 60 Q144 60 152 70 L166 86 Q180 88 182 102 L182 128 Z" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M84 70 L98 70 L98 86 L66 86 Z M106 70 L130 70 L148 86 L106 86 Z" fill="#1d2a22" stroke="#3ddc4a" strokeWidth="1.2" />
      {[60, 146].map((x) => (
        <g key={x}>
          <circle cx={x} cy="130" r="20" fill="#0b0d0c" stroke="url(#ag-metal)" strokeWidth="4" />
          <circle cx={x} cy="130" r="7" fill="#9aa3a0" />
        </g>
      ))}
      <rect x="18" y="44" width="4" height="104" rx="2" fill="#6cf277" opacity=".9" className="a-sweep" />
      {[[52, 168], [100, 40], [150, 168]].map(([x, y], i) => (
        <g key={i} className="a-blink" style={{ animationDelay: `${i * 0.45}s` }}>
          <circle cx={x} cy={y} r="10" fill="#3ddc4a" />
          <path d={`M${x - 5} ${y} l3.5 4 l7 -8`} stroke="#04110a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </>
  ),
  electrical: () => (
    <>
      <Glow />
      <rect x="60" y="60" width="80" height="80" rx="10" fill="url(#ag-dark)" stroke="url(#ag-metal)" strokeWidth="3" />
      <text x="100" y="106" fontSize="14" fontFamily="monospace" fill="#3ddc4a" textAnchor="middle">ECU</text>
      {[
        "M60 80 H30 V40", "M60 120 H24 V168", "M140 80 H176 V36", "M140 120 H172 V170",
        "M84 60 V24 H48", "M116 140 V178 H150",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} stroke="#2f3633" strokeWidth="5" fill="none" />
          <path d={d} stroke="#6cf277" strokeWidth="2.5" fill="none" className="a-flow" style={{ animationDelay: `${i * 0.2}s` }} />
        </g>
      ))}
      {[[30, 40], [24, 168], [176, 36], [172, 170], [48, 24], [150, 178]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#3ddc4a" className="a-blink" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </>
  ),
  tow: () => (
    <>
      <Glow />
      <path d="M30 130 L30 96 L70 96 L84 74 L116 74 L116 130 Z" fill="url(#ag-green)" />
      <rect x="116" y="112" width="60" height="18" fill="url(#ag-metal)" />
      <path d="M150 112 L178 64" stroke="url(#ag-metal)" strokeWidth="6" />
      <path d="M178 64 L178 88 q0 8 -8 8" stroke="#c9cfcc" strokeWidth="4" fill="none" />
      {[56, 150].map((x) => <circle key={x} cx={x} cy="136" r="16" fill="#0b0d0c" stroke="url(#ag-metal)" strokeWidth="4" />)}
      <circle cx="100" cy="66" r="5" fill="#ffb020" className="a-blink" />
    </>
  ),
};

/** Renders the illustration for a service/visual key. Decorative by default. */
export function MechanicalArt({ kind, className = "", label }: { kind: VisualKey; className?: string; label?: string }) {
  const Art = art[kind] ?? art.gear;
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      focusable="false"
    >
      <Art />
    </svg>
  );
}
