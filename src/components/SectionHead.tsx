import Button from './Button';
export default function SectionHead({eyebrow,title,sub,action,to,dark,center}:{eyebrow?:string;title:string;sub?:string;action?:string;to?:string;dark?:boolean;center?:boolean}){
return <div className={`mb-8 flex flex-col gap-4 ${center?'items-center text-center':'sm:flex-row sm:items-end sm:justify-between'}`}><div>
{eyebrow&&<p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-sky">{eyebrow}</p>}
<h2 className="text-2xl font-medium md:text-3xl">{title}</h2>{sub&&<p className={`mt-2 max-w-xl text-xs ${dark?'text-white/60':'text-navy/50'}`}>{sub}</p>}</div>
{action&&<Button to={to} variant={dark?'outline':'primary'} size="sm">{action}</Button>}</div>}
