import {createSlice} from '@reduxjs/toolkit';import type {PayloadAction} from '@reduxjs/toolkit';
export interface SearchState{where:string;checkIn:string;checkOut:string;guests:string}
const init:SearchState={where:'',checkIn:'',checkOut:'',guests:''};
const s=createSlice({name:'search',initialState:init,reducers:{
setField:(st,{payload}:PayloadAction<{name:keyof SearchState;value:string}>)=>{st[payload.name]=payload.value},reset:()=>init}});
export const {setField,reset}=s.actions;export default s.reducer;
