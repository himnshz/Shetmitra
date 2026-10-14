export interface DetectedLocation {
  latitude: number;
  longitude: number;
  district: string;
  taluka: string;
  village: string;
  state: string;
  confidence: string;
  source: 'gps' | 'ip' | 'default';
}

// Bounding box / centroid proximity for Maharashtra districts
const DISTRICT_CENTROIDS: Array<{
  name: string;
  lat: number;
  lng: number;
  defaultTaluka: string;
  defaultVillage: string;
}> = [
  { name: 'Jalgaon (जळगाव)', lat: 21.0077, lng: 75.5626, defaultTaluka: 'भुसावळ / जळगाव', defaultVillage: 'वरणगाव' },
  { name: 'Nashik (नाशिक)', lat: 19.9975, lng: 73.7898, defaultTaluka: 'दिंडोरी / निफाड', defaultVillage: 'पिंपळगाव' },
  { name: 'Pune (पुणे)', lat: 18.5204, lng: 73.8567, defaultTaluka: 'बारामती / हवेली', defaultVillage: 'माळेगाव' },
  { name: 'Ahmednagar (अहिल्यानगर/अहमदनगर)', lat: 19.0952, lng: 74.7496, defaultTaluka: 'राहुरी / कोपरगाव', defaultVillage: 'देवळाली प्रवरा' },
  { name: 'Solapur (सोलापूर)', lat: 17.6599, lng: 75.9064, defaultTaluka: 'पंढरपूर / माळशिरस', defaultVillage: 'कुर्डूवाडी' },
  { name: 'Chhatrapati Sambhajinagar (छ. संभाजीनगर)', lat: 19.8762, lng: 75.3433, defaultTaluka: 'पैठण / गंगापूर', defaultVillage: 'बिडकीन' },
  { name: 'Kolhapur (कोल्हापूर)', lat: 16.7050, lng: 74.2433, defaultTaluka: 'करवीर / हातकणंगले', defaultVillage: 'इचलकरंजी' },
  { name: 'Nagpur (नागपूर)', lat: 21.1458, lng: 79.0882, defaultTaluka: 'काटोल / सावनेर', defaultVillage: 'कळमेश्वर' },
  { name: 'Amravati (अमरावती)', lat: 20.9374, lng: 77.7796, defaultTaluka: 'अचलपूर / चांदूर', defaultVillage: 'परतवाडा' },
  { name: 'Latur (लातूर)', lat: 18.4088, lng: 76.5604, defaultTaluka: 'औसा / निलंगा', defaultVillage: 'मुरुड' },
  { name: 'Dhule (धुळे)', lat: 20.9042, lng: 74.7749, defaultTaluka: 'शिरपूर / साक्री', defaultVillage: 'दौंडाईचा' },
  { name: 'Nanded (नांदेड)', lat: 19.1383, lng: 77.3210, defaultTaluka: 'लोहा / हदगाव', defaultVillage: 'मुदखेड' },
  { name: 'Satara (सातारा)', lat: 17.6805, lng: 74.0183, defaultTaluka: 'कराड / वाई', defaultVillage: 'कोरेगाव' },
  { name: 'Sangli (सांगली)', lat: 16.8524, lng: 74.5815, defaultTaluka: 'मिरज / तासगाव', defaultVillage: 'विटा' },
];

function findNearestDistrict(lat: number, lng: number) {
  let nearest = DISTRICT_CENTROIDS[0];
  let minDistance = Number.MAX_VALUE;

  for (const d of DISTRICT_CENTROIDS) {
    const dist = Math.hypot(d.lat - lat, d.lng - lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = d;
    }
  }

  return nearest;
}

export const locationService = {
  async detectCurrentLocation(): Promise<DetectedLocation> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      // Default to Jalgaon, Maharashtra
      return {
        latitude: 21.0077,
        longitude: 75.5626,
        district: 'Jalgaon (जळगाव)',
        taluka: 'भुसावळ',
        village: 'वरणगाव',
        state: 'Maharashtra',
        confidence: 'Default Rural Cluster',
        source: 'default',
      };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Attempt fast reverse geocoding via OpenStreetMap or fallback to closest centroid
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);

            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
              {
                headers: { 'Accept-Language': 'en' },
                signal: controller.signal,
              }
            );
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              const address = data.address || {};
              const rawDistrict = address.state_district || address.county || address.city || '';
              const state = address.state || 'Maharashtra';
              const taluka = address.subdistrict || address.town || address.village || '';
              const village = address.village || address.suburb || address.neighbourhood || '';

              // Match against known Maharashtra districts
              const matched = DISTRICT_CENTROIDS.find((d) =>
                rawDistrict.toLowerCase().includes(d.name.toLowerCase().split(' ')[0])
              );

              if (matched) {
                return resolve({
                  latitude: lat,
                  longitude: lng,
                  district: matched.name,
                  taluka: taluka || matched.defaultTaluka,
                  village: village || matched.defaultVillage,
                  state,
                  confidence: 'High (GPS + Reverse Geocoding)',
                  source: 'gps',
                });
              }
            }
          } catch (e) {
            // Reverse geocode failed or timed out, fallback to nearest centroid calculation
          }

          // Fallback to nearest centroid
          const nearest = findNearestDistrict(lat, lng);
          resolve({
            latitude: lat,
            longitude: lng,
            district: nearest.name,
            taluka: nearest.defaultTaluka,
            village: nearest.defaultVillage,
            state: 'Maharashtra',
            confidence: 'High (GPS Coordinates Proximity)',
            source: 'gps',
          });
        },
        (_error) => {
          // Geolocation permission denied or unavailable
          resolve({
            latitude: 21.0077,
            longitude: 75.5626,
            district: 'Jalgaon (जळगाव)',
            taluka: 'भुसावळ',
            village: 'वरणगाव',
            state: 'Maharashtra',
            confidence: 'Fallback Default (Maharashtra)',
            source: 'default',
          });
        },
        { timeout: 7000, enableHighAccuracy: true }
      );
    });
  },
};
