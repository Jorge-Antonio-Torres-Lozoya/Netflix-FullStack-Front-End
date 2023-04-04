import React, { useState, useEffect } from "react";
import { CREATEMOVIE_CATALOG } from "../graphql/Mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GETMOVIES_CATALOG } from "../graphql/Queries";

export const Form = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //var name = ""
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState("");
  const [image, setImage] = useState("");
  const [date_of_released, setDate_of_released] = useState("");

  const [createMovie] = useMutation(CREATEMOVIE_CATALOG, {
    refetchQueries: [{ query: GETMOVIES_CATALOG }],
  });

  return (
	<div className="contenedor-create-movie mt-5 ">
	<div className="contenedor-form w-25 d-flex justify-content-center ">
    <form
      className="py-4 text-white text-center w-50 "
      onSubmit={async (event) => {
        event.preventDefault();
        //Llamar al mutation para crear el employee
        await createMovie({
          variables: {
            title: title.toLowerCase(),
            description,
            likes,
            image,
            date_of_released,
          },
        });
        //Redirigir al usuario hacia /home
        navigate("/home");
      }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          onChange={(event) => {
            let getTitleValue = event.target.value;
            console.log(getTitleValue);
            setTitle(getTitleValue);
            
          }}
          id="title"
          className="form-control inputs-form text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className=" form-label">
          Description
        </label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          id="description"
          className="form-control inputs-form text-white "
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="likes" className="form-label">
          Likes
        </label>
        <input
          type="number"
          onChange={(event) => {
            setLikes(event.target.value);
          }}
          id="likes"
          className="form-control inputs-form text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">
          Image
        </label>
        <input
          type="text"
          onChange={(event) => {
            setImage(event.target.value);
          }}
          id="img"
          className="form-control inputs-form text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dateofreleased" className="form-label">
          Date of released
        </label>

        <input
          type="number"
          onChange={(event) => {
            setDate_of_released(event.target.value);
          }}
          id="dateofreleased"
          className="form-control inputs-form text-white"
          required
        />
      </div>

      <button type="submit" className="text-white btn btn-danger my-3 w-100  ">
        Create Movie
      </button>
    </form>
	</div>
	</div>
  );
};
export default Form;
