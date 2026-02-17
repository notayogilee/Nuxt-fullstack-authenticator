export const useAuth = () => {
  const user = useState("user", () => null);
  const isLoggedIn = computed(() => !!user.value);
  const initialized = useState("auth-initialized", () => false);

  const fetchUser = async () => {
    if (initialized.value) return;

    try {
      const { data } = await useFetch("/api/auth/me", {
        credentials: "include",
      });

      if (data) {
        user.value = data.value.data;
        initialized.value = true;
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
      user.value = null;
      initialized.value = false;
    }
  };

  const login = async (email, password) => {
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
      credentials: "include",
    });

    user.value = data?.user;
    initialized.value = true;

    return data.user;
  };

  const register = async (email, password, username) => {
    const data = await $fetch("/api/auth/register", {
      method: "POST",
      body: { email, password, username },
    });

    return data.user;
  };

  const logout = async () => {
    user.value = null;
    initialized.value = false;
    await $fetch("/api/auth/logout", { method: "POST" });
  };

  return {
    user,
    isLoggedIn,
    initialized,
    fetchUser,
    login,
    register,
    logout,
  };
};
