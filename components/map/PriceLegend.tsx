/** Shown only when the price heatmap layer is toggled on — the plain pin
 * view needs no legend since every marker already shows its exact price. */
export default function PriceLegend() {
  return (
    <div className="absolute bottom-5 left-5 z-10 rounded-lg border border-ivory/15 bg-ink/85 px-4 py-3 backdrop-blur">
      <p className="font-mono text-[9px] uppercase tracking-widest2 text-ivory/45">Relative Price Density</p>
      <div className="mt-2 h-1.5 w-40 rounded-full" style={{ background: "linear-gradient(90deg, #6b8fa3, #e0a83e, #b9822e)" }} />
      <div className="mt-1.5 flex justify-between font-mono text-[9px] text-ivory/55">
        <span>Lower</span>
        <span>Luxury</span>
      </div>
    </div>
  );
}
