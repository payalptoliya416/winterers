import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
const v:Record<string,string>={primary:'bg-navy text-white hover:bg-navy/90',light:'bg-white text-navy hover:bg-white/90',sky:'bg-sky text-navy hover:bg-sky/90',outline:'border border-sky/60 text-sky hover:bg-sky/10',ghost:'border border-white/40 text-white hover:bg-white/10',line:'border border-navy/20 text-navy hover:bg-navy/5'};
export default function Button({to,variant='primary',size='md',className='',children,onClick}:{to?:string;variant?:string;size?:'sm'|'md';className?:string;children:ReactNode;onClick?:()=>void}){
const c=`inline-flex items-center justify-center rounded-lg font-medium transition whitespace-nowrap ${size==='sm'?'px-3 py-1.5 text-xs':'px-5 py-2.5 text-sm'} ${v[variant]} ${className}`;
return to?<Link to={to} className={c} onClick={onClick}>{children}</Link>:<button className={c} onClick={onClick}>{children}</button>}
