import { useState } from 'react'
import { UPDATELIKES_CATALOG } from '../graphql/Mutation';
import {  useMutation} from '@apollo/client';
import { GETMOVIES_CATALOG } from '../graphql/Queries';

function useUpdateLikes() {
    const [updateLikes_catalog] = useMutation(UPDATELIKES_CATALOG, {
        //Ejecutar el query despues de eliminar el empleado de la base de datos
        refetchQueries: [{ query: GETMOVIES_CATALOG }],
    });
   
    
   const [guardarLikes,setGuardarLikes]=useState()
    const [liked, setLiked] = useState(false);
    const [like, setLike] = useState(false);


    const handleClick= async (_id,likes) => {
        
        setGuardarLikes(guardarLikes)
        if (!like) {
            setLike(true)
        }
        else {
            setLike(false)
        }
        if (liked) {
            await updateLikes_catalog({
                variables: { _id:_id, likes: likes - 1 }
            });
            console.log(likes)
            setLiked(false);
            // Restar un like de la base de datos y actualizar el estado del botón
        } else {
            await updateLikes_catalog({
                variables: { _id, likes: likes + 1 }
            });
            console.log(likes)
            setLiked(true)
            // Sumar un like a la base de datos y actualizar el estado del botón
        }
    }
    return {
        handleClick,like,liked,guardarLikes
    }
}
export default useUpdateLikes