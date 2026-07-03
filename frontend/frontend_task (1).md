# Requirements:

1. Tooling & Setup

Initialize the Vite React app in the /frontend directory.
Install @xyflow/react for the drag-and-drop canvas.
Install lucide-react for rendering icons.
Use standard CSS or Tailwind. The design must be modern, premium, and feature a dark mode.

2. Dynamic API Integration (CRITICAL)

Do not hardcode node or edge types in the frontend.
On application load, fetch the schema from the backend:
GET http://localhost:4000/api/v1/node-types
GET http://localhost:4000/api/v1/edge-types
Use the returned data to build the Sidebar Palette. Group the nodes by their category field (e.g., Data, Compute, Networking) and use the icon string to map to lucide-react icons.

3. The React Flow Canvas

Implement drag-and-drop from the Sidebar to the Canvas.
Allow connecting nodes with edges. By default, edges should have the type "Traffic" and color #6366F1 (as defined in the edge-types API).
Implement a Properties Panel on the right side of the screen. When a user clicks a node or edge, they should be able to edit its label and add custom Key-Value properties (e.g., public: true, encrypted: false).

4. Validation Hookup

Implement a primary "Validate Architecture" button.
When clicked, map the xyflow state into our POST /validate payload format:
json


~~~
{
  "graph": {
    "nodes": [{ "id": "n1", "type": "Database", "label": "Main DB", "properties": {"public": true} }],
    "edges": [{ "id": "e1", "type": "Traffic", "sourceId": "n1", "targetId": "n2" }]
  }
}
~~~
Display the returned violations array in a Diagnostics panel at the bottom of the screen.
Definition of Done:

 Sidebar populates dynamically from the /node-types API.
 User can place and connect nodes.
 User can edit properties of nodes/edges.
 Clicking "Validate" successfully hits the backend and does not throw a 422 Validation Error.