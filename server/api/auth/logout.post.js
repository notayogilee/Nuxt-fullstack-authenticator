export default defineEventHandler(async (event) => {
  const cookieName = "auth_token";

  if (getCookie(event, cookieName)) {
    deleteCookie(event, cookieName);
  }

  return { message: "Logged out successfully" };
});
