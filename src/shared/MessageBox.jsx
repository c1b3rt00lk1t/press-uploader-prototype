import React from 'react'
import MessageItem from './MessageItem'

const MessageBox = ({msg}) => {
  // console.log(msg)
  return (
     <ul className='message-box'>
          {msg.map( (item,i) => <MessageItem key={i} item={item} />) }
        
    </ul>

  )
}

export default MessageBox