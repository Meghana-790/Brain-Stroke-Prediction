export default function InputField({label, type='text', value, onChange, placeholder}){
  return (
    <div className="text-black">
      <label className="block mb-1 text-sm text-black">{label}</label>
      <input className="input text-black" type={type} value={value||''} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  )
}
