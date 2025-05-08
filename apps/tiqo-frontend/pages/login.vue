<script setup lang="ts">
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';

  const formSchema = z.object({
    email: z.string().email('El correo electrónico no es válido').min(1, 'El correo electrónico es requerido'),
    password: z.string().min(1, 'La contraseña es requerida'),
  });

  type FormSchema = z.output<typeof formSchema>;

  const state = reactive<Partial<FormSchema>>({
    email: undefined,
    password: undefined,
  })

  const toast = useToast();
  
  const onSubmit = async (event: FormSubmitEvent<FormSchema>) => {
    toast.add({
      title: 'Formulario enviado',
      description: JSON.stringify(event.data),
      color: 'success',
    });
  }
</script>

<template>
  <div 
  :class="`
    grid lg:grid-cols-2
    rounded-lg overflow-hidden
    border
    w-full max-w-4xl mx-auto
  `">
      <UForm
        :schema="formSchema"
        :state="state"
        
        class="flex flex-col gap-6 p-12 min-h-110"
        @submit="onSubmit"
      >
      <h2 class="text-center">Bienvenido</h2>
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

        <CoreButton type="submit" class="border surface">
          Iniciar sesión
        </CoreButton>
      </UForm>

    <NuxtImg src="images/pablo-merchan-montes-unsplash.jpg" class="w-full h-full object-cover" />
  </div>
</template>