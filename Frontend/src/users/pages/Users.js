import React from 'react'
import UsersList from '../components/UsersList'
function Users() {
    const USERS = [
        {id: 'ul', name: 'Max Schwarz', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80',places: 3 }
    ]
  return (
    <UsersList items={USERS}/>
  )
}

export default Users