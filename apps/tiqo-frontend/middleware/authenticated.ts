export default defineNuxtRouteMiddleware(() => {
  if (!isLoggedIn.value) {
    return navigateTo('/login');
  }
});