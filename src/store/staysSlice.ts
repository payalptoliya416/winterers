import {createSlice,createSelector} from '@reduxjs/toolkit';import type {PayloadAction} from '@reduxjs/toolkit';
import {stays} from '../data';import type {Stay} from '../types';
export type Sort='top'|'low'|'high';
interface StaysState{items:Stay[];sort:Sort;saved:number[]}
const initialState:StaysState={items:stays,sort:'top',saved:[]};
const s=createSlice({name:'stays',initialState,reducers:{
setSort:(st,{payload}:PayloadAction<Sort>)=>{st.sort=payload},
toggleSave:(st,{payload}:PayloadAction<number>)=>{st.saved=st.saved.includes(payload)?st.saved.filter(i=>i!==payload):[...st.saved,payload]}}});
export const {setSort,toggleSave}=s.actions;
type Root={stays:StaysState};
export const selectSorted=createSelector([(st:Root)=>st.stays.items,(st:Root)=>st.stays.sort],(i,so)=>[...i].sort((a,b)=>so==='low'?a.price-b.price:so==='high'?b.price-a.price:b.rating-a.rating));
export default s.reducer;
