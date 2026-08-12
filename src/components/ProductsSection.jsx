// ProductsSection.jsx
// 
// ProductsSection.jsx
// ProductsSection.jsx
import { motion } from "framer-motion";
import { Settings2, Layers3 } from "lucide-react";

const row1Products = [
  {
    name: "Muffler Parts",
    desc: "High-temp exhaust system components with precision weld joints and heat-resistant coatings.",
    tag: "Exhaust Systems",
    variant: "a",
  },
  {
    name: "Chassis Parts",
    desc: "Structural frame components engineered for maximum load-bearing strength and rigidity.",
    tag: "Structural",
    variant: "b",
  },
  {
    name: "Tubular Parts",
    desc: "Seamless and welded tubes for fluid transfer, frameworks, and roll-cage structures.",
    tag: "Fluid Systems",
    variant: "a",
  },
  {
    name: "Flanges",
    desc: "Custom flanges for pipe connections, pressure containment, and leak-free assemblies.",
    tag: "Connectors",
    variant: "b",
  },
  {
    name: "Busbars",
    desc: "Copper and aluminium busbars for high-current power distribution in EVs and industry.",
    tag: "Electrical",
    variant: "a",
  },
];

const row2Products = [
  {
    name: "Machined Parts",
    desc: "CNC-machined components with micron-level tolerances for critical assemblies.",
    tag: "Precision CNC",
    variant: "b",
  },
  {
    name: "Draw Parts",
    desc: "Deep drawn metal parts for complex hollow geometries and seamless enclosures.",
    tag: "Metal Forming",
    variant: "a",
  },
  {
    name: "Custom Components",
    desc: "Bespoke OEM solutions engineered precisely to your design and specification.",
    tag: "OEM Solutions",
    variant: "b",
  },
  {
    name: "Brake Components",
    desc: "Safety-critical brake system parts validated for performance and durability.",
    tag: "Safety Systems",
    variant: "a",
  },
  {
    name: "Suspension Parts",
    desc: "Damper housings and linkage components machined for ride precision.",
    tag: "Chassis",
    variant: "b",
  },
];

// Two shades of the same blue — keeps the "white + blue only" rule
// while still giving alternating cards a little visual rhythm.
function ProductCard({ product }) {
  const isA = product.variant === "a";
  const accentVar = isA ? "var(--accent)" : "var(--accent-strong)";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      style={{ willChange: "transform", "--card-accent": accentVar }}
      className="flex-shrink-0 w-[200px] sm:w-[220px] relative group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--card-accent)] rounded-2xl p-[18px] cursor-pointer overflow-hidden transition-colors duration-300 shadow-[0_6px_20px_var(--shadow-color)]"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-[var(--accent-tint)]"
      >
        {isA ? (
          <Settings2 className="w-5 h-5" style={{ color: accentVar }} />
        ) : (
          <Layers3 className="w-5 h-5" style={{ color: accentVar }} />
        )}
      </div>

      <p className="text-[13px] font-semibold text-[var(--text)] mb-1.5">
        {product.name}
      </p>
      <p className="text-[11px] leading-relaxed text-[var(--text-muted)] mb-3">
        {product.desc}
      </p>

      <span
        className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[var(--accent-tint)]"
        style={{ color: accentVar }}
      >
        {product.tag}
      </span>
    </motion.div>
  );
}

function InfiniteTrack({ products, direction = "left", speed = 30 }) {
  // Duplicated 4x to match the existing marquee keyframes (which
  // translate by -25% per loop) — reducing this caused the visible
  // gap and speed mismatch.
  const doubled = [...products, ...products, ...products, ...products];
  const animClass =
    direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div
      className="relative w-full overflow-hidden py-2
      before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:z-10
      before:bg-gradient-to-r before:from-[var(--bg-soft)] before:to-transparent
      after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:z-10
      after:bg-gradient-to-l after:from-[var(--bg-soft)] after:to-transparent"
    >
      <div
        className={`flex gap-4 w-max ${animClass} [animation-play-state:running] hover:[animation-play-state:paused]`}
        style={{ "--speed": `${speed}s`, willChange: "transform" }}
      >
        {doubled.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <div className="relative bg-gradient-to-b from-[var(--bg)] via-[var(--bg-soft)] to-[var(--bg)] py-16 overflow-hidden">
      {/* Ambient glow — static, no continuous JS animation loop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-strong)] rounded-full filter blur-[120px] opacity-[0.05] pointer-events-none" />

      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10 px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--accent-strong)]/10 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-strong)]" />
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--accent-strong)]">
              What We Make
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent-strong-alt)]">
              Products
            </span>
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-[var(--accent-strong)] to-transparent rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Track 1 — scrolls left */}
        <InfiniteTrack products={row1Products} direction="left" speed={32} />

        {/* Track 2 — scrolls right */}
        <div className="mt-4">
          <InfiniteTrack products={row2Products} direction="right" speed={26} />
        </div>
      </div>
    </div>
  );
}