import React, { useState } from "react"
import { useField } from "../src/hooks/index"
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom"
const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create New
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    {notification}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)
const Anecdote = ({ quotes }) => {
  const id = useParams().id
  const quote = quotes.find((n) => n.id === id)
  return (
    <div>
      <h2>{quote.content}</h2>
      <p>Has {quote.votes} votes</p>
      <p>
        For more info, see <a href={quote.info}>{quote.info}</a>{" "}
      </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const contentField = useField("content")
  const authorField = useField("author")
  const infoField = useField("info")
  const content = contentField.value
  const author = authorField.value
  const info = infoField.value
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    history.push("/")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 5,
      id: "2",
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = (anecdote) => {
    console.log(anecdote)
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" added!`)
    setTimeout(() => {
      setNotification("")
    }, 10000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote quotes={anecdotes} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} notification={notification} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
