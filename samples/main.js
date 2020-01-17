/*
<template id="articleTemplate">
    <article>
      <h1></h1>
      <p>Written by <span class="author"></span></p>
      <div class="lead"></div>
    </article>
  </template>

*/

const header = document.querySelector("header h1");
const template = document.querySelector("template").content;
const insertionPoint = document.querySelector("main");
window.addEventListener("load", ()=>{
  fetch("mydata.json").then(res=>res.json()).then(showArticles)
})

function showArticles(data){
  console.log(data)
  header.textContent = data.name;
  data.articles.forEach(showSingleLeadArticle)
}

function showSingleLeadArticle(article){
  console.log(article)
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent=article.title;
  clone.querySelector(".author").textContent=article.author;
  clone.querySelector(".lead").innerHTML= article.leadText;
  insertionPoint.appendChild(clone)
}










