<template>
  <UForm 
    v-if="!submittedSuccessfully"
    :schema="schema" :state="state" 
   
    class="w-full max-w-3xl mx-auto flex flex-col gap-6"
    @submit="onSubmit"
  >
    <div class="flex flex-col gap-3">
      <h1>¿Estás listo para cobrar mejor?</h1>
      <p>Déjanos tus datos y te contactaremos cuando nuestro producto esté listo.</p>
    </div>

    <UFormField label="Nombre" name="given_name">
      <UInput
        v-model="state.given_name"
        type="text"
        placeholder="Fulano"
        hint="Solo"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      />
    </UFormField>
    
    <UFormField label="Apellidos" name="family_name">
      <UInput
        v-model="state.family_name"
        type="text"
        placeholder="Pérez"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      />
    </UFormField>

    <UFormField label="Número de teléfono" name="phonenumber" validate-on="input">
      <UInput
        v-model="state.phonenumber"
        type="tel"
        placeholder="XX XXXX XXXX"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      /> 
    </UFormField>

    <UFormField label="Correo electrónico" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="fulano@perez.com"
        class="rounded-3xl"
        :ui="{ root: 'w-full', base: 'rounded-3xl p-4' }"
      />
    </UFormField>

    <CoreButton
      loading-auto
      type="submit"
      size="xl"
      trailing-icon="lucide-send-horizontal"
      class="rounded-full w-fit"
    >
      <p>Enviar</p>
    </CoreButton>
  </UForm>

  <div v-else class="flex flex-col gap-3 max-w-xl mx-auto mb-auto">
    <div class="flex gap-2 items-center">
      <h1>¡Listo!</h1>
      <UIcon name="lucide-check" class="text-green-500 text-4xl lg:text-5xl" />
    </div>
    
    <p>Pronto nos pondremos en contacto contigo y estarás cobrando mejor en tu restaurante :)</p>

    <ULink to="/">Regresar a la página principal</ULink>
  </div>
</template>

<script setup lang="ts">
  import { z } from 'zod';

  import type { FormSubmitEvent } from '@nuxt/ui';

  const schema = z.object({
    given_name: z.string({ message: 'Requerido' }).min(1, { message: 'El nombre es requerido' }),
    family_name: z.string({ message: 'Requerido' }).min(1, { message: 'El apellido es requerido' }),
    email: z.string({ message: 'Requerido' }).email({ message: 'El correo electrónico es inválido' }),
    phonenumber: z.string({ message: 'Requerido' }).regex(/^\d{2}\s?\d{4}\s?\d{4}$/, { message: 'Solo introduce números, siguiendo este formato: XX XXXX XXXX' }),
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
    phonenumber: undefined,
    email: undefined,
  });

  const submittedSuccessfully = ref<boolean>(false);

  const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    const response = await useFetch(
      `https://docs.google.com/forms/d/e/1FAIpQLScO7YYGPz7l60f5NNKc6bQkdnMVIqKaB4vfzpIfHuHucNHxsQ/formResponse?usp=pp_url&entry.1495017925=${event.data.given_name}&entry.48520819=${event.data.family_name}&entry.961566760=${event.data.phonenumber}&entry.188277884=${event.data.email}`,
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    if (response.status.value === 'success') {
      submittedSuccessfully.value = true;
    } else {
      submittedSuccessfully.value = false;
    }
  }
</script>