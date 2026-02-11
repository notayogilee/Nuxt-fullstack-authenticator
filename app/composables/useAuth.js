export const useAuth = () => {
  const user = useState("user", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const login = async (email, password) => {
    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email, password },
      credentials: "include",
    });

    user.value = data?.user;

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
    await useRequestFetch("/api/auth/logout", { method: "POST" });
    user.value = null;
  };

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout,
  };
};
