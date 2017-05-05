/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule RuleCard_rules.graphql
 * @generated SignedSource<<ac91a462a113f60c94b58181412e181c>>
 * @flow
 * @nogrep
 */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type RuleCard_rules = {
  id: string;
  name: string;
  index: number;
  status?: ?boolean;
};
*/

/* eslint-disable comma-dangle, quotes */

const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "RuleCard_rules",
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
    }
  ],
  "type": "Rule"
};

module.exports = fragment;
