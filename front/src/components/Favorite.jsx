import { useUser } from "../hooks/useUser";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

import { HeartIcon } from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { getUserFavorites, addFavorite, removeFavorite } from "../api/user";

export default function Favorite({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getUserFavorites();
      if (favorites) {
        const favoriteIds = favorites.map((favorite) => favorite._id);
        setIsFavorite(favoriteIds.includes(recipe._id));
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [recipe._id]);

  const addToFavorites = async (recipe) => {
    const response = await addFavorite(recipe);
    if (response.status === 201) {
      setIsFavorite(true);
    } else {
      console.log("Error adding recipe to favorites");
    }
  };

  const removeFromFavorites = async (recipe) => {
    const response = await removeFavorite(recipe);
    if (response.status === 200) {
      setIsFavorite(false);
    } else {
      console.log("Error removing recipe from favorites");
    }
  };

  return (
    <>
      {user &&
        (isFavorite ? (
          <SolidHeartIcon
            className="self-end text-rose-500 w-7 cursor-pointer"
            onClick={() => removeFromFavorites(recipe._id)}
          />
        ) : (
          <HeartIcon
            className="self-end text-rose-500 w-7 cursor-pointer"
            onClick={() => addToFavorites(recipe._id)}
          />
        ))}
    </>
  );
}
