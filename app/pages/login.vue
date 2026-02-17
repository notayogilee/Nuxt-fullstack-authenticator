<script setup>
import { ref } from "vue";
import { validateEmail, validatePassword } from "../utils/validation";
import ErrorAlert from "../components/ErrorAlert.vue";

const { login, isLoggedIn } = useAuth();
const router = useRouter();

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const hidePassword = ref(true);
const showError = ref(false);

const { errors, setError, clearError, clearAllErrors, getError, hasErrors } =
  useFormValidation();

const validateEmailField = () => {
  const result = validateEmail(email.value);
  if (!result.valid) {
    setError("email", result.error);
    return false;
  }
  clearError("email");
  return true;
};

const validatePasswordField = () => {
  const result = validatePassword(password.value);
  if (!result.valid) {
    setError("password", result.error);
    return false;
  }
  clearError("password");
  return true;
};

const handleLogin = async () => {
  clearAllErrors();
  error.value = "";
  showError.value = false;

  const emailValid = validateEmailField();
  const passwordValid = validatePasswordField();

  if (!emailValid || !passwordValid) {
    return;
  }

  loading.value = true;

  try {
    await login(email.value.trim(), password.value);
    await router.push("/");
  } catch (err) {
    error.value = err.data?.message || err.message || "Invalid credentials";
    showError.value = true;
  } finally {
    loading.value = false;
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
        <div class="">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input-field"
            required
            maxlength="254"
            :disabled="loading"
            @blur="validateEmailField"
            @input="clearError('email')"
          />
          <span
            v-if="getError('email')"
            class="error-shake text-red-600 mt-1 text-md block"
          >
            {{ getError("email") }}
          </span>
        </div>
        <div class="flex gap-3 items-center">
          <input
            v-model="password"
            :type="hidePassword ? 'password' : 'text'"
            placeholder="Password"
            class="input-field"
            required
            maxlength="128"
            :disabled="loading"
            @blur="validatePasswordField"
            @input="clearError('password')"
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
        <span
          v-if="getError('password')"
          class="error-shake text-red-600 mt-1 text-md block"
        >
          {{ getError("password") }}
        </span>

        <button class="btn-primary" :disabled="loading || hasErrors">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <p class="text-center">
          Haven't signed up yet?
          <NuxtLink class="underline" to="/register">Register Here!</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>
