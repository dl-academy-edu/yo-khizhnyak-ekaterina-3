// ПРЕЛОАДЕР, ЗАГРУЗКА И ОТРИСОВКА ТЕГОВ И ПОСТОВ 

const BASE_SERVER_PATH = 'https://academy.directlinedev.com';
const loader = document.querySelector('.loader_js');

let loaderCount = 0;

const showLoader = () => {
  loaderCount++;
  loader.classList.remove('hidden');
}

const hideLoader = () => {
  loaderCount--;
  if(loaderCount <=0) {
    loader.classList.add('hidden');
    loaderCount = 0;
  }
}

(function() {
    const form = document.forms.filterForm;
    const resetBtn = form.querySelector('.filter__reset-btn_js');
    const backBtn = document.querySelector('.blog__button-back_js');
    const nextBtn = document.querySelector('.blog__button-next_js');
    const defaultLimit = 5; 

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = {
          page:0,
        };

        data.name = form.elements.name.value;

        data.tags = [...form.elements.tags]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

        data.comments = [...form.elements.comments]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

        data.sort = ([...form.elements.sort]
        .find(radio => radio.checked) || {value: null}).value;

        data.show = ([...form.elements.show]
        .find(radio => radio.checked) || {value: null}).value;

        data.views = ([...form.elements.views]
        .find(radio => radio.checked) || {value: null}).value;

        console.log(data);
        
        getData(data);    // формирует посты по данным с сервера
        setSearchParams(data);      // устанавливает параметры фильтра в адресной строке
    })

    let xhr = new XMLHttpRequest();
    xhr.open('GET', BASE_SERVER_PATH + '/api/tags');
    xhr.send();
    showLoader();
    xhr.onload = () => {
        const tags = JSON.parse(xhr.response).data; 
        renderCheckbox(tags);       
        const params = getParamsFromLocation();
        setDataToFilter(params);
        getData(params);

        hideLoader();
    }

resetBtn.addEventListener('click', () => {
  if(location.search.length) {
    history.replaceState(null, null, window.location.pathname);
  };
});

backBtn.addEventListener('click', () => {
  setActivePage(getParamsFromLocation().page - 1);
})

nextBtn.addEventListener('click', () => {
  setActivePage(getParamsFromLocation().page + 1);
})

const createCheckbox = (check) => {
  return `
  <label class="checkbox">
      <input class="checkbox__input" id="${check.id}" type="checkbox" name="tags" value="${check.id}">
      <span class="checkbox__mark" style="border-color: ${check.color}"></span>
  </label>
  `
}

// Данная функция нужна для того, чтобы перебрать полученные от сервера результаты и отрисовать каждый чекбокс.
const renderCheckbox = (data) => {
  for (let check of data) {
      document.querySelector('.filter__tags-inner_js').insertAdjacentHTML('beforeend', createCheckbox(check));
  }
}

function getParamsFromLocation() {   //  возвращает текущие данные фильтра
  let searchParams = new URLSearchParams(location.search);
  return {
    name: searchParams.get('name') || '',
    tags: searchParams.getAll('tags'),
    views: searchParams.get('views'),
    comments: searchParams.getAll('comments'),
    show: searchParams.get('show'),
    sort: searchParams.get('sort'),
    page: +searchParams.get('page') || 0,
  }
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  searchParams.set('name', data.name);
  data.tags.forEach(tag => {
    searchParams.append('tags', tag);
  });
  if(data.page) {
    searchParams.append('page', data.page);
  } else {
    searchParams.set('page', 0);
  }
  if(data.sort) {
    searchParams.set('sort', data.sort);
  }
  if(data.views) {
    searchParams.set('views', data.views);
  }
  if(data.comments) {
      data.comments.forEach(comment => {
          searchParams.append('comments', comment);
      });
  }
  if(data.show) {
      searchParams.set('show', data.show);
  } 

  history.replaceState(null, document.title, '?' + searchParams.toString());
}

function getData(params) {
  const result = document.querySelector('.result_js');

  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set('v', '1.0.0');

  if(params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set('tags', JSON.stringify(params.tags));
  };

  let filter = {};

  if(params.name) {
    filter.title = params.name;
  }

  if(params.views) {
    const choisedCountOfViews = (params.views).split('-');
    filter.views = {"$between": choisedCountOfViews};
  }

  if(params.comments.length) {
    const array = (params.comments).join('-').split('-');
    let choisedCountOfComments = [array[0], array[array.length-1]];
    filter.commentsCount = {"$between": choisedCountOfComments};
  }

  searchParams.set('filter', JSON.stringify(filter));

  let LIMIT = defaultLimit;
  if(+params.show) {
    LIMIT = +params.show;
    console.log(+params.show);
  }
  searchParams.set('limit', LIMIT);

  if(+params.page) {
    searchParams.set('offset', (+params.page) * LIMIT);
  }

  if(params.sort) {
    searchParams.set('sorts', JSON.stringify([params.sort, 'DESC']));
  }

  xhr.open('GET', BASE_SERVER_PATH + '/api/posts?' + searchParams.toString());
  xhr.send();
  showLoader();
  result.innerHTML = '';
  const links = document.querySelector('.pagination_js');
  links.innerHTML = '';
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    let dataPosts = '' ;
    response.data.forEach(post => {
      dataPosts  += cardCreate({
        title: post.title,
        text: post.text,
        comments: post.commentsCount,
        date: post.date,  // вызвать функцию, в нее передать post.date
        views: post.views, 
        photo: post.photo, 
        tags: post.tags
      });
    })
    result.innerHTML = dataPosts;

    const pageCount = Math.ceil(response.count / LIMIT);
    for(let i = 0; i < pageCount; i++) {
      const link = linkElementCreate(i);
      links.insertAdjacentElement('beforeend', link);
    }

    backBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');

    let currentParams = getParamsFromLocation();
    if(currentParams.page === 0 || pageCount === 0) {
      backBtn.setAttribute('disabled', 'disabled');
    };
    
    if(pageCount === 0 || currentParams.page === (pageCount - 1)) {
      nextBtn.setAttribute('disabled', 'disabled');
    }

    hideLoader();
  }
}

function linkElementCreate(page) {
  const link = document.createElement('a');
  link.href = '?page=' + page;
  link.innerText = `${page + 1}`;
  link.classList.add('link_js');
  link.classList.add('blog__pagination-link');

  let params = getParamsFromLocation();
  if (page === +params.page) {
    link.classList.add('pagination-link_active');
  }

  link.addEventListener('click', (e) => {
    e.preventDefault();
    setActivePage(page);
  });

  return link;
}

function setActivePage(page) {
  const links = document.querySelectorAll('.link_js');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();

    links[params.page].classList.remove('pagination-link_active');
    searchParams.set('page', page);
    links[page].classList.add('pagination-link_active');

    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFromLocation());
}

function cardCreate({title, text, comments, date, views, photo, tags}) {
  return `
  <div class="blog">
    <picture class="blog__img">
      <source class="blog__img" srcset="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}, ${BASE_SERVER_PATH}${photo.desktop2xPhotoUrl} 2x" media="(max-width: 1440px)">
      <source class="blog__img" srcset="${BASE_SERVER_PATH}${photo.tabletPhotoUrl}, ${BASE_SERVER_PATH}${photo.tablet2xPhotoUrl} 2x" media="(max-width: 768px)">
      <source class="blog__img" srcset="${BASE_SERVER_PATH}${photo.mobilePhotoUrl}, ${BASE_SERVER_PATH}${photo.mobile2xPhotoUrl} 2x" media="(max-width: 320px)">
      <img class="blog__img" src="${BASE_SERVER_PATH}${photo.desktopPhotoUrl}" alt="${title}">
    </picture>  
    <div class="blog__wrapper">
      <div class="blog__tags">
          ${tags.map(tag => `<span class="blog__tag" style="background-color: ${tag.color}"></span>`).join('')}
      </div>
      <div class="blog__inner">
        <p class="blog__date">${date}</p>
        <p class="blog__views">${views} views</p>
        <p class="blog__comments">${comments} comments</p>
      </div>
      <h2 class="blog__title">${title}</h2>
      <p class="blog__text">${text}</p>
      <a class="blog__link" href="#">Go to this post</a>
    </div>
  </div>`
}

function setDataToFilter(data) {
  const form = document.forms.filterForm;
  form.elements.name.value = data.name;

  form.elements.tags.forEach(checkbox => {
    checkbox.checked = data.tags.includes(checkbox.value);
  });
  form.elements.sort.forEach(radio => {
      radio.checked = data.sort === radio.value;
  });
  form.elements.views.forEach(views => {
      views.checked = data.views === views.value;
  });
  form.elements.comments.forEach(checkbox => {
      checkbox.checked = data.comments.includes(checkbox.value);
  });
  form.elements.show.forEach(item => {
      item.checked = data.show === item.value;
  });
}
})();