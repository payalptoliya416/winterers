import {Outlet,useLocation} from 'react-router-dom';import {useEffect} from 'react';import Header from './Header';import Footer from './Footer';import Newsletter from './Newsletter';
export default function Layout(){const {pathname}=useLocation();useEffect(()=>window.scrollTo(0,0),[pathname]);
return <><Header/><main><Outlet/></main><Newsletter/><Footer/></>}
