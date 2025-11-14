export default function ResultCard({title, prob}){
  const pct = Math.round((prob||0)*100)
  const ok = (prob||0) < 0.5
  return (
    <div className="card text-black">
      <h3 className="font-medium mb-1 text-black">{title}</h3>
      <div className="text-2xl text-black">{pct}%</div>
      <div className={`mt-2 h-2 rounded ${ok? 'bg-green-300':'bg-red-300'}`} style={{width:`${pct}%`}}></div>
      <p className="text-sm mt-2 text-black">{ok? '✅ Low risk':'⚠️ Likely Stroke'}</p>
    </div>
  )
}
