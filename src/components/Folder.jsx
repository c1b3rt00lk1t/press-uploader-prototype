import React from 'react'

const Folder = ({folder}) => {
  
  console.log(folder)

  return (
    <li draggable>  
      {folder.folder}
      <ul >
        {folder.files.map(file => <li draggable key={file.file.id}>{file.file.name.replace(/.pdf/g,'')}</li>)}
      </ul>
    </li>
  )
}

export default Folder