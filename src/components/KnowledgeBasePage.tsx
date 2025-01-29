import { LayoutGrid, List, Filter, Plus } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const KnowledgeBasePage = () => {
  return (
    <div className="knowledge-base">
          <div className="page-header-top"></div>
      <div className="page-header">
        <div className="view-controls">
          <button className="view-btn active">
            <LayoutGrid size={20} />
            <span>Card View</span>
          </button>
          <button className="view-btn">
            <List size={20} />
            <span>List View</span>
          </button>
          <SearchBar
            placeholder="Search"
            className="search-bar-card"
          />
        </div>
        <div className="action-buttons">
          <button className="filter-btn">
            <Filter size={20} />
            <span>Filter</span>
          </button>
          <button className="add-new-btn">
            <Plus size={20} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="card-section">
        <div className="collections-grid">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="collection-card">
              <div className="card-image">
                <img src="/icons/knowledge-base.svg" alt="Collection" />
              </div>
              <div className="card-content">
                <h3>Collection Name</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="card-stats">
                  <span>12 Section</span>
                  <span>50 Article</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button className="prev">Previous</button>
        <div className="pages">
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
        <button className="next">Next</button>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
