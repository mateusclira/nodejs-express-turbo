// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

const profiles = {
  mateus: {
    image: '/images/perfil.jpeg',
    username: 'mateus',
    name: 'Mateus',
    company: 'Turbo 360',
    languages: ['Javascript', 'Python', 'PHP', 'Go']
  },
  bgates: {
    image: '/images/bgates.png',
    username: 'bgates',
    name: 'Bill Gates',
    company: 'Microsoft',
    languages: ['C', 'C++', 'C#']
  },
  sjobs: {
    image: '/images/sjobs.png',
    username: 'sjobs',
    name: 'Steve Jobs',
    company: 'Apple',
    languages: ['Objective-C', 'Swift', 'Javascript']
  },
  addProfile: {
    image: '/images/turbo.png',
    username: 'addProfile',
    name: 'Your Name',
    company: 'Your Company',
    languages: ['Javascript', 'Python', 'PHP', 'Go']
  }
}


/*  This is the home route. It renders the index.mustache page from the views directory.
  Data is rendered using the Mustache templating engine. For more
  information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})

router.get('/profiles', (req, res) => {
	const keys = Object.keys(profiles)
	const list = []
	keys.forEach(key => {
		list.push(profiles[key])
	})

	const data = {
		profiles: list,
		timestamp: req.timestamp
	}

	res.render('profiles', data)
})

router.post('/addprofile', (req, res) => {
  const body = req.body
  body['languages'] = body.languages.split(', ')
  
  profiles[body.username] = body
  res.redirect('/profile/' + body.username)
})

/*  This route render json data */
router.get('/json', (req, res) => {
  res.json({
    confirmation: 'success',
    app: process.env.TURBO_APP_ID,
    data: 'this is a sample json route.'
  })
})

/*  This route sends text back as plain text. */
router.get('/send', (req, res) => {
  res.send('This is the Send Route')
})

/*  This route redirects requests to Turbo360. */
router.get('/redirect', (req, res) => {
  res.redirect('https://www.turbo360.co/landing')
})

router.get('/query', (req, res) => {
  const name = req.query.name
  const occupation = req.query.occupation
  
  const data = {
    name: name,
    occupation: occupation
  }

  res.render('profile', data)
})

router.get('/:path', (req, res) => {
  const path = req.params.path

  res.json({
    data: path
  })
})

router.get('/:profile/:username', (req, res, next) => {
  const username = req.params.username
  const profile = profiles[username]

  if (profile == null) {
    res.json({
      confirmation: 'fail',
      message: 'Profile ' + username + ' not found'
    })
    return
  }
  profile.timestamp = req.timestamp
  res.render('profile', profile)
})

module.exports = router
