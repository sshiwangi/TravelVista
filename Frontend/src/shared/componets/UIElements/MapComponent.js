import React, { useRef, useEffect } from "react";
import "ol/ol.css"; // Import OpenLayers styles
import { Map, View } from "ol"; // Import specific OpenLayers components
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon } from "ol/style";
import marker from "../../../assets/marker.png";

import "./Map.css";

const MapComponent = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    // console.log("OpenLayers:", window.ol);
    // console.log("Initializing map with center:", center, "and zoom:", zoom);
    const map = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        // // Create a vector layer for the marker
        // new VectorLayer({
        //   source: new window.ol.source.Vector({
        //     features: [
        //       // Create a feature for the marker
        //       new Feature({
        //         geometry: new Point(fromLonLat([center.lng, center.lat])),
        //       }),
        //     ],
        //   }),
        //   style: new Icon({
        //     anchor: [0.5, 1],
        //     src: marker, // Replace with the actual path to your marker icon
        //   }),
        // }),
      ],
      view: new window.ol.View({
        center: [center.lng, center.lat],
        zoom: zoom,
      }),
    });
    console.log("Map object:", map);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default MapComponent;
