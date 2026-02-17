export const useAuth = () => {
  const user = useState("user", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { user: data } = await $fetch("/api/auth/me", {
        credentials: "include",
      });

      if (data) {
        user.value = data;
        return true;
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
      user.value = null;
      return false;
    }
  };

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
    user.value = null;
    await $fetch("/api/auth/logout", { method: "POST" });
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    register,
    logout,
  };
};
