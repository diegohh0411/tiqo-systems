/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment OrderFragment on Order {\n    code\n    updatedAt\n    totalWithTax\n    currencyCode\n    lines {\n      id\n      customFields {\n        extId\n        extName\n        extSku\n        extUnitCost\n        parentOrderlineId\n        hasBeenPaidFor\n      }\n      linePrice\n      quantity\n    }\n  }\n": typeof types.OrderFragmentFragmentDoc,
    "\n    fragment TableFragment on Table {\n      id\n      extName\n      orders {\n        id\n        code\n        total\n        currencyCode\n        createdAt\n      }\n    }\n  ": typeof types.TableFragmentFragmentDoc,
    "\n          mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {\n            login(username: $username, password: $password, rememberMe: $rememberMe) {\n              ... on CurrentUser {\n                id\n                identifier\n              }\n\n              ... on InvalidCredentialsError {\n                message\n              }\n            }\n          }\n      ": typeof types.LoginDocument,
    "\n      mutation Logout {\n        logout {\n          success\n        }\n      }\n    ": typeof types.LogoutDocument,
    "\n          query ReadOrder($code: String!) {\n            readOrder(code: $code) {\n              ...OrderFragment\n            }\n          }\n        ": typeof types.ReadOrderDocument,
    "\n    query ReadTable($id: ID!) {\n      readTable(id: $id) {\n        id\n        extName\n        orders {\n          id\n          code\n          total\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  ": typeof types.ReadTableDocument,
    "\n    query ReadTables {\n      readTables {\n        id\n        extName\n      }\n    }\n  ": typeof types.ReadTablesDocument,
};
const documents: Documents = {
    "\n  fragment OrderFragment on Order {\n    code\n    updatedAt\n    totalWithTax\n    currencyCode\n    lines {\n      id\n      customFields {\n        extId\n        extName\n        extSku\n        extUnitCost\n        parentOrderlineId\n        hasBeenPaidFor\n      }\n      linePrice\n      quantity\n    }\n  }\n": types.OrderFragmentFragmentDoc,
    "\n    fragment TableFragment on Table {\n      id\n      extName\n      orders {\n        id\n        code\n        total\n        currencyCode\n        createdAt\n      }\n    }\n  ": types.TableFragmentFragmentDoc,
    "\n          mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {\n            login(username: $username, password: $password, rememberMe: $rememberMe) {\n              ... on CurrentUser {\n                id\n                identifier\n              }\n\n              ... on InvalidCredentialsError {\n                message\n              }\n            }\n          }\n      ": types.LoginDocument,
    "\n      mutation Logout {\n        logout {\n          success\n        }\n      }\n    ": types.LogoutDocument,
    "\n          query ReadOrder($code: String!) {\n            readOrder(code: $code) {\n              ...OrderFragment\n            }\n          }\n        ": types.ReadOrderDocument,
    "\n    query ReadTable($id: ID!) {\n      readTable(id: $id) {\n        id\n        extName\n        orders {\n          id\n          code\n          total\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  ": types.ReadTableDocument,
    "\n    query ReadTables {\n      readTables {\n        id\n        extName\n      }\n    }\n  ": types.ReadTablesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderFragment on Order {\n    code\n    updatedAt\n    totalWithTax\n    currencyCode\n    lines {\n      id\n      customFields {\n        extId\n        extName\n        extSku\n        extUnitCost\n        parentOrderlineId\n        hasBeenPaidFor\n      }\n      linePrice\n      quantity\n    }\n  }\n"): (typeof documents)["\n  fragment OrderFragment on Order {\n    code\n    updatedAt\n    totalWithTax\n    currencyCode\n    lines {\n      id\n      customFields {\n        extId\n        extName\n        extSku\n        extUnitCost\n        parentOrderlineId\n        hasBeenPaidFor\n      }\n      linePrice\n      quantity\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment TableFragment on Table {\n      id\n      extName\n      orders {\n        id\n        code\n        total\n        currencyCode\n        createdAt\n      }\n    }\n  "): (typeof documents)["\n    fragment TableFragment on Table {\n      id\n      extName\n      orders {\n        id\n        code\n        total\n        currencyCode\n        createdAt\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {\n            login(username: $username, password: $password, rememberMe: $rememberMe) {\n              ... on CurrentUser {\n                id\n                identifier\n              }\n\n              ... on InvalidCredentialsError {\n                message\n              }\n            }\n          }\n      "): (typeof documents)["\n          mutation Login($username: String!, $password: String!, $rememberMe: Boolean!) {\n            login(username: $username, password: $password, rememberMe: $rememberMe) {\n              ... on CurrentUser {\n                id\n                identifier\n              }\n\n              ... on InvalidCredentialsError {\n                message\n              }\n            }\n          }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation Logout {\n        logout {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation Logout {\n        logout {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          query ReadOrder($code: String!) {\n            readOrder(code: $code) {\n              ...OrderFragment\n            }\n          }\n        "): (typeof documents)["\n          query ReadOrder($code: String!) {\n            readOrder(code: $code) {\n              ...OrderFragment\n            }\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ReadTable($id: ID!) {\n      readTable(id: $id) {\n        id\n        extName\n        orders {\n          id\n          code\n          total\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  "): (typeof documents)["\n    query ReadTable($id: ID!) {\n      readTable(id: $id) {\n        id\n        extName\n        orders {\n          id\n          code\n          total\n          currencyCode\n          createdAt\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ReadTables {\n      readTables {\n        id\n        extName\n      }\n    }\n  "): (typeof documents)["\n    query ReadTables {\n      readTables {\n        id\n        extName\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;