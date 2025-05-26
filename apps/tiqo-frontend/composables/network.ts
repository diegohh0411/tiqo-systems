import type { TypedDocumentNode, OperationVariables } from '@apollo/client/core';
import type { DocumentNode } from 'graphql';

export function tQuery<TResult = unknown, TVariables extends OperationVariables = Record<string, unknown>>(
  document: DocumentNode | TypedDocumentNode<TResult, TVariables>,
  variables: TVariables = {} as TVariables,
  options?: object
) {
  const route = useRoute();

  return useQuery<TResult, TVariables>(
    document,
    variables,
    {
      context: {
        headers: {
          'vendure-token': route.params.channel,
        }
      },
      errorPolicy: 'all',
      prefetch: false,
      fetchPolicy: 'no-cache',
      ...options
    }
  )
}

export function tMutation<TResult = unknown, TVariables extends OperationVariables = Record<string, unknown>>(
  document: DocumentNode | TypedDocumentNode<TResult, TVariables>,
  variables: TVariables = {} as TVariables,
  options?: object
) {
  const route = useRoute();

  return useMutation<TResult, TVariables>(
    document,
    {
      context: {
        headers: {
          'vendure-token': route.params.channel,
        }
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      variables,
      ...options
    }
  )
}