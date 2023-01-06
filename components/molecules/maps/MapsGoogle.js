import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  StreetViewService,
} from "@react-google-maps/api";
import { Text } from "@chakra-ui/react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -8,
  lng: 115,
};
const pos = {
  lat: -8.671651399970395,
  lng: 115.23387908935547,
};
export default function MapsGoogle({ children }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB_k-58yMIFGQVYhNf7dyHjDJbFg8zpxv8",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = (e) => {
    const InfoWindow = new window.google.maps.InfoWindow();
    console.log(InfoWindow);
  };

  const onLoadService = (streetViewService) => {
    streetViewService.getPanorama(
      {
        location: pos,
      },
      (data, status) =>
        console.log("StreetViewService results", { data, status })
    );
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pos}
      zoom={17}
      onLoad={onload}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={pos} onClick={handleClick} />
      <StreetViewService onUnmount={onLoadService} />
    </GoogleMap>
  ) : (
    <></>
  );
}
