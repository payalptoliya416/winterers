import type {ReactNode} from 'react';
import ImgBg from './ImgBg';
export default function Feature({name,tone='mist',reverse,eyebrow,title,text,children}:{name:string;tone?:'mist'|'dark'|'light';reverse?:boolean;eyebrow:string;title:string;text:string;children?:ReactNode}){
return <div className={`grid overflow-hidden rounded-2xl md:grid-cols-2 ${tone==='dark'?'bg-navy text-white':'bg-mist'}`}><ImgBg name={name} className={`min-h-[260px] ${reverse?'md:order-2':''}`}/><div className="flex flex-col justify-center p-6 md:p-10"><p className="mb-2 text-[10px] uppercase tracking-wider text-sky">{eyebrow}</p><h2 className="text-2xl font-medium md:text-3xl">{title}</h2><p className="mt-3 text-xs opacity-70">{text}</p><div className="mt-6">{children}</div></div></div>}
