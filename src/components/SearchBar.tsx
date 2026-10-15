import {useAppDispatch as useDispatch,useAppSelector as useSelector} from '../store/hooks';import {setField} from '../store/searchSlice';import Button from './Button';
const f=[['where','Where','Where do you want to go?','text'],['checkIn','Check-in','Add date','date'],['checkOut','Check-out','Add date','date'],['guests','Guests','Add guests','number']] as const;
export default function SearchBar({cta='Find Winter Stays',chips=true,className=''}:{cta?:string;chips?:boolean;className?:string}){
const d=useDispatch(),v=useSelector(s=>s.search);
return <div className={`rounded-2xl bg-white p-3 text-navy shadow-xl sm:p-4 ${className}`}><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
{f.map(([n,l,p,t])=><label key={n} className="rounded-lg bg-mist px-3 py-2 text-left"><span className="block text-[10px] font-medium">{l}</span><input type={t} placeholder={p} value={v[n]} onChange={e=>d(setField({name:n,value:e.target.value}))} className="w-full bg-transparent text-[10px] outline-none placeholder:text-navy/40"/></label>)}
<Button className="sm:col-span-2 lg:col-span-1">{cta}</Button></div>
{chips&&<div className="mt-3 flex flex-wrap justify-center gap-2 border-t border-navy/10 pt-3">{['The Alps','Norway','Finland','Iceland','Switzerland'].map(c=><button key={c} onClick={()=>d(setField({name:'where',value:c}))} className="rounded-full border border-navy/20 px-3 py-0.5 text-[10px] hover:bg-mist">{c}</button>)}</div>}</div>}
