"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function Input_Item(type) {
  const [value, setValue] = useState(null);
  const[placeholder, setPlaceholder] = useState(null);

  useEffect(()=> { 
    type=='source'
    ?setPlaceholder('Pickup Location')
    :setPlaceholder('Dropoff Location')
  },[]);

  const getLatAndLng=(place, type)=>{ 
    const placeId=place.value.place_id;
    const service= new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails ({placeId},(place, status) => { 
      if(status==='OK' && place.geometry && place.geometry.location) 
        { 
        console.log(place.geometry.location.lat());
      }
    })
  }
  return (
    <div className= 'bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
        <Image src={type=='source'?'/source.png':'/dest.jpg'} width={15} height={15} />
        {/*<input type='text' placeholder={type=='source'?'Pickup Location':'Dropoff Location'} 
        className='bg-transparent w-full outline-none' /> */}
        <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
              value,
              onChange: (place)=>{getLatAndLng(place, type);setValue(place)},
              placeholder: 'Pickup Location',
              isClearable: true, 
              className: 'w-full',
              components: { 
                DropdownIndicator:false
              },
              styles: { 
                control: (provided) => ({ 
                  ...provided,
                  backgroundColor: '#00ffff00',
                  border: 'none'
                })
              }
            }}
        
        />

    </div>
  )
}

export default Input_Item