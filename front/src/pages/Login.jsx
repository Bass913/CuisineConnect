import { useState } from "react";
import ReactDOM from "react-dom/client";
import AuthenticationLayout from "../layouts/AuthenticationLayout"; 

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    error: "",
  });
  //const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosInstance
//       .post("/auth/login", form)
//       .then((response) => {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         useMainStore().setUser(response.data.user);
//         history.push("/");
//       })
//       .catch((error) => {
//         if (error.response) {
//           if (error.response.status === 401) {
//             setForm({
//               ...form,
//               error: "Nom d'utilisateur ou mot de passe incorrect",
//             });
//             return;
//           }
//         }
//         setForm({
//           ...form,
//           error: "Une erreur s'est produite lors de la connexion",
//         });
//       });
//   };

    const handleSubmit = (e) => {
    }

  return (
    <AuthenticationLayout>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Connectez-vous à votre compte
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Vous n'êtes pas encore inscrit ?{" "}
              <a
                href="/register"
                className="font-semibold text-indigo-500 hover:text-indigo-700"
              >
                Inscrivez-vous ici
              </a>
            </p>
          </div>
          <div>
            <div className="my-5">
              {form.error && (
                <small className="text-red-600">{form.error}</small>
              )}
            </div>

            <div>
              <form
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="exemple@gmail.com"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <div className="text-sm leading-6">
                    <a
                      href="/password-reset"
                      className="font-semibold text-indigo-500 hover:text-indigo-700"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  );
}

export default Login;
