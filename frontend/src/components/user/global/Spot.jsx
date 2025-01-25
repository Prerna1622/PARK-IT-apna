import React, { useState, useEffect } from "react";

export const Spot = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [filters, setFilters] = useState({ distance: "nearby" }); // Filters state
  const [location, setLocation] = useState(null); // User's location (for nearby calculation)

  // Simulate fetching parking spots
  useEffect(() => {
    // Simulate an API call to fetch parking spots based on location and filter
    const fetchParkingSpots = async () => {
      const fetchedParkingSpots = [
        {
          id: 1,
          name: "Downtown Parking Lot",
          description: "Available: 5 spaces. Located at the heart of the city.",
          price: "$5/hour",
          image: "https://via.placeholder.com/200",
          location: { latitude: 40.7128, longitude: -74.0060 }, // Example coordinates
        },
        {
          id: 2,
          name: "Beachside Parking",
          description: "Available: 10 spaces. Near the beach.",
          price: "$3/hour",
          image: "https://via.placeholder.com/200",
          location: { latitude: 40.7328, longitude: -73.9980 },
        },
        {
          id: 3,
          name: "Mall Parking Garage",
          description: "Available: 50 spaces. 24/7 parking available.",
          price: "$2/hour",
          image: "https://via.placeholder.com/200",
          location: { latitude: 40.7538, longitude: -73.9857 },
        },
      ];

      // Set parking spots data
      setParkingSpots(fetchedParkingSpots);
    };

    fetchParkingSpots();
  }, []);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords);
      });
    }
  }, []);

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setFilters((prev) => ({ ...prev, ...filter }));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Filter Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filterDistance" style={{ marginRight: "10px" }}>
          Filter by:
        </label>
        <select
          id="filterDistance"
          value={filters.distance}
          onChange={(e) => handleFilterChange({ distance: e.target.value })}
          style={{ padding: "8px", fontSize: "16px" }}
        >
          <option value="nearby">Nearby (5 km)</option>
          <option value="all">All Listed Parking Spots</option>
        </select>
      </div>

      {/* Parking Spots Display */}
      <h1>{filters.distance === "nearby" ? "Nearby Parking Spots" : "All Listed Parking Spots"}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {parkingSpots.length > 0 ? (
          parkingSpots.map((spot) => (
            <div
              key={spot.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={spot.image}
                alt={spot.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
              />
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
              <p><strong>Price: {spot.price}</strong></p>
              <div>
                <button
                  onClick={() => alert("Explore " + spot.name)}
                  style={{ padding: "8px 16px", margin: "5px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white" }}
                >
                  Explore
                </button>
                <button
                  onClick={() => alert("Book Now " + spot.name)}
                  style={{ padding: "8px 16px", margin: "5px", cursor: "pointer", backgroundColor: "#f44336", color: "white" }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No parking spots available</p>
        )}
      </div>
    </div>
  );
};
