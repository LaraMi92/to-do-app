// main object to initialise app

var app = {

	//link to API
	base_url: "http://localhost:3000",


	init: async function () {
		console.log('app.init !');

		//initialisation of modules
		listModule.setBaseUrl(app.base_url);
		cardModule.setBaseUrl(app.base_url);
		tagModule.setBaseUrl(app.base_url);

		//fetch existing data
		await app.getListsFromAPI();
		
		//launch events
		app.addListenerToActions();

		
	},

	addListenerToActions: function () {
		
		//button to the add list modal
		document.getElementById('addListButton').addEventListener('click', listModule.showAddListModal);

		
		//button to delete a list
		const removeBtns = document.querySelectorAll('.button--remove-list');
		for(const removeBtn of removeBtns){
		removeBtn.addEventListener('click', listModule.showRemoveListConfirmation)
		};

		// close-button events to hide modals
		const closeButtons = document.getElementsByClassName('close');
		for (const button of closeButtons) {
			button.addEventListener('click', app.hideModals);
		}

		//form in addListModal
		const form = document.querySelector('#addListModal form');
		form.addEventListener('submit', app.handleAddListForm);

		//form in addCardModal
		const cardForm = document.querySelector('#addCardModal form');
		cardForm.addEventListener('submit', app.handleAddCardForm);

		//add a card buttons
		const addCardButtons = document.querySelectorAll('.button--add-card');
		for (const button of addCardButtons) {
			button.addEventListener('click', cardModule.showAddCardModal);
		};


		//draggable using sortableJS
		let draggedLists = document.querySelectorAll('.card-lists');
		for(const draggedList of draggedLists){
			new Sortable(draggedList, {
				handle: '.column.is-one-quarter.panel',
				animation: 200
			});
		}

		

	},

	hideModals: function () {
		
		const modals = document.querySelectorAll('.modal');
		for (const modal of modals) {
			modal.classList.remove('is-active');
		}
	},



	handleAddListForm: async function(event) {
		event.preventDefault();
		listModule.handleAddListForm(event);
		app.hideModals();
	},

	handleAddCardForm: async function(event) {
		event.preventDefault();
		cardModule.handleAddCardForm(event);
		app.hideModals();
	},


	

	
	getListsFromAPI: async function(){
		try{

			const getLists = await fetch(app.base_url+"/list");
			let jsonLists =	await getLists.json();

				if(getLists.status == 200){

					for(const list of jsonLists){
					
						listModule.makeListInDOM(list);

							for(const card of list.cards){
						
								cardModule.makeCardInDOM(card);

									for(const tag of card.tags){
										
										tagModule.makeTagInDOM(tag);
									} 

								}
						}

				} else {

					throw jsonLists;
				}
		
		} 
		catch(error){
			
			console.log(error);
		}
	},

	


};


//making sure document is fully loaded before calling app
document.addEventListener('DOMContentLoaded', app.init);