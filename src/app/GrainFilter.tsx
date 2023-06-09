export default function GrainFilter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="background-filter">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.4"
          numOctaves="1"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
