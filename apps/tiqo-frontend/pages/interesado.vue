<template>
  <UForm 
    :schema="schema" :state="state" 
   
    class="w-full max-w-3xl mx-auto flex flex-col gap-12"
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-3">
      <h1>¿Estás listo para cobrar mejor?</h1>
      <p>Déjanos tus datos y te contactaremos cuando nuestro producto esté listo.</p>
    </div>

    <UFormField label="Número de teléfono" name="phonenumber" validate-on="input">
      <UInput
        v-model="state.phonenumber"
        type="tel"
        placeholder="Escribe tu número de teléfono"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      /> 
    </UFormField>

    <UFormField label="Correo electrónico" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="Escribe tu correo electrónico"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      />
  </UFormField>

  <UButton
    loading-auto
    type="submit"
    size="xl"
    trailing-icon="lucide-arrow-right"
    class="rounded-full w-fit"
  >
    <p>Quiero saber más</p>
  </UButton>
</UForm>
</template>

<script setup lang="ts">
  import * as z from 'zod';
  import type { FormSubmitEvent } from '@nuxt/ui';

  const schema = z.object({
    email: z.string().email({ message: 'El correo electrónico es inválido' }),
    phonenumber: z.string().regex(/^\d{2}\s?\d{4}\s?\d{4}$/, { message: 'Solo introduce números, siguiendo este formato: XX XXXX XXXX' }),
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    phonenumber: undefined,
    email: undefined,
  });

  const toast = useToast();

  const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    toast.add({
      title: '¡Gracias por tu interés!',
      description: 'Te contactaremos pronto.',
      color: 'success',
    });
  }
</script>