import React from 'react'
import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire state building',
        description: 'One of the most famous sky scrapers in the world ',
        imageUrl: 'https://en.wikipedia.org/wiki/File:Empire_State_Building_(aerial_view).jpg',
        address: '20 w 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire state building',
        description: 'One of the most famous sky scrapers in the world ',
        imageUrl: 'https://en.wikipedia.org/wiki/File:Empire_State_Building_(aerial_view).jpg',
        address: '20 w 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

function UserPlaces() {
  return (
    <PlaceList items={DUMMY_PLACES}/>
  )
}

export default UserPlaces