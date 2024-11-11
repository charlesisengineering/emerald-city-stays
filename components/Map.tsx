'use client'

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapCoordinates } from "@/types/userTypes";

const Map: React.FC<MapCoordinates> = ({latitude, longitude}) => {

    const MapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {

        const initMap = async () => {

            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
                version: "weekly"
                //libraries: ["places"]
            })

            const { Map } = await loader.importLibrary('maps');

            const map = new Map(MapRef.current as HTMLDivElement, {
                center: {lat: latitude, lng: longitude},
                zoom: 15
            });

            const circle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                center: {lat: latitude, lng: longitude},
                radius: 250
            });
    
            circle.setMap(map);

        }

        initMap();

    }, []);

    return (
        <div id="map" ref={MapRef} style={{ height: "50vh", width: "100%" }}></div>
    )
}

export default Map;