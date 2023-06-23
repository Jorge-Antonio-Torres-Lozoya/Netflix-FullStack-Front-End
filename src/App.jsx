
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink } from "@apollo/client";
import Home from './components/Home'
import  Login  from './components/Login';
import Navbar from './components/Navbar';
import Form from './components/Form';
import MovieSubList from './components/MovieSubList';


function App() {
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   uri: "https://poetic-youtiao-3942f3.netlify.app/",
  // });

  const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://poetic-youtiao-3942f3.netlify.app/',
        fetchOptions: {
          mode: 'no-cors'
        }
    }),
    cache: new InMemoryCache(),
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
