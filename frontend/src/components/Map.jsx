import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMapComponent = ({ schools, setFilteredSchools }) => {
  const [distance, setDistance] = useState([]);
  const origin = "KRIŠJĀŅA BARONA IELA 25 - 36";
  const destinations = schools.map((school) => school.address);

  const filterSchoolsByDistanceRadius = (allSchools, maps, map) => {
    const radius = 1;

    const filteredSchools = allSchools.filter(
      (school) => school.distance <= radius
    );
    setFilteredSchools(filteredSchools);
    addSchoolMarkers(filteredSchools, maps, map);
  };

  const addSchoolMarkers = (filteredSchools, maps, map) => {
    const geocoder = new maps.Geocoder();
    const destinations = filteredSchools.map((school) => school.address);

    destinations.forEach((destinationAddress, index) => {
      geocoder.geocode(
        { address: destinationAddress },
        (destinationResults, destinationStatus) => {
          if (destinationStatus === "OK") {
            const destinationLatLng = destinationResults[0].geometry.location;
            const markerDestination = new maps.Marker({
              position: destinationLatLng,
              map: map,
              label: "D",
            });

            const infoWindowDestination = new maps.InfoWindow({
              content: schools[index].name, // Display name in the info window
            });

            markerDestination.addListener("click", () => {
              infoWindowDestination.open(map, markerDestination);
            });
          } else {
            console.error("Error geocoding destination:", destinationStatus);
          }
        }
      );
    });
  };

  const calculateDistance = (map, maps) => {
    const distanceService = new maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === maps.DistanceMatrixStatus.OK) {
          const distances = response.rows[0].elements.map(
            (element) => element.distance.text
          );

          const floatDistances = distances.map((dist) =>
            parseFloat(dist.substring(0, dist.indexOf(" ")))
          );

          const newSchools = schools.map((school, index) => ({
            ...school,
            distance: floatDistances[index],
          }));
          console.log(JSON.stringify(newSchools));

          filterSchoolsByDistanceRadius(newSchools, maps, map);

          setDistance(distances);
        } else {
          console.error("Error fetching distance", status);
        }
      }
    );
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
