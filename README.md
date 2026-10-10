# ArchiteX

ArchiteX is an intelligent architecture analysis tool that transforms system diagrams into quantifiable metrics and actionable insights. By leveraging advanced AI and domain-specific rules, ArchiteX validates your architecture against industry best practices, identifies potential vulnerabilities, and provides data-driven recommendations for improvement.

## Features

- **Architecture-as-Code:** Define and manage your architecture using a declarative configuration language.
- **AI-Powered Analysis:** Utilize natural language processing and machine learning to interpret diagrams and validate designs.
- **Domain-Specific Rules:** Enforce industry best practices for security, scalability, reliability, and performance.
- **Interactive Visualization:** Convert complex architecture diagrams into intuitive, interactive visualizations.
- **Performance Benchmarking:** Simulate traffic patterns and measure system performance under load.

# Flow 

flowchart LR
```mermaid
    subgraph Engine["Backend Engine (Priority 1)"]
        direction LR
        L["Lexer Class"] --> P["Parser"]
        P --> SA["Semantic Analyzer"]
        SA --> GPM["Graph Pattern Matcher"]
        GPM --> RE["Rule Evaluator"]
    end

    subgraph API["Backend API (Priority 2)"]
        direction TB
        NER["Node/Edge/Rule Constants"] --> RH["Route Handlers"]
        GVM["Graph Validation Middleware"]
    end

    subgraph Frontend["Frontend Canvas (Priority 3)"]
        direction TB
        RFC["React Flow Canvas"]
        CSP["Component Sidebar/Palette"]
        VP["Violations Panel"]
        SP["Simulation Panel"]
    end

    RE --> RH
    RH --> RFC
```
## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- Docker (for running services)
- Optional: Visual Studio Code with recommended extensions

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ArchiteX-Team/ArchiteX
   cd ArchiteX
   ```

2. Install backend dependencies:
   ```bash
   cd ArchiteX-Backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../ArchiteX-Frontend
   npm install
   ```

## Usage

### Development Mode

To run both the backend and frontend concurrently:

```bash
cd ArchiteX-Backend
npm run dev
# In a separate terminal:
cd ../ArchiteX-Frontend
npm run dev
```

### Running Tests

Run backend tests:
```bash
cd ArchiteX-Backend
npm test
```

Run frontend tests:
```bash
cd ArchiteX-Frontend
npm run test
```

## Rule Language

ArchiteX uses a Domain-Specific Language (DSL) for defining architecture rules. Rules are written in `.arch` files and can specify conditions based on component types, relationships, and properties.

Example rule:

```arch
# Rule: Ensure each load balancer has at least 2 servers
RULE "LoadBalancerHasEnoughServers"
SEVERITY ERROR
MATCH (lb:LoadBalancer) → (srv:Server)
WHERE COUNT(srv) < 2
YIELD "Load balancer has fewer than 2 servers"
```

See `ArchQL_v3_2.md` for the complete language specification.
