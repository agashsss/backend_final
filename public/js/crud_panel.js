class ItcTabs {


	constructor(target, config) {
	  const defaultConfig = {};

	  this._config = Object.assign(defaultConfig, config);
	  
	  this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
	 
	  this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
	 
	  this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
	 
	  this._eventShow = new Event('tab.itc.change');
	 
	  this._init();
	 
	  this._events();
	}


	_init() {
	  this._elTabs.setAttribute('role', 'tablist');
	  this._elButtons.forEach((el, index) => {
		 el.dataset.index = index;
		 el.setAttribute('role', 'tab');
		 this._elPanes[index].setAttribute('role', 'tabpanel');
	  });
	}
	show(elLinkTarget) {
	  const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
	  const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
	  const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
	  if (elLinkTarget === elLinkActive) {
		 return;
	  }
	  elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
	  elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
	  elLinkTarget.classList.add('tabs__btn_active');
	  elPaneTarget.classList.add('tabs__pane_show');
	  this._elTabs.dispatchEvent(this._eventShow);
	  elLinkTarget.focus();
	}
	showByIndex(index) {
	  const elLinkTarget = this._elButtons[index];
	  elLinkTarget ? this.show(elLinkTarget) : null;
	};
	_events() {
	  this._elTabs.addEventListener('click', (e) => {
		 const target = e.target.closest('.tabs__btn');
		 if (target) {
			e.preventDefault();
			this.show(target);
		 }
	  });
	}
 }

 new ItcTabs('.tabs');



	async function getAll(e) {
		e.preventDefault();
		const displayUser = document.querySelector('.users')

		const getAllurl = 'http://localhost:4000/user';

		fetch(getAllurl)
		.then(response => {return response.json()})
		.then(data => {
			data.forEach(user => {
				userblock = '<div class="block_user col-3">' + '<h5 class="firstname">' + user.firstName + '</h5><br>' +
			'<h5 class="lastname">' + user.lastName + '</h5><br>' +
			'<h5 class="email"> email: ' + user.email + '</h5><br>' +
			'<h5 class="lastname"> phone: ' + user.phone + '</h5><br>' +
			'<h5 class="id"> id: ' + user._id + '</h5><br>'
			+ '</div>';

				displayUser.insertAdjacentHTML('beforeend', userblock);
			})

		})
		.then(data => console.log(data))
	}



const getAllbtn = document.getElementById('GET_ALL');

getAllbtn.addEventListener('click', getAll);


//get by id







async function getUserById(e) {
	e.preventDefault();

	const baseUrl = 'http://localhost:4000/user';

	const suburl = document.getElementById('input_id').value;

	const requestUrl = baseUrl + '/' + suburl;

	//

	const DisplayUser = document.querySelector('.gotten_user');

	let userblock = "";

	fetch(requestUrl)
		.then(response => {return response.json()})
		.then(data => {
			userblock = '<div class="block_user col-3">' + '<h5 class="firstname">' + data.firstName + '</h5><br>' +
			'<h5 class="lastname">' + data.lastName + '</h5><br>' +
			'<h5 class="email"> email: ' + data.email + '</h5><br>' +
			'<h5 class="lastname"> phone: ' + data.phone + '</h5><br>' +
			'<h5 class="id"> id: ' + data._id + '</h5><br>'
			+ '</div>';

					console.log(data.firstName);
					DisplayUser.insertAdjacentHTML('beforeend', userblock);
		})
		.then(data => console.log(data))
}

const get_by_id_btn = document.getElementById('get_by_id');

get_by_id_btn.addEventListener('click', getUserById);





//create

async function createUser(e) {
	e.preventDefault();

	const baseUrl = 'http://localhost:4000/user/';


	const email = document.getElementById('email').value;
	const firstName = document.getElementById('first-name').value;
	const lastName = document.getElementById('last-name').value;
	const phone = document.getElementById('phone').value;

	const created = document.querySelector('.created');

	fetch(baseUrl, {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify({
    email: email,
    firstName: firstName,
	 lastName: lastName,
	 phone: phone
  })
})
.then(response => {

	const createdblock = '<div class="col-6"><h3>' + 'User was created succesfully' + '</h3></div>';
	
	created.insertAdjacentElement('beforeend', createdblock)
	
	return response.json()
	})
.then(data => console.log(data))

}

const createUserBtn = document.getElementById('create');

createUserBtn.addEventListener('click', createUser);





//update


async function UpdateUserById(e) {
	e.preventDefault();

	baseUrl = 'http://localhost:4000/user';

	const id = document.getElementById('u_id').value;

	if(!id) {
		console.log('Id cannot be zero');
		return;
	}

	const requestUrl = baseUrl + '/' + id;

	const email = document.getElementById('u_email').value;
	const firstName = document.getElementById('u_first-name').value;
	const lastName = document.getElementById('u_last-name').value;
	const phone = document.getElementById('u_phone').value;

	fetch(requestUrl, {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'PATCH',
  body: JSON.stringify({
    email: email,
    firstName: firstName,
	 lastName: lastName,
	 phone:	phone
  })
})
}

const UpdateUserBtn = document.getElementById('update');
UpdateUserBtn.addEventListener('click', UpdateUserById);











//delete

async function DeleteUserById(e) {
	e.preventDefault();

	baseUrl = 'http://localhost:4000/user';

	const id = document.getElementById('delete_id').value;

	const requestUrl = baseUrl + '/' + id;


	console.log(id);

	const displayDeleted = document.querySelector('.delete')

	fetch(requestUrl, { 
  		method: 'DELETE' 
	})
	.then(data => {
		const deleted = '<div class="deleted"><h3>User </h3> ' + data.firstName + ' was deleted}</div>'

		displayDeleted.insertAdjacentElement('beforeend', deleted)
	})
}

const DeleteUserBtn = document.getElementById('delete');
DeleteUserBtn.addEventListener('click', DeleteUserById);