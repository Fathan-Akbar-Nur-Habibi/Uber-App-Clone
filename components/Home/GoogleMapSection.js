import React, { useEffect } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api'
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
  const [directionRoute, setDirectionRoutePoints]=useState([]);
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
    if(source.length!=[]&&destination.length!=[]) { 
      directionRoute();
    }
  }, [destination])


  const directionRoute=()=> { 
    const DirectionsService= new google.maps.DirectionsService();
    
    DirectionsService.route({ 
      origin:{lat:source.lat, lng:source.lng},
      destination:{LAT:destination.lat, lng:destination.lng},
      travelMode:google.maps.TravelMode.DRIVING
    }, (result, status)=> { 
      if(status==google.maps.DirectionsStatus.OK) { 
        setDirectionRoutePoints(result)
      }
      else { 
        console.error('Error');
      }
    })
  }
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
      zoom={11}
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
       >
        <OverlayView
        position={{lat:source.lat, lng:source.lng}}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='p-2 bg-white font-bold inline-block'> 
            <p className='text-black text-[18px]'>{source.label}</p>
          </div>
        </OverlayView>

       </MarkerF>:null}

    {destination.length!=[]? <MarkerF
      position={{lat:destination.lat, lng:destination.lng}}
      icon={{
        url:"/dest.png",
        scaledSize:{width:20, height:20}
      }}
       >
         <OverlayView
        position={{lat:destination.lat, lng:destination.lng}}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className='p-2 bg-white font-bold inline-block'> 
            <p className='text-black text-[18px]'>{destination.label}</p>
          </div>
        </OverlayView>
       </MarkerF>:null}  

      <DirectionsRenderer
         directions={directionRoutePoints}
         options={{
          polylineOptions:{ 
            strokeColor: '#000',
            strokeWeight:5
          },
          suppressMarkers:true
         }}
      />   
    </GoogleMap>
  ) 
}

export default GoogleMapSection