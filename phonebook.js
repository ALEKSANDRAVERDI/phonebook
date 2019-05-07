function changeText(text) {
	var display = document.getElementById('prvi');
	display.innerHTML = "";
	display.innerHTML = text;
}

function defaultText(text) {
	var display = document.getElementById('prvi');
	display.innerHTML = "";
	display.innerHTML = text;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
const maxWH = Math.max(width, height);


canvas.width = width;
canvas.height = height;



function randomInteger(max = 256) {
	return Math.floor(Math.random() * max);
}

function makeRandomSquares(n) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < n; i++) {
		const size = Math.random() * (maxWH * 0.05);

		const x = Math.random() * width - size / 2;
		const y = Math.random() * height - size / 2;

		ctx.fillStyle = `rgba(${randomInteger()},${randomInteger()},${randomInteger()},0.9)`;
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);

		ctx.fill();
	}
}


setInterval(makeRandomSquares, 2000, 30);




;
(function(global) {
	var AddressBook = function(name, phone, email, occupation) {
		return new AddressBook.init(name, phone, email, occupation);
	};

	AddressBook.prototype = {
		//default functions
		data: [
			//add data here
		],
		searchResults: [

		],
		addNewContact: function(name, phone, email, occupation) {
			this.data.push({
				name: name,
				phone: phone,
				email: email,
				occupation: occupation
			});
			return this;
		},
		returnAll: function() {
			return this.data;
		},
		displayData: function() {
			this.log(this.data);
			return this;
		},
		log: function(data) {
			return this;
		},
		search: function(searchTerm) {

			if (this.data.length) {
				while (this.searchResults.length) {
					this.searchResults.pop(this.searchResults);
				}
				for (var i = 0; i < this.data.length; i++) {
					if (this.data[i].name.toLowerCase() == searchTerm.toLowerCase()) {
						this.searchResults.push(this.data[i]);
					}
				}

				return this.searchResults;
			} else {}
			return this;
		},
		lastResults: function() {
			return this.searchResults;
		}
	}

	AddressBook.init = function(name, phone, email, occupation) {
		var self = this;
		//set up the address book
		if (name || phone || email || occupation) {
			self.addNewContact(name || "", phone || "", email || "", occupation || "");
		}

	}

	AddressBook.init.prototype = AddressBook.prototype;

	global.AddressBook = $ab = AddressBook;
})(window);

if (!window.contactList) { //check if we already have a contact list
	window.contactList = $ab();
}

var form = document.getElementById('contact');
form.addEventListener('submit', function() {
	if (!window.contactList) { //check if we already have a contact list
		window.contactList = $ab(form.person.value, form.phone.value, form.email.value, form.occupation.value);
	} else {
		//saves new values rather than deleting old ones as well
		contactList.addNewContact(form.person.value, form.phone.value, form.email.value, form.occupation.value);
	}

	form.person.value = '';
	form.phone.value = '';
	form.email.value = '';
	form.occupation.value = '';

	event.preventDefault();
});

var searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function() {

	var results;

	if (results !== undefined) {
		results = null;
	}

	if (!window.contactList) {
		window.contactList = $ab();
	} else {
		results = contactList.search(searchForm.search.value);
	}

	document.getElementById('results').innerHTML = '';
	
	if (results.length > 0) {
		for (var i = 0; i < results.length; i++) {
			document.getElementById('results').innerHTML += '<div class="contact-item">Name:' + results[i].name + '<br>Phone:' + results[i].phone +
				'<br>Email:' + results[i].email + '<br>Occupation:' + results[i].occupation + '</div><hr>';
		}
	} else {
		document.getElementById('results').innerHTML += '<div class="contact-item">There are no results for this name</div><hr>';
	}

	//do something with the results
	event.preventDefault();
});

document.getElementById('js-show-all').addEventListener('click', function() {
	if (window.contactList) { //check if we already have a contact list
		document.getElementById('show-panel').innerHTML = '';
		var contacts = contactList.returnAll();
		if (contacts.length > 0) {
			for (var i = 0; i < contacts.length; i++) {
				document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:' + contacts[i].name + '<br>Phone:' + contacts[i].phone + '<br>Email:' + contacts[i].email + '<br>Occupation:' + contacts[i].occupation + '</div><hr>';
			}
		} else {
			document.getElementById('show-panel').innerHTML += '<div class="contact-item">You have no contacts. What a plonker!</div><hr>';
		}
	}
	document.getElementById('show-panel').style.display = 'block';

	document.getElementById('search-panel').style.display = 'none';
	document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-search').addEventListener('click', function() {
	document.getElementById('show-panel').style.display = 'none';
	document.getElementById('search-panel').style.display = 'block';
	document.getElementById('contact-panel').style.display = 'none';
});

document.getElementById('js-add-new').addEventListener('click', function() {
	document.getElementById('show-panel').style.display = 'none';
	document.getElementById('search-panel').style.display = 'none';
	document.getElementById('contact-panel').style.display = 'block';
});