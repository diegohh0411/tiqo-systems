<script setup lang="ts">
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';
  import { graphql } from '~/codegen/gql';

  const formSchema = z.object({
    email: z.string().email('El correo electrónico no es válido').min(1, 'El correo electrónico es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
    rememberMe: z.boolean(),
  });

  type FormSchema = z.output<typeof formSchema>;

  const state = reactive<Partial<FormSchema>>({
    email: undefined,
    password: undefined,
    rememberMe: false,
  })

  const toast = useToast();
  
  const loading = ref(false);
  const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
    loading.value = true;

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
      username: event.data.email,
      password: event.data.password,
      rememberMe: event.data.rememberMe,
    })

    onDone(async ({ data }) => {
      loading.value = false;

      if (data?.login.__typename === 'InvalidCredentialsError') {
        toast.add({
          title: 'Error',
          description: data.login.message,
          color: 'error',
        });
        return;
      } else if (data?.login.__typename === 'CurrentUser') {
        toast.add({
          title: 'Éxito',
          description: JSON.stringify(data?.login),
          color: 'success',
        });
      }

      
    })
  }
</script>

<template>
  <UForm
    :schema="formSchema"
    :state="state"
    
    :class="`
      flex flex-col gap-6 p-12 
      w-full max-w-lg mx-auto
      min-h-110
      border rounded
    `"
    @submit="onSubmit"
  >
    <div class="flex flex-col justify-center gap-1">
      <Icon name="lucide-ticket" class="mx-auto text-xl" />

      <h2 class="text-center">Bienvenido a Tiqo</h2>

      <ULink to="/signup" class="text-center">¿No tienes cuenta? <u>Regístrate</u></ULink>
    </div>

    
    <UFormField 
      label="Correo electrónico"
      name="email"
      required
      >
      <UInput v-model="state.email" class="w-full" />
    </UFormField>

    <UFormField label="Contraseña" name="password" required>
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>

    <UCheckbox v-model="state.rememberMe" name="rememberMe" label="Recuérdame" class="w-full" />

    <UButton type="submit" class="flex items-center justify-center cursor-pointer py-2" color="neutral" :loading="loading">
      <p class="mx-auto">Iniciar sesión</p>
    </UButton>
  </UForm>
</template>