import { useState, useEffect, useCallback } from 'react';
import { FarmerProfile } from '../types';
import { locationService, DetectedLocation } from '../services/locationService';

export interface UseAutoGeolocationOptions {
  onLocationDetected?: (location: DetectedLocation) => void;
  autoUpdateProfile?: boolean;
}

export function useAutoGeolocation(
  farmerProfile: FarmerProfile,
  onUpdateProfile: (updated: FarmerProfile) => void,
  options: UseAutoGeolocationOptions = { autoUpdateProfile: true }
) {
  const [detectedLocation, setDetectedLocation] = useState<DetectedLocation | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt');
  const [isGpsEnabled, setIsGpsEnabled] = useState<boolean>(true);

  const performDetection = useCallback(async (isUserGesture: boolean = false) => {
    setIsDetecting(true);
    setError(null);

    try {
      const loc: DetectedLocation = await locationService.detectCurrentLocation();

      setDetectedLocation(loc);
      setIsDetecting(false);
      setPermissionStatus(loc.source === 'gps' ? 'granted' : 'prompt');
      setIsGpsEnabled(true);

      if (options.onLocationDetected) {
        options.onLocationDetected(loc);
      }

      if (options.autoUpdateProfile !== false) {
        const needsUpdate =
          !farmerProfile.coordinates ||
          farmerProfile.district !== loc.district ||
          farmerProfile.coordinates.lat !== loc.latitude ||
          farmerProfile.coordinates.lng !== loc.longitude;

        if (needsUpdate) {
          const updatedProfile: FarmerProfile = {
            ...farmerProfile,
            district: loc.district,
            taluka: loc.taluka || farmerProfile.taluka,
            village: loc.village || farmerProfile.village,
            coordinates: {
              lat: loc.latitude,
              lng: loc.longitude,
            },
          };

          onUpdateProfile(updatedProfile);
        }
      }
    } catch (err: any) {
      setIsDetecting(false);
      setError(err?.message || 'Location permission request failed');
      setPermissionStatus('denied');
    }
  }, [farmerProfile, onUpdateProfile, options]);

  // Request explicitly on user gesture (Toggle / Button click)
  const requestLocationPermission = useCallback(async () => {
    return performDetection(true);
  }, [performDetection]);

  const toggleGps = useCallback(() => {
    if (isGpsEnabled) {
      setIsGpsEnabled(false);
    } else {
      performDetection(true);
    }
  }, [isGpsEnabled, performDetection]);

  const selectManualDistrict = useCallback((districtName: string, taluka?: string) => {
    const updatedProfile: FarmerProfile = {
      ...farmerProfile,
      district: districtName,
      taluka: taluka || farmerProfile.taluka,
    };
    onUpdateProfile(updatedProfile);
  }, [farmerProfile, onUpdateProfile]);

  useEffect(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setPermissionStatus('unsupported');
      return;
    }

    // Check existing permission state if supported by browser Permissions API
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((perm) => {
          setPermissionStatus(perm.state as 'prompt' | 'granted' | 'denied');
          perm.onchange = () => {
            setPermissionStatus(perm.state as 'prompt' | 'granted' | 'denied');
          };
        })
        .catch(() => {});
    }

    // Run initial detection
    performDetection(false);
  }, []);

  return {
    detectedLocation,
    isDetecting,
    error,
    permissionStatus,
    isGpsEnabled,
    requestLocationPermission,
    toggleGps,
    selectManualDistrict,
  };
}
