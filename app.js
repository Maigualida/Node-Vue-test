let express = require('express')
let datas = require('./datas.json')
let cors = require('cors') // securite d'acces a l'API
let fs = require('fs') // module filesystem -> manipule des fichiers
let bodyParser = require('body-parser') // module: securite de vous fomulaires et donnes envoyer

let app = express()

app.use(cors({ origin: 'http://localhost:8080' }));

// to remove an item
app.get("/remove/:id", function (req, res) {
	let id = req.params.id; // recuperer l'id passer en URL
	datas = datas.filter((elt) => elt.id != id)
	// transforma el array en JSON
	let chaine = JSON.stringify(datas);
	fs.writeFile('./datas.json', chaine, 'utf8', (err) => {
		res.json(datas)
	});
});

// add item -> lo copiamos de la pagina de bodyParser-> https://www.npmjs.com/package/body-parser
// securisation 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/send', function (req, res) {
	let form = req.body // recupere toutes mes donnes envoyes par post

	form.id = datas.length + 1;
	datas.push(form);// envoyees mes nouvelles donnes dans les input

	let chaine = JSON.stringify(datas);
	fs.writeFile('./datas.json', chaine, 'utf8', (err) => {
		res.json(datas)
	});
});

// res.json va a afichar la respuesta en forma json 
app.get('/', function (req, res) {
	res.json(datas)
})

// en http://localhost:3000/star va a mostrar los objetos con notas >= 7
app.get("/star", function (req, res) {
	let tab = datas.filter((elt) => elt.note >= 7)
	res.json(tab)
});



// Route "/search/" en GET
//: mot est un paremetre d'URL
// todo esto es para que el rcupere a traves de la URl el valor para despues tratarlo 
app.get('/search/:mot?', function (req, res) {
	let mot = req.params.mot; //req.params => permet de reqcuperer les parametres en URL
	if (mot == "") {
		res.json(datas)
	} else {
		let tab = [];
		let reg = new RegExp(mot, "i")
		tab = datas.filter((elt) =>
			reg.test(elt.title)
		);

		res.json(tab)
	}
});

app.get('/post/:mot', function (req, res) {
	let mot = req.params.mot; //req.params => permet de reqcuperer les parametres en URL
	let tab = [];
	let reg = new RegExp(mot, "i")
	tab = datas.filter((elt) =>
		reg.test(elt.id)
	);

	res.json(tab)
});

app.get('/articlesInvisible', function (req, res) {

	let tab = [];
	tab = datas.filter((elt) =>
		elt.visible === false
	);
	console.log(tab)
	res.json(tab)
});

app.get('/articlesVisble', function (req, res) {

	let tab = [];
	tab = datas.filter((elt) =>
		elt.visible === true
	);
	console.log(tab)
	res.json(tab)
});



app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})