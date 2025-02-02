import { useState, useEffect } from "react";
import data from "./card-data.json";
import AddNewCollection from "./AddNewCollection";

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
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [searchTerm, ] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [filteredCollections, setFilteredCollections] = useState<
    CollectionItem[]
  >([]);
  const handleAddNewClick = () => {
    setShowAddNewForm(true);
  };

  const handleCloseForm = () => {
    setShowAddNewForm(false);
  };
  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCollections(collections);
      return;
    }
    const filtered = collections.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCollections(filtered);
    setCurrentPage(1);
  };
  useEffect(() => {
    setCollections(data);
    setFilteredCollections(data);
  }, []);

  useEffect(() => {
    const filtered = collections.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCollections(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, collections]);

  useEffect(() => {
    // Apply the animation when the showAddNewForm state changes
    const addNewCollection = document.querySelector(".add-new-collection");
    if (addNewCollection) {
      addNewCollection.classList.toggle("show", showAddNewForm);
    }
  }, [showAddNewForm]);
 
  let backdrop;
  if (showAddNewForm) {
    backdrop = <div className="backdrop" />;
  }
  const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE);
  const totalItems = filteredCollections.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = filteredCollections.slice(startIndex, endIndex);

  return (
    <div className={`knowledge-base ${showAddNewForm ? "shadow" : ""}`}>
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
          <div className={`search-bar search-bar-card`}>
            <img
              src={`/icons/search-bar-card.svg`}
              alt={`icon`}
              className="search-icon-button"
            />
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
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
          <button className="add-new-btn" onClick={handleAddNewClick}>
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
                  <div className="left">
                    <img
                      src={"/icons/file.svg"}
                      alt={`icon`}
                      width={24}
                      height={24}
                    />
                    <span>{item.sections} Sections</span>
                  </div>
                  <div className="right">
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
      <div className="pagination-container">
        <div className="pagination">
          <div className="pagination-info">
            Showing page {currentPage} - {startIndex + 1} to {endIndex} of{" "}
            {totalItems} items
          </div>
          <div className="shift-buttons">
            <button
              className="next"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              {"<<"}
            </button>
            <button
              className="prev"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
                            {"<"}

            </button>
            <div className="pages">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="next"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
                            {">"}

            </button>
            <button
              className="next"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
      {showAddNewForm && (
        <div className="add-new-collection-container">
          <div
            className={`add-new-collection-form ${
              showAddNewForm ? "show" : "hide"
            }`}
          >
            <div className="add-new-collection-container">
              <AddNewCollection onClose={handleCloseForm} />
            </div>
          </div>
          <div className="backdrop" onClick={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default KnowledgeBasePage;
