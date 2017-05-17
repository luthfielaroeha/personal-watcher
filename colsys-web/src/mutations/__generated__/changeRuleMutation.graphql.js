/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule changeRuleMutation.graphql
 * @generated SignedSource<<6c737ed9028d610073609dac41b499c2>>
 * @relayHash 5e3f75f3c6a27537e3f6b05aea11f855
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RuleUpdateInput = {
  id?: ?string;
  rule?: ?RuleUpdateInput_rule;
};

export type RuleUpdateInput_rule = {
  name?: ?string;
  index?: ?number;
  status?: ?boolean;
  rule?: ?string;
  actionID?: ?number;
};

export type changeRuleMutationResponse = {
  id: string;
  name: string;
  index: number;
  status?: ?boolean;
  rule: string;
  actionID: number;
};
*/

/* eslint-disable comma-dangle, quotes */

/*
mutation changeRuleMutation(
  $input: RuleUpdateInput
) {
  updateRule(input: $input) {
    id
    name
    index
    status
    rule
    actionID
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RuleUpdateInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "changeRuleMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RuleUpdateInput"
          }
        ],
        "concreteType": "Rule",
        "name": "updateRule",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "index",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "rule",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "actionID",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "changeRuleMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RuleUpdateInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "changeRuleMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RuleUpdateInput"
          }
        ],
        "concreteType": "Rule",
        "name": "updateRule",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "index",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "status",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "rule",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "actionID",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation changeRuleMutation(\n  $input: RuleUpdateInput\n) {\n  updateRule(input: $input) {\n    id\n    name\n    index\n    status\n    rule\n    actionID\n  }\n}\n"
};

module.exports = batch;