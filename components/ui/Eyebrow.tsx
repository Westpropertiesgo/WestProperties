interface EyebrowProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

/**
 * The recurring "plaque" label used across the site — modelled on the
 * small bordered address/lockbox tags found on real GTA listings.
 */
export default function Eyebrow({ children, light, className = "" }: EyebrowProps) {
  return (
    <span
      className={`plaque ${light ? "text-brass-light" : "text-brass"} ${className}`}
    >
      {children}
    </span>
  );
}
