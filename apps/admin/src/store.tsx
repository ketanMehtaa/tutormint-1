"use client"; // This is a client component 

import { atom, RecoilState } from 'recoil';

export const logIn:any = atom({
    key: 'logIn',
    default: false,
})

export const loading: RecoilState<boolean> = atom({
    key: 'load',
    default: true,
});
