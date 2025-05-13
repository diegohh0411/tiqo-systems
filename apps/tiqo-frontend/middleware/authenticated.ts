export default defineNuxtRouteMiddleware(() => {
  const loggedIn = ref(false);

  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});