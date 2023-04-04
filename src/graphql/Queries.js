import { gql } from "@apollo/client"

export const LOGIN =  gql`
query loginUser($email:String,$password:String){
    loginUser(email:$email,password:$password){
     _id
     email
     
 
   }
 }
 `
export const GETMOVIES_CATALOG =  gql`
query getMovies_catalog{
  getMovies_catalog{
    _id
    title
    description
    likes
    image
    date_of_released

  }
}
`
export const FIND_BY_TITLE =  gql`
query findByTitle($title:String){
  findByTitle(title:$title){
    _id
    title
    description
    likes
    image
    date_of_released
  }
}
`
