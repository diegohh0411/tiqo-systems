import type { NavigationMenuItem } from '@nuxt/ui';

export const useNavigationItems = (): Ref<NavigationMenuItem[]> => {
  const items = ref([
    {
      label: '¿Cómo funciona?',
      icon: 'lucide-zap',
      children: [
        {
          label: 'Beneficios hoy',
          icon: 'lucide-trending-up',
          description: 'Descubre cómo Tiqo mejora tu negocio',
        },
        {
          label: 'Próximamente',
          icon: 'lucide-calendar-plus',
          description: 'Próximas funcionalidades que estamos desarrollando',
        }
      ]
    },
    {
      label: '¿Por qué Tiqo?',
      icon: 'lucide-message-circle-question',
      children: [
        {
          label: '¿Quienes somos?',
          icon: 'lucide-smile',
          description: 'Descubre nuestros rostros y nuestra motivación'
        },
        {
          label: '¿Por qué elegir Tiqo?',
          description: 'Conoce las ventajas de trabajar con nosotros'
        }
      ]
    },
    {
      label: 'Precios',
      icon: 'lucide-dollar-sign',
      to: '/pricing',
    }
  ]);

  return items;
}