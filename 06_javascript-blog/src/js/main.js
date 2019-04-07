const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
const optAuthorSelector = '.post-author';
const optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  /* Remove contents of titlelist */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* Find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  /* For each article */
  articles.forEach((article) => {
    /* Get the article id */
    const articleId = article.getAttribute('id');
    /* Find the title element and get the title from it */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* Create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    /* Insert link into titleList */
    html += linkHTML;
  });
  titleList.innerHTML = html;
}

generateTitleLinks();

function titleClickHandler(e) {
  e.preventDefault();
  const activeLinks = document.querySelectorAll('titles a.active');
  /* remove class 'active' from all article links  */
  activeLinks.forEach(activeLink => activeLink.classList.remove('active'));
  /* add class 'active' to the clicked link */
  this.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  activeArticles.forEach(activeArticle => activeArticle.classList.remove('active'));
  /* get 'href' attribute from the clicked link */
  const articleSelector = this.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

links.forEach(link => link.addEventListener('click', titleClickHandler));

function generateTags() {
  /* create a new variable allTags with an empty array */
  const allTags = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  articles.forEach((article) => {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    articleTagsArray.forEach((tag) => {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
      /* add generated code to html variable */
      html += linkHTML;
      /* check if this link is NOT already in allTags */
      if (allTags.indexOf(linkHTML) === -1) {
        /* add generated code to allTags array */
        allTags.push(linkHTML);
      }
      /* END LOOP: for each tag */
    });
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  });
  /* find list of tags in right column */
  const tagsList = document.querySelector(optTagsListSelector);
  /* add html from allTags to tagList */
  tagsList.innerHTML = allTags.join(' ');
}

generateTags();

function generateAuthors() {
  /* create a new variable allAuthors with an empty array */
  const allAuthors = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  articles.forEach((article) => {
    /* find Author wrapper */
    const articleAuthor = article.querySelector(optAuthorSelector);
    /* get author name from data-author attribute */
    const authorName = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = `<li><a href="#tag-${authorName}"><span>${authorName}</span></a></li>`;
    /* check if this link is NOT already in allTags */
    if (allAuthors.indexOf(linkHTML) === -1) {
      /* add generated code to allTags array */
      allAuthors.push(linkHTML);
    }
    /* insert HTML of all the links into the tags wrapper */
    articleAuthor.innerHTML = linkHTML;
  });
  /* END LOOP: for every article: */
  /* find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);
  /* add html from allAuthors to authorsList */
  authorsList.innerHTML = allAuthors.join(' ');
}

generateAuthors();

function tagClickHandler(e) {
  /* prevent default action for this event */
  e.preventDefault();
  /* new constant "tag" to read the attribute "href" from the clicked element and extract tag */
  const tag = this.getAttribute('href').replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* for each active tag link remove class active */
  activeTagLinks.forEach(activeTag => activeTag.classList.remove('active'));
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="#tag-${this}"]`);
  /* for each found tag link add class active */
  tagLinks.forEach(tagLink => tagLink.classList.add('active'));
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
  /* get article titles from filtered list and add listeners */
  const filteredTitles = document.querySelectorAll('.titles a');
  filteredTitles.forEach(title => title.addEventListener('click', titleClickHandler));
}

function addClickListenersToTags() {
  /* find all links to tags and add event listeners */
  const linksToTags = document.querySelectorAll('.tags a');
  const linksToPostTags = document.querySelectorAll('.post-tags .list a');
  linksToTags.forEach(linkToTags => linkToTags.addEventListener('click', tagClickHandler));
  linksToPostTags.forEach(linkToPostTags => linkToPostTags.addEventListener('click', tagClickHandler));
}
addClickListenersToTags();

function authorClickHandler(e) {
  /* prevent default action for this event */
  e.preventDefault();
  /* new constant "author" to read the attribute "href" from the clicked element and extract tag */
  const author = this.getAttribute('href').replace('#tag-', '');
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href="#tag-"]');
  /* for each active tag link remove class active */
  activeAuthorLinks.forEach(activeAuthor => activeAuthor.classList.remove('active'));
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[data-author="${this}"]`);
  /* for each found author link add class active */
  authorLinks.forEach(authorLink => authorLink.classList.add('active'));
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-author="${author}"]`);
  /* get article titles from filtered list and add listeners */
  const filteredTitles = document.querySelectorAll('.titles a');
  filteredTitles.forEach(title => title.addEventListener('click', titleClickHandler));
}

function addClickListenersToAuthors() {
  /* find all links to authors and add event listeners */
  const linksToAuthors = document.querySelectorAll('.authors a');
  const linksToPostAuthors = document.querySelectorAll('.post-author a');
  linksToAuthors.forEach(linkToAuthor => linkToAuthor.addEventListener('click', authorClickHandler));
  linksToPostAuthors.forEach(linkToPostAuthor => linkToPostAuthor.addEventListener('click', authorClickHandler));
}
addClickListenersToAuthors();
