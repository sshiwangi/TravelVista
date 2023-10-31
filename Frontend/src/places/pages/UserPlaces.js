import React from 'react'
import {useParams} from 'react-router-dom'
import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire state building',
        description: 'One of the most famous sky scrapers in the world ',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 w 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. state building',
        description: 'One of the most famous sky scrapers in the world ',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 w 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

function UserPlaces() {
    const userId = useParams().userId; //executed as a function and gives us access to the parameters as it's called
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
    <PlaceList items={loadedPlaces}/>
  )
}

export default UserPlaces