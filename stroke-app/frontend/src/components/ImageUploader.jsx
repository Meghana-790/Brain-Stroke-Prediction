import { useState } from 'react'
export default function ImageUploader({onFile}){
  const [preview,setPreview]=useState(null)
  return (
    <div className="text-black">
      <input className="text-black" type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f){setPreview(URL.createObjectURL(f)); onFile(f)}}} />
      {preview && <img src={preview} alt="preview" className="mt-2 rounded max-h-48"/>}
    </div>
  )
}
