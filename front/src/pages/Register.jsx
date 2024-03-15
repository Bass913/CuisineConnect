import { useState } from "react";
import AuthenticationLayout from "../layouts/AuthenticationLayout"; 

function Register() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   await axiosInstance.post("/auth/register", {
    //     username: state.username,
    //     email: state.email,
    //     password: state.password,
    //   });
    //   router.push("/login?registered=true");
    // } catch (error) {
    //   if (error.response) {
    //     if (error.response.status === 409) {
    //       setState({
    //         ...state,
    //         error: "Un compte est déjà associé à cet email",
    //       });
    //       return;
    //     }
    //   }
    //   setState({ ...state, error: error.message });
    // }
  };

  return (
    <AuthenticationLayout>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inscrivez-vous
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Vous avez déjà un compte ?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-500 hover:text-secondary-light"
              >
                Connectez-vous ici
              </a>
            </p>
          </div>

          <div>
            <div className="my-5">
              {state.error && (
                <small className="text-red-600">{state.error}</small>
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
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nom d'utilisateur
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={state.username}
                    onChange={handleChange}
                    placeholder="Pseudo"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={state.email}
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
                    id="password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover-bg-indigo-500 focus-visible-outline focus-visible-outline-2 focus-visible-outline-offset-2 focus-visible-outline-indigo-600"
                  >
                    S'inscrire
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

export default Register;
