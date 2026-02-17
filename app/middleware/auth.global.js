export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, fetchUser } = useAuth();

  const publicRoutes = ["/login", "/register"];

  await fetchUser();

  if (!publicRoutes.includes(to.path) && !isLoggedIn.value) {
    return navigateTo("/login");
  }

  if (publicRoutes.includes(to.path) && isLoggedIn.value) {
    navigateTo("/");
  }
});
