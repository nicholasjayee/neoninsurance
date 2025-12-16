"use client";

import React, { useState } from "react";
import { FiMapPin, FiAlertCircle } from "react-icons/fi";

interface LocationPickerProps {
  location: { latitude: number; longitude: number } | null;
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
}

export default function LocationPicker({
  location,
  onLocationChange,
}: LocationPickerProps) {
  const [manualEntry, setManualEntry] = useState(false);
  const [coords, setCoords] = useState({
    latitude: location?.latitude?.toString() || "",
    longitude: location?.longitude?.toString() || "",
  });

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          onLocationChange(newLocation);
          setCoords({
            latitude: newLocation.latitude.toString(),
            longitude: newLocation.longitude.toString(),
          });
        },
        (error) => {
          // Handle different geolocation errors gracefully
          let errorMessage = "Unable to get your current location. ";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Location permission was denied. Please enter manually.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable. Please enter manually.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out. Please enter manually.";
              break;
            default:
              errorMessage += "Please enter manually.";
          }
          
          alert(errorMessage);
          setManualEntry(true);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter coordinates manually.");
      setManualEntry(true);
    }
  };

  const handleManualSubmit = () => {
    const lat = parseFloat(coords.latitude);
    const lng = parseFloat(coords.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid coordinates");
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert("Please enter valid latitude (-90 to 90) and longitude (-180 to 180)");
      return;
    }

    onLocationChange({ latitude: lat, longitude: lng });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-text-primary mb-2">
          Where did the incident occur?
        </h3>
        <p className="text-brand-text-secondary">
          Pin the location of the incident on the map or enter coordinates
        </p>
      </div>

      {/* Location Display */}
      {location && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <FiMapPin className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-green-900">Location Captured</p>
            <p className="text-sm text-green-700">
              Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
              {location.longitude.toFixed(6)}
            </p>
          </div>
        </div>
      )}

      {/* Map Placeholder - In production, this would be a real map component */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-brand-border rounded-2xl p-12 text-center">
        <FiMapPin className="w-16 h-16 text-brand-primary mx-auto mb-4" />
        <p className="text-brand-text-primary font-medium mb-4">
          Interactive Map (Coming Soon)
        </p>
        <p className="text-sm text-brand-text-secondary mb-6">
          For now, use the buttons below to set your location
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            className="bg-brand-primary text-white font-medium py-3 px-6 rounded-xl hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2"
          >
            <FiMapPin />
            Use Current Location
          </button>
          <button
            type="button"
            onClick={() => setManualEntry(!manualEntry)}
            className="bg-white border-2 border-brand-border text-brand-text-primary font-medium py-3 px-6 rounded-xl hover:border-brand-primary transition-colors"
          >
            Enter Manually
          </button>
        </div>
      </div>

      {/* Manual Entry Form */}
      {manualEntry && (
        <div className="bg-white border-2 border-brand-border rounded-2xl p-6">
          <h4 className="font-bold text-brand-text-primary mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-brand-secondary" />
            Enter Coordinates Manually
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={coords.latitude}
                onChange={(e) =>
                  setCoords((prev) => ({ ...prev, latitude: e.target.value }))
                }
                placeholder="e.g., 0.3476"
                className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-secondary mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={coords.longitude}
                onChange={(e) =>
                  setCoords((prev) => ({ ...prev, longitude: e.target.value }))
                }
                placeholder="e.g., 32.5825"
                className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleManualSubmit}
            className="mt-4 w-full bg-brand-secondary text-white font-medium py-3 px-6 rounded-xl hover:bg-brand-secondary-light transition-colors"
          >
            Set Location
          </button>
        </div>
      )}

      <div className="bg-brand-neutral-subtle border border-brand-border rounded-xl p-4">
        <p className="text-sm text-brand-text-secondary">
          <strong>Note:</strong> The location helps us process your claim faster. You can
          also describe the location in the next step.
        </p>
      </div>
    </div>
  );
}
