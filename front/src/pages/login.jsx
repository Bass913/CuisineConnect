import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

function Login() {
	const { login, user } = useUser();

	const [formError, setFormError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		login(email, password).then((response) => {
			if (response.status === 200) {
				navigate("/");
			} else {
				setFormError("Email ou mot de passe incorrect");
			}
		});
	};

	return (
		<AuthenticationLayout>
			<section className="w-1/2 mt-28 mx-auto">
				<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
								Connectez-vous à votre compte
							</h2>
							<p className="mt-2 text-sm leading-6 text-gray-500">
								Vous n'êtes pas encore inscrit ?
							</p>
							<NavLink to="/auth/register">
								<p className="font-semibold text-indigo-500 hover:text-indigo-700">
									Inscrivez-vous ici
								</p>
							</NavLink>
						</div>
						<div>
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
											placeholder="Mot de passe"
											className="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
										/>
									</div>
									<div className="my-5">
										{formError && (
											<small className="text-red-600">
												{formError}
											</small>
										)}
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
			</section>
		</AuthenticationLayout>
	);
}

export default Login;
