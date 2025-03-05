"use client";

import { useEffect, useState } from "react";
import { fromAddress, OutputFormat, setDefaults } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }: any) => {
  const [lat, setLat] = useState<number>(0);
  const [lag, setLag] = useState<number>(0);
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
    outputFormat: "json" as unknown as OutputFormat,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        if (res.results.length === 0) {
          setGeoCodeError(true);
          return;
        }
        setLat(res.results[0].geometry.location.lat);
        setLag(res.results[0].geometry.location.lng);
        setViewPort({
          ...viewPort,
          latitude: res.results[0].geometry.location.lat,
          longitude: res.results[0].geometry.location.lng,
        });
      } catch (error) {
        console.log(error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner />;

  if (geoCodeError) return <div className="text-2xl">Failed to load map</div>;

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={viewPort}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker latitude={lat} longitude={lag} anchor="bottom">
        <Image src={pin} height={40} width={40} alt="location" />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
