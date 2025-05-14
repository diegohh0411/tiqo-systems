import { useStorage } from "@vueuse/core";
import { graphql } from "~/codegen/gql";
import type { CurrentUser } from "~/codegen/gql/graphql";

export const currentUser = useStorage<Partial<CurrentUser>>("currentUser", {});

export const isLoggedIn = computed(() => {
  return Object.keys(currentUser.value).length > 0;
})

/**
 * Attepts to login a user with the given email and password. Returns true if the login was successful, false otherwise.
 */
export const doLogin = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
  const { mutate, onDone } = useMutation(
    graphql(`
          mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {
            login(username: $username, password: $password, rememberMe: $rememberMe) {
              ... on CurrentUser {
                id
                identifier
              }

              ... on InvalidCredentialsError {
                message
              }
            }
          }
      `)
  );

  mutate({
    username: email,
    password: password,
    rememberMe: rememberMe,
  });

  return new Promise((resolve) => {
    onDone(({ data }) => {
      if (data?.login.__typename === 'InvalidCredentialsError') {
        resolve(false);
      } else if (data?.login.__typename === 'CurrentUser') {
        currentUser.value = data.login;
        resolve(true);
      }
    });
  });
}

export const doLogout = async (): Promise<void> => {
  const toast = useToast();

  const { mutate, onDone } = useMutation(
    graphql(`
      mutation Logout {
        logout {
          success
        }
      }
    `)
  );

  mutate();

  return new Promise((resolve) => {
    onDone(({ data }) => {
      if (data?.logout?.success) {
        currentUser.value = {};

        resolve();
      } else {
        toast.add({
          title: "Oh oh",
          description: "Tuvimos un error, vuelve a intentarlo más tarde",
          color: "error",
        });
        resolve();
      }
    });
  });
};
