import type {ReactNode} from 'react';
import {img} from '../data';
export default function ImgBg({name,className='',overlay='',children}:{name:string;className?:string;overlay?:string;children?:ReactNode}){
return <div className={`relative overflow-hidden bg-slate-700 bg-cover bg-center ${className}`} style={{backgroundImage:`url(${img(name)})`}}>{overlay&&<div className={`absolute inset-0 ${overlay}`}/>}<div className="relative h-full">{children}</div></div>}
