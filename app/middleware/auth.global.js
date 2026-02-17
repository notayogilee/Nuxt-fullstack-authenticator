export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, initialized, fetchUser } = useAuth();

  const publicRoutes = ["/login", "/register"];

  if (!initialized.value) {
    await fetchUser();
  }

  if (!publicRoutes.includes(to.path) && !isLoggedIn.value) {
    return navigateTo("/login");
  }

  if (publicRoutes.includes(to.path) && isLoggedIn.value) {
    navigateTo("/");
  }
});
