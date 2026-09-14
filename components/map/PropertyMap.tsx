"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { MapListing } from "@/lib/mockListings";
import { formatPriceShort, type MapBounds } from "@/lib/mapUtils";

const SOURCE_ID = "listings-source";
const CLUSTER_LAYER = "clusters";
const CLUSTER_COUNT_LAYER = "cluster-count";
const HEATMAP_LAYER = "price-heatmap";

// Layers switched off on load to cut visual noise — a real-estate map
// doesn't need most of what Mapbox's dark-v11 style ships with by default.
const LABEL_LAYERS_TO_HIDE = [
  "poi-label",
  "transit-label",
  "airport-label",
  "settlement-minor-label",
  "settlement-subdivision-label",
  "natural-point-label",
  "natural-line-label",
];

function toGeoJSON(listings: MapListing[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: listings.map((l) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [l.longitude, l.latitude] },
      properties: { id: l.id, price: l.price },
    })),
  };
}

interface PropertyMapProps {
  listings: MapListing[];
  selectedId: string | null;
  hoveredId: string | null;
  showHeatmap: boolean;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
  onSearchThisArea: (bounds: MapBounds) => void;
}

export default function PropertyMap({
  listings,
  selectedId,
  hoveredId,
  showHeatmap,
  onSelect,
  onHover,
  onSearchThisArea,
}: PropertyMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const listingsRef = useRef<MapListing[]>(listings);
  const [mapReady, setMapReady] = useState(false);
  const [tokenMissing, setTokenMissing] = useState(false);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const pendingBoundsRef = useRef<MapBounds | null>(null);

  listingsRef.current = listings;

  // ---- Marker rendering: DOM markers for unclustered points, native layers for clusters ----
  const renderMarkers = useCallback(() => {
    const map = mapRef.current;
    if (!map || !map.getSource(SOURCE_ID)) return;

    const features = map.querySourceFeatures(SOURCE_ID, { filter: ["!", ["has", "point_count"]] });
    const seenIds = new Set<string>();

    for (const feature of features) {
      const id = feature.properties?.id as string | undefined;
      if (!id || seenIds.has(id)) continue;
      seenIds.add(id);

      const listing = listingsRef.current.find((l) => l.id === id);
      if (!listing) continue;

      const geometry = feature.geometry as GeoJSON.Point;
      const [lng, lat] = geometry.coordinates;

      let marker = markersRef.current.get(id);
      if (!marker) {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "price-marker";
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelect(id);
        });
        el.addEventListener("mouseenter", () => onHover(id));
        el.addEventListener("mouseleave", () => onHover(null));

        marker = new mapboxgl.Marker({ element: el, anchor: "bottom" }).setLngLat([lng, lat]).addTo(map);
        markersRef.current.set(id, marker);
      }

      const el = marker.getElement();
      const isSelected = listing.id === selectedId;
      const isHovered = listing.id === hoveredId;

      el.textContent = formatPriceShort(listing.price, listing.isRental);
      el.classList.toggle("price-marker--selected", isSelected);
      el.classList.toggle("price-marker--hovered", isHovered && !isSelected);
      el.style.zIndex = isSelected ? "30" : isHovered ? "20" : "10";
    }

    for (const [id, marker] of markersRef.current) {
      if (!seenIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    }
  }, [selectedId, hoveredId, onSelect, onHover]);

  // ---- Map initialization (once) ----
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || token.startsWith("pk.your-")) {
      setTokenMissing(true);
      return;
    }
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-79.72, 43.56], // centered to include Oakville/Mississauga/Milton/Brampton
      zoom: 9.6,
      attributionControl: false,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true } }), "bottom-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    map.on("load", () => {
      for (const layerId of LABEL_LAYERS_TO_HIDE) {
        if (map.getLayer(layerId)) map.setLayoutProperty(layerId, "visibility", "none");
      }

      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: toGeoJSON(listingsRef.current),
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 55,
      });

      // Optional subtle price heatmap — off by default, toggled from the explorer.
      // This is the extension point requested for a future market heatmap layer:
      // it already reads live "price" as its weight, so richer neighbourhood-level
      // market data can be swapped in later without changing the map's structure.
      map.addLayer(
        {
          id: HEATMAP_LAYER,
          type: "heatmap",
          source: SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          layout: { visibility: "none" },
          paint: {
            "heatmap-weight": ["interpolate", ["linear"], ["get", "price"], 500_000, 0.2, 2_500_000, 1],
            "heatmap-intensity": 0.6,
            "heatmap-radius": 45,
            "heatmap-opacity": 0.35,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(13,20,32,0)",
              0.3, "rgba(107,143,163,0.5)",
              0.6, "rgba(224,168,62,0.6)",
              1, "rgba(185,130,46,0.85)",
            ],
          },
        },
        // Insert below clusters/markers so it never sits on top of them
      );

      map.addLayer({
        id: CLUSTER_LAYER,
        type: "circle",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#0d1420",
          "circle-opacity": 0.92,
          "circle-radius": ["step", ["get", "point_count"], 20, 5, 26, 15, 32],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#e0a83e",
        },
      });

      map.addLayer({
        id: CLUSTER_COUNT_LAYER,
        type: "symbol",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: { "text-color": "#edc27a" },
      });

      map.on("click", CLUSTER_LAYER, (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: [CLUSTER_LAYER] });
        const clusterId = features[0]?.properties?.cluster_id;
        const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource;
        if (clusterId === undefined) return;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err || !zoom) return;
          map.easeTo({ center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number], zoom });
        });
      });

      map.on("mouseenter", CLUSTER_LAYER, () => (map.getCanvas().style.cursor = "pointer"));
      map.on("mouseleave", CLUSTER_LAYER, () => (map.getCanvas().style.cursor = ""));

      const reportBounds = () => {
        const b = map.getBounds();
        if (!b) return;
        pendingBoundsRef.current = { north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() };
      };

      map.on("data", (e) => {
        if (e.sourceId === SOURCE_ID && map.isSourceLoaded(SOURCE_ID)) renderMarkers();
      });
      map.on("render", () => {
        if (map.isSourceLoaded(SOURCE_ID)) renderMarkers();
      });
      map.on("moveend", () => {
        reportBounds();
        setShowSearchArea(true);
      });

      reportBounds();
      setMapReady(true);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Keep the GeoJSON source in sync when filters change the listing set ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    if (source) source.setData(toGeoJSON(listings));
  }, [listings, mapReady]);

  // ---- Toggle the heatmap layer ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !map.getLayer(HEATMAP_LAYER)) return;
    map.setLayoutProperty(HEATMAP_LAYER, "visibility", showHeatmap ? "visible" : "none");
  }, [showHeatmap, mapReady]);

  useEffect(() => {
    renderMarkers();
  }, [renderMarkers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !selectedId) return;
    const listing = listings.find((l) => l.id === selectedId);
    if (!listing) return;
    map.easeTo({ center: [listing.longitude, listing.latitude], zoom: Math.max(map.getZoom(), 13), duration: 600 });
  }, [selectedId, mapReady, listings]);

  if (tokenMissing) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink px-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-ivory/50">Map not configured</p>
        <p className="max-w-sm text-[13px] leading-relaxed text-ivory/70">
          Add a free Mapbox token to <code className="text-brass-light">NEXT_PUBLIC_MAPBOX_TOKEN</code> in{" "}
          <code className="text-brass-light">.env.local</code> to activate the interactive map — see{" "}
          <code className="text-brass-light">.env.example</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />

      {showSearchArea && (
        <button
          type="button"
          onClick={() => {
            if (pendingBoundsRef.current) onSearchThisArea(pendingBoundsRef.current);
            setShowSearchArea(false);
          }}
          className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-brass bg-ink/90 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest2 text-brass-light shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur transition-all hover:bg-brass hover:text-ink"
        >
          Search this area
        </button>
      )}

      {!mapReady && !tokenMissing && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brass border-t-transparent" />
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-ivory/50">Loading map</p>
          </div>
        </div>
      )}
    </div>
  );
}
