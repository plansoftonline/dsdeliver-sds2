import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';
import AsyncSelect from 'react-select/async'
import { fetchLocalMapBox } from '../api';

  const initialPosition = {
      alt: -18.45454,
      lng: -48.26201
  }

type Place = {
     label?: string;
     value?: string;
     position: {
       lat: number;
       lng: number;
     }
 }

function OrderLocation() {

    const [address, setAddress] = useState<Place>({
        position: initialPosition
     });
    

    const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
         const response = await fetchLocalMapBox(inputValue);
      
         const places = response.data.features.map((item: any) => {
           return ({
             label: item.place_name,
             value: item.place_name,
             position: {
               lat: item.center[1],
               lng: item.center[0]
             },
             place: item.place_name,
           });
         });
      
         callback(places);
       };
      
      const handleChangeSelect = (place: Place) => {
        setAddress(place);
        //   onChangeLocation({
        //    latitude: place.position.lat,
        //    longitude: place.position.lng,
        //    address: place.label!
        //  });
      };


    return (

        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o pedido deverá ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect 
                        placeholder="Digite o endereço aqui"
                        className="filter"
                        loadOptions={loadOptions}
                        onChange={value => handleChangeSelect(value as Place)}
                    /> 
                </div>

                <MapContainer center={[initialPosition.alt, initialPosition.lng]} zoom={15} scrollWheelZoom={false}>
                    

                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker  position={[initialPosition.alt, initialPosition.lng]}>
                        <Popup>
                            meu marcador
                        </Popup>
                    </Marker>
                </MapContainer>


            </div>
        </div>
    )
}

export default OrderLocation