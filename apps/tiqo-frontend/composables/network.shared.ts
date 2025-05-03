
import type { UseQueryOptions } from "@vue/apollo-composable";

export const commonQueryOptions = () => {
  const route = useRoute();

  return {
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        'vendure-token': route.params.channel,
      }
    },
    prefetch: false,
  } as Partial<UseQueryOptions>;
}