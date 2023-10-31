export const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const RADIUS = 6371 // radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const angle =
    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) *
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)

  const circumference = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle))
  return RADIUS * circumference
}
