import { useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./Map.scss";

const Map = () => {
  const center = useMemo(() => ({ lat: 49.246292, lng: -123.116226 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.googleMapsApiKey}`,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <GoogleMap
      zoom={10}
      center={center}
      options={options}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
};

export default Map;