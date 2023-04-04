
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from './components/Home'
import  Login  from './components/Login';
import Navbar from './components/Navbar';
import Form from './components/Form';
import MovieSubList from './components/MovieSubList';


function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/",
  });

  return (
    <Router>
      <ApolloProvider client={client}>
      <Navbar />
        <Routes>
        <Route index element={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-movie" element={<Form />} />
          <Route path="/moviesSearch" element={<MovieSubList />} />
        </Routes>
      </ApolloProvider>
    </Router>


  )
}

export default App
