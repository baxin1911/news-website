import { createTribute } from "./baseTribute.js";

export const initFormCommentTribute = ({ 

    element, 
    containerClass = 'mention-tribute',
    selectTemplate, 
    searchFn 

}) => createTribute(

    element, 
    containerClass,
    selectTemplate, 
    searchFn

);