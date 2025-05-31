<script lang="ts" setup>
import { graphql } from '~/codegen/gql';

const route = useRoute();
let id = route.params.id;

if (Array.isArray(id)) {
  id = id[0];
}

const { result, loading, error } = useQuery(
  graphql(`
    query ReadTable($id: ID!) {
      readTable(id: $id) {
        id
        name
        orders {
          id
          code
          total
          currencyCode
          createdAt
        }
      }
    }
  `),
  { id },
  commonQueryOptions
);

</script>
