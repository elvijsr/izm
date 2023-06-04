import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";

const GoogleMapComponent = ({ schools, setFilteredSchools, origin }) => {
  const destinations = schools.map((school) => school.address);
  const [googleApiObj, setIsGoogleApiLoadedObj] = useState(null);
  const [center, setCenter] = useState([56.95, 24.116667]);

  useEffect(() => {
    if (googleApiObj) {
      const { map, maps } = googleApiObj;
      // or else call that isApiLoaded function and pass-on these arguments
      calculateDistance(map, maps);
      transformOrigin(origin, maps);
    }
  }, [googleApiObj, origin]);

  const transformOrigin = (origin, maps) => {
    const geocoder = new maps.Geocoder();

    geocoder.geocode(
      { address: origin },
      (destinationResults, destinationStatus) => {
        if (destinationStatus === "OK") {
          const { lat, lng } = destinationResults[0].geometry.location;
          const originGeocodeAsArray = [lat(), lng()];
          setCenter(originGeocodeAsArray);
        } else {
          console.error("Error geocoding destination:", destinationStatus);
        }
      }
    );
  };

  const filterSchoolsByDistanceRadius = (allSchools, maps, map) => {
    const radius = 1000;

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
    console.log(origin);
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

          const drivingDurations = response.rows[0].elements.map(
            (element) => element.duration.text
          );

          const floatDistances = distances.map((dist) =>
            parseFloat(dist.substring(0, dist.indexOf(" ")))
          );

          distanceService.getDistanceMatrix(
            {
              origins: [origin],
              destinations: destinations,
              travelMode: maps.TravelMode.WALKING,
            },
            (response, status) => {
              if (status === maps.DistanceMatrixStatus.OK) {
                const walkingDurations = response.rows[0].elements.map(
                  (element) => element.duration.text
                );

                const newSchools = schools.map((school, index) => ({
                  ...school,
                  distance: floatDistances[index],
                  duration: drivingDurations[index],
                  walkingDuration: walkingDurations[index],
                }));

                filterSchoolsByDistanceRadius(newSchools, maps, map);
              } else {
                console.error("Error fetching distance", status);
              }
            }
          );
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
        center={center}
        defaultZoom={13}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          setIsGoogleApiLoadedObj({
            map,
            maps,
          })
        }
      ></GoogleMapReact>
    </div>
  );
};

export default GoogleMapComponent;
