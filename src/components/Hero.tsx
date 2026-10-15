import type {ReactNode} from 'react';
import ImgBg from './ImgBg';import Container from './Container';
export default function Hero({name,eyebrow,title,accent,text,tall,children,search}:{name:string;eyebrow?:string;title:string;accent:string;text?:string;tall?:boolean;children?:ReactNode;search?:ReactNode}){
return <ImgBg name={name} overlay="bg-navy/70"><div className={`flex flex-col items-center text-center text-white ${tall?'pb-28 md:pb-36':'pb-16 md:pb-24'} pt-36 md:pt-40`}><Container>
{eyebrow&&<p className="mb-3 text-[10px] uppercase tracking-wider text-white/60">{eyebrow}</p>}
<h1 className="text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">{title}<br className="hidden sm:block"/> <span className="text-sky">{accent}</span></h1>
{text&&<p className="mx-auto mt-4 max-w-md text-xs text-white/70 md:text-sm">{text}</p>}
{children&&<div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}</Container></div>
{search&&<Container className="absolute inset-x-0 bottom-0 translate-y-1/2 !max-w-[900px]">{search}</Container>}</ImgBg>}
