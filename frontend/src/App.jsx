import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Icons from 'lucide-react';
import './App.css';

// Helper to map backend icon string to a Lucide icon component
const getIconComponent = (iconName) => {
  const iconMap = {
    'monitor': Icons.Monitor,
    'gateway': Icons.Network,
    'balance': Icons.GitFork,
    'server': Icons.Server,
    'cpu': Icons.Cpu,
    'database': Icons.Database,
    'zap': Icons.Zap,
    'list': Icons.List,
    'share-2': Icons.Share2,
    'activity': Icons.Activity,
    'search': Icons.Search,
    'archive': Icons.Archive,
    'globe': Icons.Globe,
    'shield': Icons.Shield,
    'sliders': Icons.Sliders,
    'alert-triangle': Icons.AlertTriangle,
    'grid': Icons.Grid,
    'bar-chart-2': Icons.BarChart2,
    'file-text': Icons.FileText,
    'git-merge': Icons.GitMerge,
  };
  return iconMap[iconName] || Icons.HelpCircle;
};

// Pretty category label mapper
const getCategoryLabel = (category) => {
  const categories = {
    'compute': 'Compute Nodes',
    'networking': 'Networking & Routing',
    'data': 'Storage & Databases',
    'messaging': 'Queues & Streaming',
    'observability': 'Observability',
    'security': 'Security & Compliance',
  };
  return categories[category.toLowerCase()] || category;
};

function App() {
  const [nodeTypes, setNodeTypes] = useState([]);
  const [edgeTypes, setEdgeTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [nodesRes, edgesRes] = await Promise.all([
          axios.get('http://localhost:4000/api/v1/node-types'),
          axios.get('http://localhost:4000/api/v1/edge-types'),
        ]);

        setNodeTypes(nodesRes.data.nodeTypes || []);
        setEdgeTypes(edgesRes.data.edgeTypes || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching schemas from backend:', err);
        setError('Failed to fetch node/edge schemas from backend. Ensure server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter nodes based on search query
  const filteredNodes = nodeTypes.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (node.description && node.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group nodes by category
  const groupedNodes = filteredNodes.reduce((acc, node) => {
    const cat = node.category || 'other';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(node);
    return acc;
  }, {});

  // Handle Drag Start
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">▲</div>
          <span className="logo-text">ArchiteX</span>
          <span className="logo-badge">v1.0.0</span>
        </div>
        <div className="header-status">
          <span className="status-dot"></span>
          <span className="status-text">Backend Connected</span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="main-content">
        {/* Left Sidebar Palette */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Component Palette</h2>
            <p>Drag elements onto the canvas</p>
          </div>

          <div className="sidebar-search">
            <div className="search-input-wrapper">
              <Icons.Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-scrollable">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                Loading palette...
              </div>
            ) : error ? (
              <div style={{ padding: '10px', color: 'var(--error)', fontSize: '13px' }}>
                {error}
              </div>
            ) : Object.keys(groupedNodes).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                No components found
              </div>
            ) : (
              Object.entries(groupedNodes).map(([category, nodes]) => (
                <div key={category} className="sidebar-group">
                  <div className="sidebar-group-title">
                    {getCategoryLabel(category)}
                  </div>
                  <div className="node-palette-list">
                    {nodes.map((node) => {
                      const IconComponent = getIconComponent(node.icon);
                      return (
                        <div
                          key={node.type}
                          className="node-palette-item"
                          draggable
                          onDragStart={(e) => onDragStart(e, node.type)}
                        >
                          <div className="node-icon-wrapper">
                            <IconComponent size={20} />
                          </div>
                          <div className="node-details">
                            <div className="node-label">{node.label}</div>
                            <div className="node-desc">{node.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Right Canvas Placeholder for Step 1 & 2 */}
        <section className="canvas-container">
          <div className="placeholder-view">
            <Icons.ActivitySquare size={48} className="placeholder-icon" />
            <h3>Drag & Drop Canvas Area</h3>
            <p>
              Step 1 and 2 are fully implemented. The sidebar palette loads dynamically
              from the backend server API. 
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
