import type {ReactNode} from 'react';
export default function Container({className='',children}:{className?:string;children:ReactNode}){return <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 ${className}`}>{children}</div>}
