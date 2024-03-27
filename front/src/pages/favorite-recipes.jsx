import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigation } from "react-router-dom";
export default function FavoriteRecipes() {
  const { user } = useUser();
  const navigate = useNavigation();
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  useEffect(() => {
    if (!user) navigate("/");
    setFavoriteRecipes(user.favoriteRecipes);
    console.log(favoriteRecipes);
  }, []);
  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Mes recettes favorites
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="dark:bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Nom de la recette</th>
              <th className="p-3">Description</th>
              <th className="p-3">Durée de préparation</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
              <td className="p-3">
                <p>97412378923</p>
              </td>
              <td className="p-3">
                <p>Microsoft Corporation</p>
              </td>
              <td className="p-3">
                <p>14 Jan 2022</p>
                <p className="dark:text-gray-600">Friday</p>
              </td>
              <td className="p-3">
                <p>01 Feb 2022</p>
                <p className="dark:text-gray-600">Tuesday</p>
              </td>
              <td className="p-3 text-right">
                <p>$15,792</p>
              </td>
              <td className="p-3 text-right">
                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
              <td className="p-3">
                <p>97412378923</p>
              </td>
              <td className="p-3">
                <p>Tesla Inc.</p>
              </td>
              <td className="p-3">
                <p>14 Jan 2022</p>
                <p className="dark:text-gray-600">Friday</p>
              </td>
              <td className="p-3">
                <p>01 Feb 2022</p>
                <p className="dark:text-gray-600">Tuesday</p>
              </td>
              <td className="p-3 text-right">
                <p>$275</p>
              </td>
              <td className="p-3 text-right">
                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
              <td className="p-3">
                <p>97412378923</p>
              </td>
              <td className="p-3">
                <p>Coca Cola co.</p>
              </td>
              <td className="p-3">
                <p>14 Jan 2022</p>
                <p className="dark:text-gray-600">Friday</p>
              </td>
              <td className="p-3">
                <p>01 Feb 2022</p>
                <p className="dark:text-gray-600">Tuesday</p>
              </td>
              <td className="p-3 text-right">
                <p>$8,950,500</p>
              </td>
              <td className="p-3 text-right">
                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
              <td className="p-3">
                <p>97412378923</p>
              </td>
              <td className="p-3">
                <p>Nvidia Corporation</p>
              </td>
              <td className="p-3">
                <p>14 Jan 2022</p>
                <p className="dark:text-gray-600">Friday</p>
              </td>
              <td className="p-3">
                <p>01 Feb 2022</p>
                <p className="dark:text-gray-600">Tuesday</p>
              </td>
              <td className="p-3 text-right">
                <p>$98,218</p>
              </td>
              <td className="p-3 text-right">
                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
                  <span>Pending</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
