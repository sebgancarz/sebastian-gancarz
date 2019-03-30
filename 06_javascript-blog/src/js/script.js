'use strict';

function titleClickHandler(e) {
  e.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /* Remove contents of titlelist */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* Find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  /* For each article */
  for (let article of articles) {
    /* Get the article id */
    const articleId = article.getAttribute('id');
    /* Find the title element and get the title from it */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* Create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* Insert link into titleList */
    html += linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks()

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}