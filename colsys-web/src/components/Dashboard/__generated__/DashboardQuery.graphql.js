/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule DashboardQuery.graphql
 * @generated SignedSource<<79183874197e67fdc115291403341ea7>>
 * @relayHash 693d1b470aba691bbeec437f800d10ae
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';

*/


/*
query DashboardQuery {
  sensors {
    ...SensorCard_sensors
    id
  }
  rules {
    ...RuleCard_rules
    id
  }
}

fragment SensorCard_sensors on Sensor {
  id
  trueid
  name
  sensordata {
    ...SensorChart_sensordata
  }
}

fragment RuleCard_rules on Rule {
  id
  name
  index
  status
  rule
  actionID
}

fragment SensorChart_sensordata on SensorData {
  val
  time
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Sensor",
        "name": "sensors",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SensorCard_sensors",
            "args": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Rule",
        "name": "rules",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RuleCard_rules",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "DashboardQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "DashboardQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Sensor",
        "name": "sensors",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Sensor",
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "trueid",
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
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "SensorData",
                "name": "sensordata",
                "plural": true,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "type": "SensorData",
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "val",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "time",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Rule",
        "name": "rules",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Rule",
            "selections": [
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
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query DashboardQuery {\n  sensors {\n    ...SensorCard_sensors\n    id\n  }\n  rules {\n    ...RuleCard_rules\n    id\n  }\n}\n\nfragment SensorCard_sensors on Sensor {\n  id\n  trueid\n  name\n  sensordata {\n    ...SensorChart_sensordata\n  }\n}\n\nfragment RuleCard_rules on Rule {\n  id\n  name\n  index\n  status\n  rule\n  actionID\n}\n\nfragment SensorChart_sensordata on SensorData {\n  val\n  time\n}\n"
};

module.exports = batch;