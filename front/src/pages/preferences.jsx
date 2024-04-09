import { FaceFrownIcon, TrashIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import SearchBarSection from "../components/SearchBarSection";
import Button from "../components/Button";
import { addPreferences } from "../api/user";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { removePreferences } from "../api/user";

export default function Preferences() {
  const [preferences, setPreferences] = useState();
  const { user, getUserInfo } = useUser();

  const onClick = async () => {
    try {
      await addPreferences({ dietaryPreferences: preferences });
      setPreferences("");
      await getUserInfo();
    } catch (err) {
      console.log("Error adding recipe to favorites");
    }
  };

  return (
    <div>
      <SearchBarSection isTall={false} />

      <div className="flex items-center my-16 relative ">
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <h2 className="mb-4 text-2xl font-semibold leading-tight flex gap-5">
            Contre-indications alimentaires
            <FaceFrownIcon className=" text-rose-500 w-8 p-1" />
          </h2>
          <p>
            Si vous avez des restrictions alimentaires telles que des allergies,
            des contre-indications médicales, des motifs religieux, etc.,
            veuillez les saisir ici. Cela nous permettra de restreindre les
            résultats de recherche pour correspondre à vos besoins spécifiques.
          </p>
          <br />
          <div className="flex items-center">
            <input
              type="text"
              placeholder="(ex: arachides, fruits de mer, produits laitiers, gluten)"
              onChange={(e) => setPreferences(e.target.value)}
              value={preferences}
              className="w-1/2 h-10 p-5 border border-gray-600 rounded focus:border-rose-600 focus:outline-none relative pl-10 pr-20 hover:border-rose-600 hover:bg-gray-50 text-sm text-gray-600 font-normal placeholder-gray-500 transition-all duration-200"
            />
            <Button
              onClick={() => onClick(preferences)}
              className="ml-10 text-white font-normal bg-rose-600 hover:bg-rose-700 rounded p-3 text-sm"
            >
              Envoyer
            </Button>
          </div>
        </div>
      </div>
      <div className="container p-2 mx-auto sm:p-4 mb-20">
        <div className="overflow-x-auto">
          <table className="w-full p-6 text-xs text-left whitespace-nowrap">
            <colgroup>
              <col className="w-5" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-5" />
            </colgroup>
            <thead>
              <tr className="dark:bg-gray-300">
                <th className="p-3">Nom</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-50">
              {user.dietaryPreferences.map((preference, index) => (
                <tr key={index}>
                  <td className="px-3 text-md">{preference}</td>
                  <td className="px-3">
                    <TrashIcon
                      className=" text-rose-500 w-8 p-1 cursor-pointer"
                      onClick={() =>
                        removePreferences({
                          dietaryPreferences: preference,
                        }).then(async () => await getUserInfo())
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
