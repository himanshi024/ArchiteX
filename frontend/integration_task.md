
# 1. Populating the Component Palette
To render the sidebar dynamically, fetch the available node types (like Client, API Gateway, etc.) and edge types from the backend.

## GET ```/api/v1/node-types```
Returns the list of components to render in the left sidebar. Response (200 OK):
```json
{
  "nodeTypes": [
    {
      "type": "Client",
      "label": "Client",
      "description": "End-user or external caller",
      "category": "networking",
      "icon": "monitor"
    },
    {
      "type": "APIGateway",
      "label": "API Gateway",
      "description": "API gateway / reverse proxy entry point",
      "category": "networking",
      "icon": "gateway"
    }
    // ...
  ]
}
```

## GET ```/api/v1/edge-types```
Returns the list of valid connection types (if your UI supports strongly-typed edges like "Reads", "Writes"). ```Response (200 OK)```:


```json
{
  "edgeTypes": [
    {
      "type": "Reads",
      "description": "Data read connection",
      "color": "blue"
    }
    // ...
  ]
}

```

# 2. Managing Simulation Variables
The backend runs "Rules" against the architecture. Some rules allow the user to override simulation thresholds (e.g., maximum CPU usage).

## GET ```/api/v1/rules```
Fetch all loaded rules to determine which ones have simulation controls. This allows you to build sliders or input fields dynamically. ```Response (200 OK)```:


```json
[
  {
    "name": "Server CPU Exceeds Threshold",
    "severity": "WARNING",
    "category": "performance",
    "file": "performance_rules.arch",
    "yieldMessage": "Server CPU exceeds acceptable threshold",
    "hasSimulation": true
  }
  // ...
]

```

# 3. Validating the Canvas Graph
When the user connects components on the canvas, you will send the JSON representation of the graph to the backend to get real-time architecture feedback.

## POST /api/v1/validate
Request Body:


```json
{
  "graph": {
    "nodes": [
      {
        "id": "node-1",
        "type": "Client",
        "properties": {}
      },
      {
        "id": "node-2",
        "type": "Database",
        "properties": { "public": true }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "node-1",
        "target": "node-2",
        "type": "Reads",
        "properties": {}
      }
    ]
  },
  "simulation": {
    "maxCPU": 85
  },
  "ruleFilter": {
    "categories": ["security", "performance"] // Optional: restrict which rules run
  }
}

```
```Response (200 OK)```: Violations are not HTTP errors. The backend will return a 200 OK containing an array of violations that you should overlay on the canvas (e.g., highlighting node-1 and node-2 in red).


```json
{
  "violations": [
    {
      "ruleName": "Client Reads Directly From Public Database",
      "severity": "ERROR",
      "message": "Client reads directly from a public database with no API gateway",
      "highlightedNodeIds": ["node-1", "node-2"],
      "ruleFile": "security_rules.arch"
    }
  ],
  "meta": {
    "totalViolations": 1,
    "bySeverity": { "ERROR": 1, "WARNING": 0, "INFO": 0, "HINT": 0 },
    "rulesEvaluated": 15,
    "nodesEvaluated": 2,
    "edgesEvaluated": 1,
    "durationMs": 4
  }
}

```

# Developer Checklist for Integration


* On App Load: Call 
```/api/v1/node-types``` and map the response to the left sidebar palette.

* On Drag & Drop: Manage the local state of nodes and edges (standard graph representation: nodes with unique IDs, edges pointing from source ID to target ID).
On Canvas Update (Debounced): Send the local graph state to
``` /api/v1/validate```.
* Overlay Violations: Use the ```highlightedNodeIds``` from the ```/validate``` response to apply a red/yellow warning stroke around the offending components on the canvas.
* Simulation Sliders (Optional MVP): Call ```/api/v1/rules```, filter by ```hasSimulation === true```, and render sliders that populate the ```simulation``` object in the validate request.