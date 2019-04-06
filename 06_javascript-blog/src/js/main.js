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
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
// const optAuthorSelector = '.post-author';
// const optAuthorsListSelector = '.authors.list';

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
  const allAuthors = [];
  const articles = document.querySelectorAll('.post');
  articles.forEach((article) => {
    const articleAuthor = article.querySelector('.post-author');
    const authorTag = article.getAttribute('data-author');
    const linkHTML = `<li><a href="#tag-${authorTag}"><span>${authorTag}</span></a></li>`;
    articleAuthor.innerHTML = linkHTML;
    if (allAuthors.indexOf(linkHTML) === -1) {
      allAuthors.push(linkHTML);
    }
    const authorsList = document.querySelector('.authors.list');
    authorsList.innerHTML = allAuthors.join(' ');
  });
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
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksToTags = document.querySelectorAll(`.tags a`);
  /* for each link add tagClickHandler as event listener for that link */
  linksToTags.forEach(linkToTags => linkToTags.addEventListener('click', tagClickHandler));
}
addClickListenersToTags();
