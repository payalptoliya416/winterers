import type {Stay} from '../types';
import ImgBg from './ImgBg';import Button from './Button';
export default function StayCard({s,detailed}:{s:Stay;detailed?:boolean}){
return <div className="rounded-xl border border-navy/10 bg-white p-2.5 shadow-sm"><ImgBg name={s.img} className="h-40 rounded-lg"><span className="absolute right-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-medium">★ {s.rating}</span></ImgBg>
<div className="px-1 pb-1 pt-3"><p className="text-[10px] text-navy/50">{s.country}</p><h3 className="text-sm font-medium">{s.name}</h3><p className="mt-1 text-[10px] text-navy/50">{s.guests} guests · {s.beds} beds</p>
{detailed&&<p className="mt-2 text-[10px] text-navy/50">{s.tags}</p>}
<div className="mt-3 flex items-end justify-between"><div><b className="text-base">€{s.price}</b> <span className="text-[10px] text-navy/50">/night</span>{detailed&&<p className="text-[10px] text-navy/50">€{s.price*7} total · 7 nights</p>}</div><Button to={`/stays/${s.id}`} size="sm">View Stay</Button></div></div></div>}
