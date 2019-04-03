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

function generateTitleLinks() {
  /* Remove contents of titlelist */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* Find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
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
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  articles.forEach((article) => {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    articleTagsArray.forEach((tag) => {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag} "><span>${tag}</span></a></li>`;
      /* add generated code to html variable */
      html += linkHTML;
      /* END LOOP: for each tag */
    });
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
    /* END LOOP: for every article: */
  });
}

generateTags();
