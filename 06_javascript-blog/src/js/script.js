'use strict';

const links = document.querySelectorAll('.titles a');

function titleClickHandler(e) {

  /* remove class 'active' from all article links  */

  /* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */

  console.log(e);
}

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}