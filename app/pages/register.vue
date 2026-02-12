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
const emailError = ref("");
const passwordError = ref("");
const usernameError = ref("");
const loading = ref(false);

const validateEmailClient = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email is required";
    return false;
  }

  if (!emailRegex.test(email.value)) {
    emailError.value = "Invalid email format";
    return false;
  }
  emailError.value = "";
  return true;
};

const validatePasswordClient = () => {
  const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])/;
  if (!password.value) {
    passwordError.value = "Password is required";
    return false;
  }
  if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters";
    return false;
  }
  if (!passwordRegex.test(password.value)) {
    passwordError.value = "Password must contain letters and numbers";
    return false;
  }
  passwordError.value = "";
  return true;
};

const validateUsernameClient = () => {
  if (!username.value) {
    usernameError.value = "Username is required";
    return false;
  }
  if (username.value.length > 100) {
    usernameError.value = "Username is too long";
  }

  usernameError.value = "";
};

const handleRegister = async () => {
  if (!validateEmailClient() || !validatePasswordClient()) {
    return;
  }
  error.value = "";
  showError.value = false;
  loading.value = true;

  try {
    await register(email.value.trim(), password.value, username.value.trim());
    router.push("/login");
  } catch (err) {
    console.error(err);
    error.value = err.data?.message || err.message || "Registration failed";
    showError.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-white flex flex-col items-center justify-center w-1/2 min-h-1/2 p-24 shadow-2xl rounded-lg"
    >
      <h1 class="mb-6 text-2xl">Register</h1>
      <ErrorAlert :message="error" :show="showError" />

      <form class="w-full flex flex-col gap-5" @submit.prevent="handleRegister">
        <div class="">
          <input
            v-model="email"
            type="email"
            placeholder="email"
            class="input-field"
            required
            :disabled="loading"
            @blur="validateEmailClient"
            maxlength="254"
            @input="() => (emailError = '')"
          />
          <span
            v-if="emailError"
            class="error-shake text-red-600 mt-1 text-md block"
            >{{ emailError }}</span
          >
        </div>
        <div class="">
          <input
            v-model="username"
            type="text"
            placeholder="username"
            class="input-field"
            required
            minlength="1"
            maxlength="100"
            :disabled="loading"
            @blur="validateUsernameClient"
            @input="() => (usernameError = '')"
          />
          <span
            v-if="usernameError"
            class="error-shake text-red-600 mt-1 text-md block"
            >{{ usernameError }}</span
          >
        </div>
        <div class="">
          <input
            v-model="password"
            type="password"
            placeholder="password"
            class="input-field"
            required
            minlength="8"
            maxlength="128"
            :disabled="loading"
            @blur="validatePasswordClient"
            @input="passwordError = ''"
          />
          <span
            v-if="passwordError"
            class="error-shake block text-red-600 mt-1"
            >{{ passwordError }}</span
          >
          <small>Must be at least 8 characters with letters and numbers</small>
        </div>
        <button class="btn-primary" :disabled="loading">
          {{ loading ? "Creating account..." : "Register" }}
        </button>

        <p class="text-center">
          Already have an account?
          <NuxtLink class="underline" to="/login">Login here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
