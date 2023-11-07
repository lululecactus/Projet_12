// Fonction pour afficher la navigation progressivement en fonction du défilement

const aboutSection = document.querySelector('#about');
const nav = document.querySelector('nav');
let navVisible = false;

function afficherNavigation() {
  const header = document.querySelector('header');
  const position = window.scrollY;
  const navStartAnimationPosition = aboutSection.offsetTop - header.clientHeight / 4;

  if (position >= navStartAnimationPosition) {
    if (!navVisible) {
      nav.style.opacity = '1';
      nav.style.pointerEvents = 'auto';
      navVisible = true;
    }
  } else {
    if (navVisible) {
      nav.style.opacity = '0';
      nav.style.pointerEvents = 'none';
      navVisible = false;
    }
  }

  nav.style.transition = 'opacity 0.3s ease';
}

nav.style.pointerEvents = 'none';

window.addEventListener('scroll', afficherNavigation);


// Récupérer et afficher les données du fichier JSON des compétences


fetch('skills.json')
  .then(response => response.json())
  .then(data => {
    const skillsContainer = document.querySelector('.skillsContainer');

    data.forEach(competence => {
      const skillElement = document.createElement('div');
      skillElement.classList.add('skill');

      const imageElement = document.createElement('img');
      imageElement.src = competence.image;
      imageElement.alt = competence.alt;
      skillElement.appendChild(imageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = competence.nom;
      skillElement.appendChild(descriptionElement);

      skillsContainer.appendChild(skillElement);
    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier JSON des compétences :', error);
  });


  // Récupérer et afficher les données du fichier JSON des projets


  fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const projectsContainer = document.querySelector('.projectsContainer');

    data.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project');
      
      const title = document.createElement('h3');
      title.textContent = project.title;
      projectElement.appendChild(title);

      const openButton = document.createElement('a');
      openButton.textContent = 'Ouvrir le projet';
      openButton.href = project.url;
      openButton.target = '_blank';
      openButton.classList.add('open-button');
      projectElement.appendChild(openButton);
      
      const descriptionSpace = document.createElement('div');
      descriptionSpace.classList.add('projectDescription')
      projectElement.appendChild(descriptionSpace);

      const descriptionTitle = document.createElement('h4');
      descriptionTitle.textContent = project.descriptionTitle;
      descriptionTitle.classList.add('descriptionTitle');
      descriptionSpace.appendChild(descriptionTitle);

      const descriptionTexte = document.createElement('p');
      descriptionTexte.textContent = project.descriptionTexte;
      descriptionSpace.appendChild(descriptionTexte);

      const skillsUsedTitle = document.createElement('h4');
      skillsUsedTitle.textContent = project.skillsUsedTitle;
      skillsUsedTitle.classList.add('skillsUsedTitle');
      descriptionSpace.appendChild(skillsUsedTitle);
      
      const skillsUsed = document.createElement('div');
skillsUsed.classList.add('skillsUsed'); // Ajoutez une classe pour le style CSS
descriptionSpace.appendChild(skillsUsed);

for (const skill in project.skillsUsed) {
  const skillIcon = document.createElement('img');
  skillIcon.src = project.skillsUsed[skill];
  skillsUsed.appendChild(skillIcon);
}

      const cover = document.createElement('img');
      cover.src = project.cover;
      cover.alt = project.alt;
      projectElement.appendChild(cover);
      
      const cardGradient = document.createElement('div');
      cardGradient.classList.add('cardGradient');
      projectElement.appendChild(cardGradient);


      projectsContainer.appendChild(projectElement);


    });
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier JSON des compétences :', error);
  });


// Animation skill

const skillsContainer = document.querySelector('.skillsContainer')

window.addEventListener('scroll', () => {
  const {scrollTop, clientHeight} = document.documentElement;

  const topProjectToTopViewport = skillsContainer.
  getBoundingClientRect().top;

  if (scrollTop > (scrollTop + topProjectToTopViewport).toFixed() -
  clientHeight * 0.80 ) {
    skillsContainer.classList.add('activeSkills')
  }
})


  // Animation projets 

  const projectsContainer = document.querySelector('.projectsContainer')

  window.addEventListener('scroll', () => {
    const {scrollTop, clientHeight} = document.documentElement;

    const topProjectToTopViewport = projectsContainer.
    getBoundingClientRect().top;

    if (scrollTop > (scrollTop + topProjectToTopViewport).toFixed() -
    clientHeight * 0.80 - 200) {
      projectsContainer.classList.add('activeProjects')
    }
  })

  // Gestion du scroll down avec la flèche

  const arrowDown = document.getElementById('arrowDown').addEventListener("click", scrollDown);
  console.log(aboutSection)

  function scrollDown() {
    const aboutSectionRect = aboutSection.getBoundingClientRect();
    const offset = aboutSectionRect.top - 80;
    
    window.scrollTo({
        top: window.scrollY + offset,
        behavior: 'smooth'
    });
  }


  const navLinks = document.querySelectorAll('nav ul li a');

// Gestion du scroll en appuyant sur les boutons de navigation


navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});

function scrollToSection(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    const targetSectionRect = targetSection.getBoundingClientRect();
    const offset = targetSectionRect.top - 50;

    if (targetSection) {
        scrollTo({
          top: window.scrollY + offset,
          behavior: 'smooth'
        })
    }
}