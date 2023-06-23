import { useLazyQuery} from "@apollo/client";
import React, { useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { userState } from "../config/UserState";
import { GETMOVIES_CATALOG } from "../graphql/Queries";
import useUpdateLikes from "../hooks/useUpdateLikes";



const Home = () => {
  const navigate = useNavigate();
  const verifySession = userState((state) => state.session);
  const { handleClick, like } = useUpdateLikes();
  const [getMovies, { data, error }] = useLazyQuery(GETMOVIES_CATALOG, {
    refetchQueries: [{ query: GETMOVIES_CATALOG }],
  });

  useEffect(() => {
    // if (!verifySession.isValid) return navigate("/");
    getMovies();
  }, []);
  if (data) {
    console.log(data);
  }
  if (error) return <h1>Error: {error}</h1>;
  return (
   
    <div className="d-flex gap-5 py-5 mt-5  flex-row contenedor-card bg-color">
      {data &&
        data.getMovies_catalog.map(
          (
            { _id, title, description, likes, image, date_of_released },
            index
          ) => (
            <div className="card my-2" key={index}  >              
                <img  
                  className="card-img-top img-card"
                  src={image}
                  alt="product image"
                />
              <div className="card-body d-flex div-card-body ">              
                  <h3 className="card-title">
                    {title}
                  </h3>
                <p className="card-title text-justify">
                  {description}{" "}
                </p>
                <div className="d-flex justify-content-between align-items-center w-100 my-3">
                  <span className="">
                    {likes} Likes
                  </span>
                  <button
                    onClick={(event) => {
                      console.log(like);
                      handleClick(_id, likes);
                      like
                        ? (event.target.textContent = "Like")
                        : (event.target.textContent = "Liked");
                    }}
                    value
                    className="btn btn-danger mx-3 "
                  >
                    Like
                  </button>
                </div>
                <p className="">
                  Date of released: {date_of_released}
                </p>
              </div>
            </div>
          )
        )}
    </div>

  );
};

export default Home;
