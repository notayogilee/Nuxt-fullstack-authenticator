<script setup>
import { ref } from "vue";
import ErrorAlert from "../components/ErrorAlert.vue";

const { login, isLoggedIn } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isLoggedIn) {
    router.push("/");
  }
});

const email = ref("");
const password = ref("");
const error = ref("");
const hidePassword = ref(true);
const showError = ref(false);

const handleLogin = async () => {
  try {
    error.value = "";
    showError.value = false;
    await login(email.value, password.value);

    router.push("/");
  } catch (err) {
    console.log(err);
    showError.value = true;
    error.value = err.data?.message || "Invalid credentials";
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="pb-6 text-2xl">Login</h1>

      <ErrorAlert :message="error" :show="showError" />

      <form class="w-full flex flex-col gap-5" @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="email"
          class="input-field"
        />
        <div class="flex gap-3 items-center">
          <input
            v-model="password"
            :type="hidePassword ? 'password' : 'text'"
            placeholder="password"
            class="input-field"
          />
          <Icon
            v-if="hidePassword"
            name="mdi:eye-outline"
            size="24px"
            @click="hidePassword = false"
            class="cursor-pointer"
          />
          <Icon
            v-if="!hidePassword"
            name="mdi:eye-off-outline"
            size="24px"
            @click="hidePassword = true"
            class="cursor-pointer"
          />
        </div>

        <button class="btn-primary">Login</button>
        <p class="text-center">
          Haven't signed up yet?
          <NuxtLink class="underline" to="/register">Register Here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
