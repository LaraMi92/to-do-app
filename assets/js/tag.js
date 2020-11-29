const tagModule = {

    base_url : null,
    
    setBaseUrl: url => tagModule.base_url = url,

    makeTagInDOM: function(tag){

        console.log('makeTagInDOM', tag.title, tag.card_id);
		//on récupère le template
		const template = document.getElementById('tagTemplate');
		//on le clone
		const node = document.importNode(template.content, true);
		//on le configure avec les data qui vont bien
		node.querySelector('.column').textContent = tag.title;

        //ajout couleur
        node.querySelector('.box').style.backgroundColor = `${tag.color}`;
		//recup le btn modifier(stylo)
		const pen = node.querySelector('.fa-pencil-alt');
		const modifyLink = pen.closest('a');

		//event pour modifier
		modifyLink.addEventListener('click', tagModule.showTagNameForm);

		//recup btn poubelle
		const trash = node.querySelector('.fa-trash-alt');
		const deleteLink = trash.closest('a');

		//event pour delete card
        deleteLink.addEventListener('click', tagModule.deleteOneTag);
        

		//cibler la div contenant l'attribut card-id
		const tagDiv = node.querySelector('.is-narrow');
		//màj de l'attribut
		tagDiv.setAttribute('tag-id', tag.id);

		//ajout de gestion du submit event
        tagDiv.querySelector('form').addEventListener('submit', tagModule.handleTagNameForm);
        

		//on l'ajoute au DOM
        const tagsColumns = document.querySelector(`.--add-tag`);
        tagsColumns.appendChild(node);
        
    },
    
    showTagNameForm: function(event) {

       	const div = event.target.closest('.box').querySelector('.column');
       	div.classList.add('is-hidden');

       	const form = event.target.closest('.box').querySelector('form');
		form.querySelector('input[name="title"]').value = div.textContent;
		form.classList.remove('is-hidden');

    },

    handleTagNameForm: async function(event) {

        event.preventDefault();
        console.log(event.target);
		const formData = new FormData(event.target);
		const titleDiv = event.target.closest('.box').querySelector('.column');
		const tagId = event.target.closest('.box').getAttribute('tag-id');

			try {
				const result = await fetch(`${tagModule.base_url}/tag/${tagId}`, {
				method: 'PATCH',
				body: formData
            	});
            	

				const json = await result.json();

				if(result.status == 200){

					titleDiv.textContent = json.title;

				} else {

					throw json
				}

				} 
			catch(error) {
			
				console.error(error);
			}

		//masquer le form
		event.target.classList.add('is-hidden');
		//réafficher titre
		titleDiv.classList.remove('is-hidden');
    },

    deleteOneTag: async function(event) {

        event.preventDefault();
		//sélectionner l'id du tag
		const tagId = event.target.closest('.box').getAttribute('tag-id');
		//selectionner son contenu
		const tag = event.target.closest('.box');
		console.log(tagId, tag);

		try{
			const result = await fetch(`${tagModule.base_url}/tag/${tagId}`, {
				method: 'DELETE',
				body: tag
			});



			if(result.ok){

				tag.remove() ;

			} else {

				throw json
			}


		} catch(error) {
			console.error(error);
		}


    },
}