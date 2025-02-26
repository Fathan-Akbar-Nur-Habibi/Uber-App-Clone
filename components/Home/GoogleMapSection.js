import React, { useEffect } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { sources } from 'next/dist/compiled/webpack/webpack';
import { DestinationContext } from '@/context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = { 
    width: '100%', 
    height: window.innerWidth*0.45
  }; 
  const [center,setCenter] = useState( { 
    lat:-3.745, 
    lng:-38.523
   }); 


//  const { isLoaded } = useJsApiLoader({
 //   id: 'google-map-script',
 //   googleMapsApiKey: 'YOUR_API_KEY'//process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
 // })

  const [map, setMap] = React.useState(null)
  useEffect(()=> { 
    if(sources ?.length!=[]&&map) { 
     map.panTo (
      { 
        lat:sources.lat, 
        lng:sources.lng
       }
     )
      setCenter({ 
      lat:sources.lat, 
      lng:sources.lng
     }) ; 

    }
  }, [source])

  useEffect(()=> { 
    if(destination?.length!=[]&&map) { 
     setCenter({ 
      lat:destination.lat, 
      lng:destination.lng
     }) 
    }
  }, [destination])

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return   (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId:'this is my id'}}
    >
    {source.length!=[]? <MarkerF
      position={{lat:source.lat, lng:source.lng}}
      icon={{
        url:"/source.png",
        scaledSize:{width:20, height:20}
      }}
       />:null}

    {destination.length!=[]? <MarkerF
      position={{lat:destination.lat, lng:destination.lng}}
      icon={{
        url:"/dest.png",
        scaledSize:{width:20, height:20}
      }}
       />:null}       
    </GoogleMap>
  ) 
}

export default GoogleMapSection