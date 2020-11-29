//card object

const cardModule = {

    base_url : null,
    
    setBaseUrl: url => cardModule.base_url = url,


    showAddCardModal: function(event) {
		
		event.preventDefault();

		const listId = event.target.closest('.panel').getAttribute('list_id');

		const modal = document.getElementById('addCardModal');
		modal.classList.add('is-active');
		modal.querySelector('#list_id').value = listId;
		
    },
    
	/**CREATE */

	//Post new card to DB
    handleAddCardForm: async function(event) {

		try {
		
		event.preventDefault();
		
		const formData = new FormData(event.target);
		
		
		const sendCard = await fetch(cardModule.base_url+"/card", {
			method: "POST",
			body: formData
		});

		const sentCard = await sendCard.json();
		

			if(sendCard.status == 200){
			
					cardModule.makeCardInDOM(sentCard);

			} else {

				throw sentCard
			}

		} catch (error){
			
			alert(error);
		}

    },
	
	//create new card in DOM
    makeCardInDOM: function(card) {
		
		const template = document.getElementById('cardTemplate');
		const node = document.importNode(template.content, true);

		node.querySelector('.column').textContent = card.title;

		//events to update/delete a card
		const pen = node.querySelector('.fa-pencil-alt');
		const modifyLink = pen.closest('a');
		
		modifyLink.addEventListener('click', cardModule.showCardNameForm);
		
		const trash = node.querySelector('.fa-trash-alt');
		const deleteLink = trash.closest('a');

		deleteLink.addEventListener('click', cardModule.deleteOneCard);

		
		const cardiv = node.querySelector('.box');
		cardiv.setAttribute('card-id', card.id);

		cardiv.querySelector('form').addEventListener('submit', cardModule.handleCardNameForm);

		//appending card in right list
		const rightList = document.querySelector(`[list_id="${card.list_id}"]`);
		const rightContainer = rightList.querySelector('.panel-block');
		rightContainer.appendChild(node);
    },
	
	/**UPDATE */

    showCardNameForm: function(event) {

		const div = event.target.closest('.box').querySelector('.column');
		div.classList.add('is-hidden');

		const form = event.target.closest('.box').querySelector('form');
		form.querySelector('input[name="title"]').value = div.textContent;

		form.classList.remove('is-hidden');
    },
    
    handleCardNameForm: async function(event) {

		event.preventDefault();

		const formData = new FormData(event.target);
		const titleDiv = event.target.closest('.box').querySelector('.column');
		const cardid = event.target.closest('.box').getAttribute('card-id');
		console.log(titleDiv);

			try{

				const result = await fetch(`${cardModule.base_url}/card/${cardid}`, {
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
			
				console.log(error);
			}

		//hide form to show title
		event.target.classList.add('is-hidden');
		titleDiv.classList.remove('is-hidden');
	},
	
	/**DELETE */
    
    deleteOneCard: async function(event) {

		if(!confirm('Delete this card?')){
			return;
		}

		event.preventDefault();
		
		const cardid = event.target.closest('.box').getAttribute('card-id');
		const card = event.target.closest('.box');
	

			try{
				const result = await fetch(`${cardModule.base_url}/card/${cardid}`, {
				method: 'DELETE',
				body: card
				});


				if(result.ok){

					card.remove();

				} else {

				const error = await result.json();
				throw error;
				}


			} 
			catch(error) {
			
				console.error(error);
		}


	},




};