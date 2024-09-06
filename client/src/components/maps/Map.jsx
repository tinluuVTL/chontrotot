import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { memo, useEffect, useState } from "react"
import { apiGetLngLatFromAddress } from "~/apis/app"

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const Map = ({ address = "", zoom = 12 }) => {
  const [center, setCenter] = useState([])
  const fetchLongtitudeAndLatitude = async () => {
    if (address) {
      const response = await apiGetLngLatFromAddress({
        text: address,
        apiKey: import.meta.env.VITE_GEOCODING_API_KEY,
      })
      if (response.status === 200 && response.data.features.length > 0)
        setCenter([
          response.data.features[0]?.geometry?.coordinates[1],
          response.data.features[0]?.geometry?.coordinates[0],
        ])
      else {
        window.navigator.geolocation.getCurrentPosition((position) => {
          setCenter([position.coords.latitude, position.coords.longitude])
        })
      }
    }
  }
  useEffect(() => {
    fetchLongtitudeAndLatitude()
  }, [address])

  return (
    <>
      {center && center.length > 0 && (
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url={url} attribution={attribution} />
          {center && (
            <Marker position={center}>
              <Popup>
                <b>{address}</b>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
      {!center && <span>Bản đồ bị lỗi</span>}
    </>
  )
}

export default memo(Map)
