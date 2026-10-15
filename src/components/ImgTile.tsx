import {Link} from 'react-router-dom';import ImgBg from './ImgBg';
export default function ImgTile({label,sub,name,to='/stays',className='h-28 sm:h-32'}:{label:string;sub?:string;name:string;to?:string;className?:string}){
return <Link to={to} className={`block ${className}`}><ImgBg name={name} className="h-full rounded-lg" overlay="bg-gradient-to-t from-navy/80 to-transparent"><div className="flex h-full flex-col justify-end p-3 text-white"><span className="text-sm font-medium">{label}</span>{sub&&<span className="text-[10px] text-white/70">{sub}</span>}</div></ImgBg></Link>}
