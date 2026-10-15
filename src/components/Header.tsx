import {useState} from 'react';import {Link,NavLink} from 'react-router-dom';import Button from './Button';import {nav} from '../data';
export default function Header(){
const [o,setO]=useState(false);
return <header className="absolute inset-x-0 top-0 z-30 p-2 sm:p-3"><div className="mx-auto max-w-[1400px] rounded-xl bg-white shadow-md"><div className="flex items-center justify-between px-3 py-2 sm:px-4">
<Link to="/" className="font-head text-lg font-bold tracking-tight">▲ WINTERERS</Link>
<nav className="hidden items-center gap-8 text-xs lg:flex">{nav.map(([l,t])=><NavLink key={t} to={t} className={({isActive})=>isActive?'text-sky':'hover:text-sky'}>{l}</NavLink>)}</nav>
<div className="hidden items-center gap-2 lg:flex"><Button variant="line" size="sm">Sign In</Button><Button to="/list-property" size="sm">List Your Property</Button></div>
<button aria-label="Menu" onClick={()=>setO(!o)} className="flex h-9 w-9 flex-col items-center justify-center gap-1 lg:hidden"><i className={`h-0.5 w-5 bg-navy transition ${o?'translate-y-1.5 rotate-45':''}`}/><i className={`h-0.5 w-5 bg-navy ${o?'opacity-0':''}`}/><i className={`h-0.5 w-5 bg-navy transition ${o?'-translate-y-1.5 -rotate-45':''}`}/></button></div>
{o&&<div className="space-y-1 border-t border-navy/10 p-4 lg:hidden">{nav.map(([l,t])=><NavLink key={t} to={t} onClick={()=>setO(false)} className={({isActive})=>`block rounded-lg px-3 py-2 text-sm ${isActive?'bg-mist text-sky':''}`}>{l}</NavLink>)}
<div className="flex gap-2 pt-2"><Button variant="line" className="flex-1">Sign In</Button><Button to="/list-property" className="flex-1" onClick={()=>setO(false)}>List Your Property</Button></div></div>}</div></header>}
