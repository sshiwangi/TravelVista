import React, { useRef, useEffect } from "react";
// import { ol } from "ol";
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
  console.log({ center, zoom });

  useEffect(() => {
    // console.log("OpenLayers:", window.ol);
    // console.log("Initializing map with center:", center, "and zoom:", zoom);
    const map = new window.ol.Map({
      target: mapRef.current,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
        new window.ol.layer.Vector({
          source: new window.ol.source.Vector({
            features: [
              new window.ol.Feature({
                geometry: new window.ol.geom.Point(
                  window.ol.proj.fromLonLat([center.lng, center.lat])
                ),
              }),
            ],
          }),
          style: new window.ol.style.Style({
            image: new window.ol.style.Icon({
              anchor: [0.5, 1],
              src: marker,
            }),
          }),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
    console.log("Map object:", map);
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map`}
      // style={props.style}
    ></div>
  );
};

export default MapComponent;
