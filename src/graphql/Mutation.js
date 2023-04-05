import { gql } from "@apollo/client"

export const UPDATELIKES_CATALOG = gql`
mutation updateLikes_catalog($_id:ID,$likes: Int){
    updateLikes_catalog(_id:$_id,likes:$likes){
    _id
    likes
  }
}
`

export const CREATEMOVIE_CATALOG = gql`
mutation createMovie_catalog($title:String
  $description: String
    $likes: Int
    $image: String
    $date_of_released: Int){
  
  createMovie_catalog(title:$title, description: $description,likes:$likes, image: $image,date_of_released:$date_of_released){
		_id
    title
    description
    likes
    image
    date_of_released
    
  }
}`