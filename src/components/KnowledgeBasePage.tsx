import { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar";
import data from './card-data.json';


interface CollectionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  sections: number;
  articles: number;
}

const ITEMS_PER_PAGE = 8;
const KnowledgeBasePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [collections, setCollections] = useState<CollectionItem[]>([]);  
    
  useEffect(() => {
    // Load data from the cabaret file
    setCollections(data);
  }, []);
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE);

  // Get the current page items
  const currentItems = collections.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="knowledge-base">
      <div className="page-header-top"></div>
      <div className="page-header">
        <div className="view-controls">
          <button className="view-btn">
            <img
              src={"/icons/LayoutGrid.svg"}
              alt={`icon`}
              width={24}
              height={24}
            />
            <span>Card View</span>
          </button>
          <button className="view-btn disabled">
            <img src={"/icons/List.svg"} alt={`icon`} width={24} height={24} />{" "}
            <span>List View</span>
          </button>
          <SearchBar placeholder="Search" className="search-bar-card" />
        </div>
        <div className="action-buttons">
          <button className="filter-btn">
            <img
              src={"/icons/Filter.svg"}
              alt={`icon`}
              width={24}
              height={24}
            />
            <span>Filter</span>
          </button>
          <button className="add-new-btn">
            <img src={"/icons/add.svg"} alt={`icon`} width={24} height={24} />{" "}
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="card-section">
        <div className="collections-grid">
           {currentItems.map((item) => (
            <div key={item.id} className="collection-card">
              <div className="card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-stats">
                  <div className='left'>
                <img
              src={"/icons/file.svg"}
              alt={`icon`}
              width={24}
              height={24}
            />
                  <span>{item.sections} Sections</span>
                  </div>
                  <div className='right'>
                  <img
              src={"/icons/Iconic-Label.svg"}
              alt={`icon`}
              width={24}
              height={24}
            />
                  <span>{item.articles} Articles</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
      <button 
          className="next" 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(1)}>
          {'<<'}
        </button>
        <button 
          className="prev" 
          disabled={currentPage === 1} 
          onClick={() => handlePageChange(currentPage - 1)}>
           <img
                src={"/icons/Arrow-Left.svg"}
                alt={`icon`}
                width={24}
                height={24}
                className="top-bar-btn user"
              />        
        </button>
        <div className="pages">
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index} 
              className={currentPage === index + 1 ? 'active' : ''} 
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <button 
          className="next" 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(currentPage + 1)}>
           <img
                src={"/icons/Arrow-Right.svg"}
                alt={`icon`}
                width={24}
                height={24}
                className="top-bar-btn user"
              />        
        </button>
        <button 
          className="next" 
          disabled={currentPage === totalPages} 
          onClick={() => handlePageChange(totalPages)}>
          {'>>'}     
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
