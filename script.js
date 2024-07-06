// pour s'assurer que le DOM est prêt avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {

  //Récupérer tous les element qu'on a besoin de html
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const subBtn = document.getElementById('sub-btn');
  const AbonnerList = document.getElementById('abonner-list');
  const formuliareAbonner = document.getElementById('sub-form'); 

  let nextTaskId = 1; //pour l'utiliser comme id unique car on va l'incrémenter de 1 à chaque fois
  let nextSubId = 1; //meme chose pour cela on va l'utiliser pour l'id
  let tasks = []; //liste pour sauvegarder toutes les taches
  let subscribers = []; //liste pour sauvegarder tous les utilisateurs
  subBtn.addEventListener('click', function() {
    //on récupere le boutton s'abonner quand on clique  sur lui on change le style de formulaire de none à block pour l'afficher 
    formuliareAbonner .style.display = 'block';
  });

  //on récupere le button s'abonner qui est dans le formulaire 
  document.getElementById('submit-button').addEventListener('click', function() {
    //quand on clique sur le boutton on récupere les valeurs de input de nomutilisateur et l'address email
    const nomutilisateur = document.getElementById('nomutilisateur').value;
    const address = document.getElementById('address').value;
    
    //on va créer un objet subscriber qui a an id unique et nomutilisateur et l'address de l'utilisateur
    const subscriber = {
      id: nextSubId++,
      nomutilisateur: nomutilisateur,
      address: address
    };

    subscribers.push(subscriber);//on va ajouter l'objet à la liste subscribers quand avait déja créer 

    nomutilisateur.value = '';
    address.value = '';
     

    afficherUtilisateurs();//on fait apple à la fonction afficherUtilisateurs() quand va créer apres 

    
    subscriber.address.value = '';
    //on change le style du formulaire pour le masquer apres avoir cliquer sur le boutton s'abonner
    formuliareAbonner.style.display = 'none';
  });

  //on déclare la fonction afficherUtilisateurs()
  function afficherUtilisateurs() {
    AbonnerList.innerHTML = '';
    
    //on déroule la liste subscribers pour chaque objet on va créer un div qui va avoir deux <p></p> pour le nom de l'utilisateur et l'adresse et un boutton pour supprimer 
    subscribers.forEach(subscriber => {
      const AbonnerItem = document.createElement('div');
      AbonnerItem.classList.add('subscriber-item');
      AbonnerItem.dataset.id = subscriber.id;
       
      //on crée l'element p et on récupaire le nom de l'utilisateur à partir de l'objet subscriber
      const utilisateurNom = document.createElement('p');
      utilisateurNom.textContent = `Nom d'utilisateur: ${subscriber.nomutilisateur}`;

      //on crée l'element p et on récupaire l'address de l'utilisateur à partir de l'objet subscriber
      const addressEmail = document.createElement('p');
      addressEmail.textContent = `Address Email: ${subscriber.address}`;

      //on crée le boutton supprimer
      const supprimerBtn = document.createElement('button');
      supprimerBtn.textContent = 'Supprimer';
      supprimerBtn.classList.add('remove-btn', 'subscriber-remove-btn'); //on rajoute la classe remove-btn pour le css
      supprimerBtn.addEventListener('click', function() {
        supprimerUtilisateur(subscriber.id); //quand on clique sur le boutton supprimer on fait appel à la fonction supprimerUtilisateur() avec le paramatre qui est l'id de l'utilisateur 
      });
      
      //on ajoute les balises p et le boutton qu'on avait créer au div AbonnerItem 
      AbonnerItem.appendChild(utilisateurNom);
      AbonnerItem.appendChild(addressEmail);
      AbonnerItem.appendChild(supprimerBtn);

      //on ajoute le div AbonnerItem au div AbonnerList
      AbonnerList.appendChild(AbonnerItem);
    });
  }

  //on déclare la fonction supprimerUtilisateur() avec le parametre id de l'utilisateur
  function supprimerUtilisateur(subscriberId) {
    //on utilise la méthode prédéfinie filter() pour suprimmer les utilisateurs séléctionner (la méthode filter va créer un nouveau tableau qui va contenir tous les autres utilisateurs sauf celui qui est séléctionner)
    subscribers = subscribers.filter(subscriber => subscriber.id !== subscriberId);

    //on fait appel à la fonction afficherUtilisateurs()
    afficherUtilisateurs();
  }

  addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value; //quand on clique sur le bouton ajouter on va récuprer la valuer de input 

    if (taskText === '') { //si le input est vide,l'utilisateur n'avait rien entrer on va afficher un message d'erreu avec alert
      alert('Il faut ajouter une tâche.');
      
    }
    else{ //sinon on va créer un objet task qui va avoir un id unique et la tache que l'utilisateur avait entrer
      const task = {
        id: nextTaskId++,
        text: taskText
      }; 
      tasks.push(task);//on ajoute l'objet à la liste tasks qu'on avait deja créer
      actualiser(); //on appel la fonction actualiser()
      taskInput.value = ''; //on va remmetre le input à une chaine vide
    }

  });
  
  //on déclare la fonction actualiser()
  function actualiser() {
    taskList.innerHTML = '';

    tasks.forEach(task => { //on pacoure la liste task et pour chaque objet on va créer un div
      const tacheItem = document.createElement('div');
      tacheItem.classList.add('task-item');
      tacheItem.dataset.id = task.id;

      const tacheText = document.createElement('p'); //céation d'un p qui va contenir la tache ajouté
      tacheText.textContent = task.text;

      const modifierBtn = document.createElement('button'); //création d'un boutton modifier
      modifierBtn.textContent = 'Modifier';
      modifierBtn.classList.add('edit-btn'); //ajoute de la classe pour le css
      modifierBtn.addEventListener('click', function() {
        modifierTache(task.id); //quand on clique sur le boutton on fait apple à la fonction modifierTache()
      });

      const suppBtn = document.createElement('button'); //création d'un boutton supprimer
      suppBtn.textContent = 'Supprimer';
      suppBtn.classList.add('remove-btn'); //ajout de la class pour css
      suppBtn.addEventListener('click', function() {
        supprimerTache(task.id); //on clique sur le bouton on fait un appel pour la fonction supprimerTache()
      });
      
      //on ajoute les elements qu'on avait créer p button au div tacheItem
      tacheItem.appendChild(tacheText);
      tacheItem.appendChild(modifierBtn);
      tacheItem.appendChild(suppBtn);
      taskList.appendChild(tacheItem); //on ajoute le div tacheItem au div taskList
    });
  }
 
  //on déclare la fonction modifierTache()  avec le parametre id de la tache
  function modifierTache(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (!taskToEdit) {
      return;
    }
    const newTaskText = prompt('Entrer une nouvelle tache:', taskToEdit.text);
    if (!newTaskText || newTaskText === '') {
      return;
    }
    taskToEdit.text = newTaskText;
    actualiser();
  }

  //on déclare la fonction supprimerTache()  avec le parametre id de la tache
  function supprimerTache(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    actualiser();
  }

});
