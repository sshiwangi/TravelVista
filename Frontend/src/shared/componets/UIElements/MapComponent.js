import React, { useRef, useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers styles
import { Map, View } from 'ol'; // Import specific OpenLayers components
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
 
import './Map.css';
 
const MapComponent = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;
 
  useEffect(() => {
    console.log('OpenLayers:', window.ol)
    console.log('Initializing map with center:', center, 'and zoom:', zoom);
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: [center.lng, center.lat],
        zoom: zoom,
      }),
    });
    console.log('Map object:', map);
  }, [center, zoom]);
 
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      // style={{width: '500px', height: '500px'}}
    //   id="map"
    ></div>
  );
};
 
export default MapComponent;