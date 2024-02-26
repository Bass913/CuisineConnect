<script setup>
import GuestLayout from "@/layouts/GuestLayout.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/utils/axiosInstance";
// import { userSchema } from "@/utils/validations/userSchema";

const state = reactive({
  username: "",
  email: "",
  password: "",
  error: "",
});

const router = useRouter();

const submit = async () => {
  // const result = userSchema.safeParse(state.form);

  // if (!result.success) {
  //   state.errors = JSON.parse(result.error.message)[0].message;
  //   return;
  // }

  try {
    await axiosInstance.post("/auth/register", {
      username: state.username,
      email: state.email,
      password: state.password,
    });

    router.push("/login?registered=true");
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        state.error = "Un compte est déjà associé à cet email";
        return;
      }
    }
    state.error = error.message;
  }
};
</script>

<template>
  <GuestLayout>
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Inscrivez-vous
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Vous avez déjà un compte ?
            {{ " " }}
            <RouterLink
              to="login"
              class="font-semibold text-indigo-500 hover:text-secondary-light"
              >Connectez-vous ici</RouterLink
            >
          </p>
        </div>

        <div>
          <div class="my-5">
            <small
              v-if="state.error && state.error.length"
              class="text-red-600"
              >{{ state.error }}</small
            >
          </div>

          <div>
            <form method="POST" class="space-y-6" @submit.prevent="submit">
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Pseudo</label
                >
                <input
                  id="username"
                  v-model="state.username"
                  type="text"
                  placeholder="Pseudo"
                  class="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="state.email"
                  type="email"
                  placeholder="exemple@gmail.com"
                  class="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Mot de passe</label
                >
                <input
                  id="password"
                  v-model="state.password"
                  type="password"
                  placeholder="Mot de passe"
                  class="block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover-bg-indigo-500 focus-visible-outline focus-visible-outline-2 focus-visible-outline-offset-2 focus-visible-outline-indigo-600"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </GuestLayout>
</template>
