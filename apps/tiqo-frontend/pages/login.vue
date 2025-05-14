<template>
  <UForm
    :schema="formSchema"
    :state="state"
    
    :class="`
      flex flex-col gap-6 p-6 lg:p-12 
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

    <CoreCallout v-if="unsuccessfulLogin" type="error">
      El correo o la contraseña son incorrectos. Por favor, verifica tus credenciales e intenta de nuevo.
    </CoreCallout>
    
    <UFormField 
      label="Correo electrónico"
      name="email"
      required
      >
      <UInput 
        v-model="state.email" 
        variant="outline"
        class="w-full" 
        trailing-icon="lucide-at-sign" 
      />
    </UFormField>

    <UFormField label="Contraseña" name="password" required>
      <UInput 
        v-model="state.password" 
        variant="outline"
        :type="showPassword ? 'text' : 'password'"
        class="w-full" 
      >
        <template #trailing>
          <UIcon 
            class="text-dimmed"
            :name="showPassword ? 'lucide-eye-off' : 'lucide-eye'"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>
    </UFormField>

    <UCheckbox v-model="state.rememberMe" name="rememberMe" label="Recuérdame" class="w-full" />

    <UButton type="submit" class="flex items-center justify-center cursor-pointer py-2" color="neutral" :loading="loading">
      <p class="mx-auto">Iniciar sesión</p>
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';

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
  
  const loading = ref(false);
  const unsuccessfulLogin = ref(false);
  const showPassword = ref(false);

  const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
    loading.value = true;

    const { email, password, rememberMe } = event.data;

    const loginSuccess = await doLogin(email, password, rememberMe);
    loading.value = false;

    if (loginSuccess) {
      navigateTo('/');
    } else {
      unsuccessfulLogin.value = true;
    }
  }
</script>