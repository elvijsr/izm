import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import skolas from "../assets/skolas.json"; // Import the skolas.json file

const GoogleMapComponent = () => {
  const [distance, setDistance] = useState("");
  const origin = "KRIŠJĀŅA BARONA IELA 25 - 36";
  const destination = skolas.map((skola) => skola.address); // Get addresses from skolas.json

  const calculateDistance = (map, maps) => {
    const geocoder = new maps.Geocoder();

    geocoder.geocode({ address: origin }, (originResults, originStatus) => {
      if (originStatus === "OK") {
        const originLatLng = originResults[0].geometry.location;
        const markerOrigin = new maps.Marker({
          position: originLatLng,
          map: map,
          label: "O",
        });

        const infoWindowOrigin = new maps.InfoWindow({
          content: origin,
        });
        markerOrigin.addListener("click", () => {
          infoWindowOrigin.open(map, markerOrigin);
        });

        destination.forEach((destinationAddress, index) => {
          geocoder.geocode(
            { address: destinationAddress },
            (destinationResults, destinationStatus) => {
              if (destinationStatus === "OK") {
                const destinationLatLng =
                  destinationResults[0].geometry.location;
                const markerDestination = new maps.Marker({
                  position: destinationLatLng,
                  map: map,
                  label: "D",
                });

                const infoWindowDestination = new maps.InfoWindow({
                  content: skolas[index].name, // Display name in the info window
                });

                // Remove the line that opens the info window by default

                markerDestination.addListener("click", () => {
                  infoWindowDestination.open(map, markerDestination);
                });

                const distanceService = new maps.DistanceMatrixService();
                distanceService.getDistanceMatrix(
                  {
                    origins: [originLatLng],
                    destinations: [destinationLatLng],
                    travelMode: maps.TravelMode.DRIVING,
                  },
                  (response, status) => {
                    if (status === maps.DistanceMatrixStatus.OK) {
                      const newDistance = response.rows[0].elements[0].distance;
                      setDistance((prevDistance) =>
                        prevDistance
                          ? prevDistance + ", " + newDistance.text
                          : newDistance.text
                      );
                    } else {
                      console.error("Error fetching distance", status);
                    }
                  }
                );
              } else {
                console.error(
                  "Error geocoding destination:",
                  destinationStatus
                );
              }
            }
          );
        });
      } else {
        console.error("Error geocoding origin:", originStatus);
      }
    });
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAPS_API_KEY }}
        defaultCenter={{ lat: 56.95, lng: 24.116667 }}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => calculateDistance(map, maps)}
      ></GoogleMapReact>
      <p>Distance: {distance}</p>
    </div>
  );
};

export default GoogleMapComponent;
