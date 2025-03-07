"use client"
import React, {useContext, useEffect} from 'react'
import Input_Item from './Input_Item'
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import CarListOptions from './CarListOptions';

function SearchSection() {
  const {source, setSource}=useContext(SourceContext); 
  const {destination,setDestination}=useContext(DestinationContext);
  const [distance,setDistance] = useState();
  const calculateDistance=()=> { 
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
      {lat:source.lat, lng:source.lng},
    {lat:destination.lat, lng:destination.lng}
  )
 // console.log(dist*0.000621374);
  setDestination(dist*0.000621374);
  }
  return (
    <div> 

    <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'> Get a ride </p>
        <Input_Item type='source'/>
        <Input_Item type='destination'/>

        <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'
        onClick={()=> calculateDistance()}
        >Search</button>
    </div>
    {distance?<CarListOptions distance={distance}/>:null}
    </div>
  )
}

export default SearchSection