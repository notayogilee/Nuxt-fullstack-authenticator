<script setup>
import { ref } from "vue";

const { register, isLoggedIn } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});

const email = ref("");
const password = ref("");
const username = ref("");
const error = ref("");
const showError = ref(false);

const handleRegister = async () => {
  try {
    error.value = "";
    showError.value = false;
    await register(email.value, password.value, username.value);
    router.push("/login");
  } catch (err) {
    console.error(err);
    error.value = err.data?.message || "Registration failed";
    showError.value = true;
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="mb-6 text-2xl">Register</h1>
      <ErrorAlert :message="error" :show="showError" />

      <form class="w-full flex flex-col gap-5" @submit.prevent="handleRegister">
        <input
          v-model="email"
          type="email"
          placeholder="email"
          class="input-field"
        />
        <input
          v-model="username"
          type="text"
          placeholder="username"
          class="input-field"
        />
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="input-field"
        />
        <button class="btn-primary">Register</button>

        <p class="text-center">
          Already have an account?
          <NuxtLink class="underline" to="/login">Login here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
