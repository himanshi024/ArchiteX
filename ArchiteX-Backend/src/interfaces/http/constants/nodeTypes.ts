export interface NodeTypeInfo {
  type: string;
  label: string;
  description: string;
  category: string;
  icon: string;
}

export const nodeTypes: NodeTypeInfo[] = [
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
  },
  {
    "type": "LoadBalancer",
    "label": "Load Balancer",
    "description": "Traffic distribution layer",
    "category": "networking",
    "icon": "balance"
  },
  {
    "type": "Server",
    "label": "Server",
    "description": "Application or service instance",
    "category": "compute",
    "icon": "server"
  },
  {
    "type": "Worker",
    "label": "Worker",
    "description": "Background processing unit",
    "category": "compute",
    "icon": "cpu"
  },
  {
    "type": "Database",
    "label": "Database",
    "description": "Persistent data store",
    "category": "data",
    "icon": "database"
  },
  {
    "type": "Cache",
    "label": "Cache",
    "description": "In-memory cache (e.g. Redis, Memcached)",
    "category": "data",
    "icon": "zap"
  },
  {
    "type": "Queue",
    "label": "Queue",
    "description": "Message queue (e.g. SQS, RabbitMQ)",
    "category": "messaging",
    "icon": "list"
  },
  {
    "type": "MessageBroker",
    "label": "Message Broker",
    "description": "Pub/sub broker (e.g. Kafka)",
    "category": "messaging",
    "icon": "share-2"
  },
  {
    "type": "StreamProcessor",
    "label": "Stream Processor",
    "description": "Stream computation (e.g. Flink, Spark)",
    "category": "messaging",
    "icon": "activity"
  },
  {
    "type": "SearchEngine",
    "label": "Search Engine",
    "description": "Full-text search (e.g. Elasticsearch)",
    "category": "data",
    "icon": "search"
  },
  {
    "type": "ObjectStorage",
    "label": "Object Storage",
    "description": "Blob / file storage (e.g. S3)",
    "category": "data",
    "icon": "archive"
  },
  {
    "type": "CDN",
    "label": "CDN",
    "description": "Content delivery network",
    "category": "networking",
    "icon": "globe"
  },
  {
    "type": "AuthService",
    "label": "Auth Service",
    "description": "Authentication / authorization service",
    "category": "security",
    "icon": "shield"
  },
  {
    "type": "RateLimiter",
    "label": "Rate Limiter",
    "description": "Request rate control layer",
    "category": "security",
    "icon": "sliders"
  },
  {
    "type": "CircuitBreaker",
    "label": "Circuit Breaker",
    "description": "Fault isolation proxy",
    "category": "security",
    "icon": "alert-triangle"
  },
  {
    "type": "ServiceMesh",
    "label": "Service Mesh",
    "description": "Service-to-service networking layer",
    "category": "networking",
    "icon": "grid"
  },
  {
    "type": "Monitoring",
    "label": "Monitoring",
    "description": "Metrics collection (e.g. Prometheus, Datadog)",
    "category": "observability",
    "icon": "bar-chart-2"
  },
  {
    "type": "Logging",
    "label": "Logging",
    "description": "Log aggregation (e.g. ELK stack)",
    "category": "observability",
    "icon": "file-text"
  },
  {
    "type": "Tracing",
    "label": "Tracing",
    "description": "Distributed tracing (e.g. Jaeger, Zipkin)",
    "category": "observability",
    "icon": "git-merge"
  }
];
