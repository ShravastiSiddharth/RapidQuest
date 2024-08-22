import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import './GeographicalDistribution.css'; 


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationWiseCustomer = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/customers/geographical-distribution');
        console.log(response.data)
        setCityData(response.data);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, []);

  const cityCoordinates = {
    "Plano": [33.0198, -96.6989],
    "El Paso": [31.7619, -106.4850],
    "Stockton": [37.9577, -121.2908],
    "San Antonio": [29.4241, -98.4936],
    "Oakland": [37.8044, -122.2711],
    "St. Paul": [44.9537, -93.0900],
    "Kansas City": [39.0997, -94.5786],
    "Seattle": [47.6062, -122.3321],
    "Washington": [38.9072, -77.0369],
    "Las Vegas": [36.1699, -115.1398],
    "Wichita": [37.6872, -97.3301],
    "Dallas": [32.7767, -96.7970],
    "Houston": [29.7604, -95.3698],
    "Hialeah": [25.8576, -80.2781],
    "San Jose": [37.3382, -121.8863],
    "Laredo": [27.5306, -99.4803],
    "Cincinnati": [39.1031, -84.5120],
    "Boston": [42.3601, -71.0589],
    "Austin": [30.2672, -97.7431],
    "San Francisco": [37.7749, -122.4194],
    "Chula Vista": [32.6401, -117.0842],
    "Fort Worth": [32.7555, -97.3308],
    "Detroit": [42.3314, -83.0458],
    "Henderson": [36.0395, -114.9817],
    "Aurora": [39.7294, -104.8319],
    "Jacksonville": [30.3322, -81.6557],
    "Colorado Springs": [38.8339, -104.8214],
    "Jersey City": [40.7178, -74.0431],
    "Denver": [39.7392, -104.9903],
    "Toledo": [41.6528, -83.5379],
    "Corpus Christi": [27.8006, -97.3964],
    "Memphis": [35.1495, -90.0490],
    "Chicago": [41.8781, -87.6298],
    "Los Angeles": [34.0522, -118.2437],
    "Columbus": [39.9612, -82.9988],
    "Lexington": [38.0406, -84.5037],
    "Tucson": [32.2226, -110.9747],
    "Santa Ana": [33.7455, -117.8677],
    "Riverside": [33.9806, -117.3755],
    "Buffalo": [42.8864, -78.8784],
    "Newark": [40.7357, -74.1724],
    "Gilbert": [33.3528, -111.7890],
    "Bakersfield": [35.3733, -119.0187],
    "Tulsa": [36.1539, -95.9928],
    "Atlanta": [33.7490, -84.3880],
    "Greensboro": [36.0726, -79.7920],
    "Minneapolis": [44.9778, -93.2650],
    "Chattanooga": [35.0456, -85.3097],
    "New York": [40.7128, -74.0060],
    "Baltimore": [39.2904, -76.6122],
    "San Diego": [32.7157, -117.1611],
    "Nashville": [36.1627, -86.7816],
    "Oklahoma City": [35.4676, -97.5164],
    "Orlando": [28.5383, -81.3792],
    "Garland": [32.9126, -96.6389],
    "St. Petersburg": [27.7676, -82.6403],
    "Honolulu": [21.3069, -157.8583],
    "St. Louis": [38.6270, -90.1994],
    "Charlotte": [35.2271, -80.8431],
    "Tampa": [27.9506, -82.4572],
    "Phoenix": [33.4484, -112.0740],
    "Portland": [45.5152, -122.6784],
    "Glendale": [33.5387, -112.1860],
    "Philadelphia": [39.9526, -75.1652],
    "Lincoln": [40.8136, -96.7026],
    "Miami": [25.7617, -80.1918],
    "Cleveland": [41.4993, -81.6944],
    "Arlington": [32.7357, -97.1081],
    "Indianapolis": [39.7684, -86.1581],
    "Fort Wayne": [41.0793, -85.1394],
    "Anaheim": [33.8366, -117.9143],
    "Madison": [43.0731, -89.4012],
    "Raleigh": [35.7796, -78.6382]
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Geographical Distribution of Customers</h2>
      <MapContainer center={[39.8283, -98.5795]} zoom={4} className="w-full h-96 rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {cityData.map(city => (
          cityCoordinates[city._id] && (
            <Marker key={city._id} position={cityCoordinates[city._id]}>
              <Popup>
                <strong>{city._id}</strong><br />
                Customers: {city.count}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationWiseCustomer;
