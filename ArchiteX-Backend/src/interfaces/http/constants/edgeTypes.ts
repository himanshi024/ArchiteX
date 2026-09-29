export interface EdgeTypeInfo {
  type: string;
  label: string;
  description: string;
  directed: boolean;
  defaultColor: string;
}

export const edgeTypes: EdgeTypeInfo[] = [
  {
    "type": "Traffic",
    "label": "Traffic",
    "description": "Generic HTTP / TCP traffic",
    "directed": true,
    "defaultColor": "#6366F1"
  },
  {
    "type": "Reads",
    "label": "Reads",
    "description": "Data read operation",
    "directed": true,
    "defaultColor": "#22C55E"
  },
  {
    "type": "Writes",
    "label": "Writes",
    "description": "Data write operation",
    "directed": true,
    "defaultColor": "#EF4444"
  },
  {
    "type": "Calls",
    "label": "Calls",
    "description": "Synchronous RPC / API call",
    "directed": true,
    "defaultColor": "#F59E0B"
  },
  {
    "type": "ReplicatesTo",
    "label": "Replicates To",
    "description": "Data replication link",
    "directed": true,
    "defaultColor": "#8B5CF6"
  },
  {
    "type": "Publishes",
    "label": "Publishes",
    "description": "Message publication",
    "directed": true,
    "defaultColor": "#06B6D4"
  },
  {
    "type": "Consumes",
    "label": "Consumes",
    "description": "Message consumption",
    "directed": true,
    "defaultColor": "#0EA5E9"
  },
  {
    "type": "Streams",
    "label": "Streams",
    "description": "Streaming data flow",
    "directed": true,
    "defaultColor": "#14B8A6"
  },
  {
    "type": "Proxies",
    "label": "Proxies",
    "description": "Traffic proxying (ServiceMesh, CircuitBreaker)",
    "directed": true,
    "defaultColor": "#A855F7"
  }
];
