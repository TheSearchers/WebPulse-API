'use strict';
const allactions=require("../postmanClone/script");
let tableContainer=document.getElementById("cont");
for(let i=0;i<allactions.length;i++){
  let headerAction=document.createElement("h4");
  headerAction.textContent=` DATE : ${allactions[i].date} URL : ${allactions[i].urls}  METHOD : ${allactions[i].method} `
  div3.appendChild(headerAction);
}