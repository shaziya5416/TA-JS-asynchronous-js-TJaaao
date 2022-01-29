(function(){
    let root = document.querySelector('.root');
let characterRoot = document.querySelector('.character-root');
let close = document.querySelector('.close-btn');

function showCharacterUI(isVisible = false) {
  let characterSection = document.querySelector('.character-sec');
  if (isVisible) {
    characterSection.classList.remove('hide');
  } else {
    characterSection.classList.add('hide');
  }
}

function showSpinner(isLoading = false) {
  let loader = document.querySelector('.loader-div');
  if (isLoading) {
    loader.classList.add('loader');
  } else {
    loader.classList.remove('loader');
  }
}

function handleError(msg = 'Something went wrong ❌') {
  let main = document.querySelector('main');
  main.innerHTML = '';
  let h6 = document.createElement('h6');

  h6.innerText = msg;
  main.append(h6);
}

function createUI(rootEle, data) {
  data.forEach((ele) => {
    let article = document.createElement('article');

    let h2 = document.createElement('h2');
    h2.innerText = ele.name;

    let h3 = document.createElement('h3');
    h3.innerText = ele.authors;

    let a = document.createElement('a');
    a.classList.add('btn');
    a.innerText = `Show Characters (${ele.characters.length})`;
    a.addEventListener('click', () => {
      displayCharacterUI(ele.characters);
    });

    article.append(h2, h3, a);
    rootEle.append(article);
  });
}

function displayCharacterUI(characterData) {
  showCharacterUI(true);
  showSpinner(true);
  characterRoot.innerHTML = '';
  Promise.all(
    characterData.map((character) => fetch(character).then((res) => res.json()))
  )
    .then((charactersData) => {
      charactersData.forEach((character) => {
        let p = document.createElement('p');
        p.innerText = `${character.name} (${character.aliases})`;
        characterRoot.append(p);
      });
    })
    .catch(handleError)
    .finally(showSpinner);
}

close.addEventListener('click', () => {
  showCharacterUI();
});

function init() {
  showSpinner(true);
  fetch('https://www.anapioficeandfire.com/api/books')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`reponse is not ok ❌`);
      }
      return res.json();
    })
    .then((d) => {
      if (Array.isArray(d)) {
        return createUI(root, d);
      }
    })
    .catch(handleError)
    .finally(showSpinner);
}

if (!navigator.onLine) {
  handleError('Check your internet connection ❌');
}
showCharacterUI();

init();

}
)()