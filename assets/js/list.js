
//list object

const listModule = {
	
	
	base_url: null,
	
	setBaseUrl: url => listModule.base_url = url,


	//showing modal to create list
    showAddListModal: function () {

		document.getElementById('addListModal').classList.add('is-active');
	},

	
	 /**CREATE */

    //add a new list to DB
    handleAddListForm: async function(event) {
		
		try {

		
				event.preventDefault();
		
				const formData = new FormData(event.target);

		
				const sendList = await fetch(listModule.base_url+"/list", {
				method: "POST",
				body: formData
				});

				const sentList = await sendList.json();
				

				if(sendList.status === 200) {

				//if list added to DB, add it to the DOM
				listModule.makeListInDOM(sentList);
				

				} else {
				
					throw sentList;
				}

		} 
		catch (error) {
			
			console.log(error)

			};

	},
	
   	//create list in DOM
    makeListInDOM: function(list) {
		
		//create a new node based on cloned template
		const template = document.getElementById('listTemplate');
		
		const node = document.importNode(template.content, true);
		
		const h2 = node.querySelector('h2');
		h2.textContent = list.title;
		
		//modify the title w double-click
		h2.addEventListener('dblclick', listModule.showListNameForm);

		//"hidden" form inside node
		node.querySelector('form').addEventListener('submit', listModule.handleListNameForm);

		
		const div = node.querySelector('[list_id]');

		
		div.setAttribute('list_id', list.id);
	

		
		const hiddenInput = div.querySelector('[name="list_id"]');
		hiddenInput.value= list.id;

		//adding events to add card/delete list again
		div.querySelector('.button--add-card').addEventListener('click', cardModule.showAddCardModal);
		div.querySelector('.button--remove-list').addEventListener('click', listModule.showRemoveListConfirmation);
		

		//adding the newly created list at beginning
		const panel = document.querySelector('.panel');
		if (panel) {
			panel.before(node);
		} else {
			document.querySelector('.card-lists').appendChild(node);
		}
    },
	
	/**UPDATE */

    showListNameForm: function(event) {
		
		event.target.classList.add('is-hidden');
		
		const form = event.target.closest('.panel').querySelector('form');
		
		
		form.querySelector('input[name="title"]').value = event.target.textContent;
		
		form.classList.remove("is-hidden");
		 

    },
	
	//update a list's name
    handleListNameForm: async function(event) {
		
		event.preventDefault();
		
		const formData = new FormData(event.target);
		
		const list = event.target.closest('.panel');
		
			try{
		
				const result = await fetch(`${listModule.base_url}/list/${formData.get('list_id')}`, {
				method: 'PATCH',
				body: formData
				});
		
				const json = await result.json();
			
				if(result.status == 200){

					const h2 = list.querySelector('h2');
           		 	h2.textContent = json.title;
            
				} else {
            
            		throw json
				}
			}
		
			catch(error){

			console.error(error);
			
			};

		
		event.target.classList.add('is-hidden');
		list.querySelector('h2').classList.remove('is-hidden');
	},

	/**DELETE */

	showRemoveListConfirmation: function(event) {

		event.preventDefault();
		
		if(!confirm("Are you sure you want to delete this list?")){
			
			return;
		
		} else {

		
			const listId = event.target.closest('.is-one-quarter').getAttribute('list_id');
			const list = event.target.closest('.is-one-quarter');
		
		
			listModule.deleteList(listId, list);

		}

	},


	deleteList: async function(listId, list) {

			
			try{

            	const result = await fetch(`${app.base_url}/list/${listId}`, {
                method: 'DELETE',
                body: list
            	});

            

            	if(result.ok){

                	list.remove() ;

            	} else {

                	throw json
            	}


			} 
			catch(error) {
			
				console.error(error);
        	}


	},


};