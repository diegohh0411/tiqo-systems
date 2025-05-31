import type { NavigationMenuItem } from '@nuxt/ui';

export const useNavigationItems = (): Ref<NavigationMenuItem[]> => {
  const items = ref([
    {
      label: '¿Cómo funciona?',
      icon: 'lucide-circle-help',
      to: '/#como-funciona',
      active: false
    },
    {
      label: 'Beneficios',
      description: 'Descubre cómo Tiqo mejora la experiencia de tus clientes y aumenta tus ventas',
      icon: 'lucide-chart-line',
      to: '/#beneficios',
      active: false,
    },
    {
      label: 'Estoy interesado',
      icon: 'lucide-hand',
      to: '/interesado',
    }
  ]);

  return items;
}