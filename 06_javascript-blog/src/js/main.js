const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagSelector = '.post-tags .list';
const optTagsListSelector = '.tags.list';
const optAuthorSelector = '.post-author';
const optAuthorsListSelector = '.authors.list';
const optCloudClassCount = 5;
const optTagCloudClassPrefix = 'tag-size-';
const optAuthorCloudClassPrefix = 'author-size-';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = ''; // Remove contents of titlelist
  const articles = document.querySelectorAll(optArticleSelector + customSelector); // Find all the articles and save them to variable: articles
  let html = '';
  articles.forEach((article) => {
    const articleId = article.getAttribute('id'); // Get the article id
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; // Find the title element and get the title from it
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`; // Create HTML of the link
    html += linkHTML; // Insert link into titleList
  });
  titleList.innerHTML = html;
}

generateTitleLinks();

function titleClickHandler(e) {
  e.preventDefault();
  const activeLinks = document.querySelectorAll('titles a.active');
  activeLinks.forEach(activeLink => activeLink.classList.remove('active')); // remove class 'active' from all article links
  this.classList.add('active'); // add class 'active' to the clicked link
  const activeArticles = document.querySelectorAll('.post');
  activeArticles.forEach(activeArticle => activeArticle.classList.remove('active')); // remove class 'active' from all articles
  const articleSelector = this.getAttribute('href'); // get 'href' attribute from the clicked link
  const targetArticle = document.querySelector(articleSelector); // find the correct article using the selector (value of 'href' attribute)
  targetArticle.classList.add('active'); // add class 'active' to the correct article
}

const links = document.querySelectorAll('.titles a');

links.forEach(link => link.addEventListener('click', titleClickHandler));

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    params.max = tags[tag] >= params.max ? tags[tag] : params.max;
    params.min = tags[tag] < params.min ? tags[tag] : params.min;
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min + 1)) * optCloudClassCount + 1);
  return optTagCloudClassPrefix + classNumber;
}

function generateTags() {
  const allTags = {}; // create a new variable allTags with an empty object
  const articles = document.querySelectorAll(optArticleSelector); // find all articles

  articles.forEach((article) => { // START LOOP: for every article
    const tagsWrapper = article.querySelector(optArticleTagSelector); // find tags wrapper
    let html = ''; // make html variable with empty string
    const articleTags = article.getAttribute('data-tags'); // get tags from data-tags attribute
    const articleTagsArray = articleTags.split(' '); // split tags into array

    articleTagsArray.forEach((tag) => { // START LOOP: for each tag
      const linkHTML = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`; // generate HTML of the link
      html += linkHTML; // add generated code to html variable
      if (!allTags.hasOwnProperty(tag)) { // check if this link is NOT already in allTags
        allTags[tag] = 1; // add tag to allTags object
      } else {
        allTags[tag] += 1;
      }
      tagsWrapper.innerHTML = html; // insert HTML of all the links into the tags wrapper
    }); // END LOOP: for every tag

    const tagsList = document.querySelector(optTagsListSelector); // find list of tags in right column
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = ''; // create variablefor all links HTML code

    for (const tag in allTags) { // START LOOP: for each tag in allTags
      if (allTags.hasOwnProperty(tag)) {
        const tagLinkHTML = `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}"><span>${tag}</span></a></li>`; // generate code of a link and add it to allTagsHTML
        allTagsHTML += tagLinkHTML;
      }
    }
    tagsList.innerHTML = allTagsHTML; // add html from allTagsHTML to tagList
  });
}

generateTags();

function calculateAuthorsParams(names) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let name in names) {
    params.max = names[name] >= params.max ? names[name] : params.max;
    params.min = names[name] < params.min ? names[name] : params.min;
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const classNumber = Math.floor(((count - params.min) / (params.max - params.min + 1)) * optCloudClassCount + 1);
  return optAuthorCloudClassPrefix + classNumber;
}

function generateAuthors() {
  const allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  articles.forEach((article) => {
    const articleAuthor = article.querySelector(optAuthorSelector);
    let html = '';
    const authorsName = article.getAttribute('data-author');
    const authorsNameArray = authorsName.split(' ');

    authorsNameArray.forEach(name => {
      const linkHTML = `<li><a href="#tag-${name}"><span>${name.replace('-', ' ')}</span></a></li>`;
      html += linkHTML;
      if (!allAuthors.hasOwnProperty(name)) {
        allAuthors[name] = 1;
      } else {
        allAuthors[name] += 1;
      }
      articleAuthor.innerHTML = html;
    });

    const authorsList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);

    let allAuthorsHTML = '';
    for (const name in allAuthors) {
      if (allAuthors.hasOwnProperty(name)) {
        const authorLinkHTML = `<li><a class="${calculateAuthorClass(allAuthors[name], authorsParams)}" href="#tag-${name}"><span>${name.replace('-', ' ')}</span></a></li>`;
        allAuthorsHTML += authorLinkHTML;
      }
    }
    authorsList.innerHTML = allAuthorsHTML;
  });
}

generateAuthors();

function tagClickHandler(e) {
  e.preventDefault(); // prevent default action for this event
  const tag = this.getAttribute('href').replace('#tag-', ''); // new constant "tag" to read the attribute "href" from the clicked element and extract tag
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); // find all tag links with class active
  activeTagLinks.forEach(activeTag => activeTag.classList.remove('active')); // for each active tag link remove class active
  const tagLinks = document.querySelectorAll(`a[href="#tag-${this}"]`); // find all tag links with "href" attribute equal to the "href" constant
  tagLinks.forEach(tagLink => tagLink.classList.add('active')); // for each found tag link add class active
  generateTitleLinks(`[data-tags~="${tag}"]`); // execute function "generateTitleLinks" with article selector as argument
  const filteredTitles = document.querySelectorAll('.titles a'); // get article titles from filtered list and add listeners
  filteredTitles.forEach(title => title.addEventListener('click', titleClickHandler));
}

function addClickListenersToTags() {
  const linksToTags = document.querySelectorAll('.tags a'); // find all links to tags and add event listeners
  const linksToPostTags = document.querySelectorAll('.post-tags .list a');
  linksToTags.forEach(linkToTags => linkToTags.addEventListener('click', tagClickHandler));
  linksToPostTags.forEach(linkToPostTags => linkToPostTags.addEventListener('click', tagClickHandler));
}
addClickListenersToTags();

function authorClickHandler(e) {

  e.preventDefault(); // prevent default action for this event
  const author = this.getAttribute('href').replace('#tag-', ''); // new constant "author" to read the attribute "href" from the clicked element and extract tag
  const activeAuthorLinks = document.querySelectorAll('a.active[href="#tag-"]'); // find all author links with class active
  activeAuthorLinks.forEach(activeAuthor => activeAuthor.classList.remove('active')); // for each active tag link remove class active
  const authorLinks = document.querySelectorAll(`a[data-author="${author}"]`); // find all author links with "href" attribute equal to the "href" constant
  authorLinks.forEach(authorLink => authorLink.classList.add('active')); // for each found author link add class active
  generateTitleLinks(`[data-author="${author}"]`); // execute function "generateTitleLinks" with article selector as argument
  const filteredTitles = document.querySelectorAll('.titles a'); // get article titles from filtered list and add listeners
  filteredTitles.forEach(title => title.addEventListener('click', titleClickHandler));
}

function addClickListenersToAuthors() {
  const linksToAuthors = document.querySelectorAll('.authors a'); // find all links to authors and add event listeners
  const linksToPostAuthors = document.querySelectorAll('.post-author a');
  linksToAuthors.forEach(linkToAuthor => linkToAuthor.addEventListener('click', authorClickHandler));
  linksToPostAuthors.forEach(linkToPostAuthor => linkToPostAuthor.addEventListener('click', authorClickHandler));
}

addClickListenersToAuthors();
