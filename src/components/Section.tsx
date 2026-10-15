import type {ReactNode} from 'react';
import Container from './Container';
const bg:Record<string,string>={light:'bg-white',dark:'bg-navy text-white',mist:'bg-mist'};
export default function Section({tone='light',className='',children}:{tone?:'light'|'dark'|'mist';className?:string;children:ReactNode}){return <section className={`${bg[tone]} py-12 md:py-16 ${className}`}><Container>{children}</Container></section>}
