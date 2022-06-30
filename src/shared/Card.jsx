import React from 'react'
import MessageBox from './MessageBox'


const Card = ({children, status, msg}) => {
  return (
    <div className={`card ${status === undefined ? "card-pending" : (status ? "card-completed" : "card-error")}`}>
      {!!msg.length && <MessageBox msg={msg} />}

        {children}
    </div>
  )
}

export default Card