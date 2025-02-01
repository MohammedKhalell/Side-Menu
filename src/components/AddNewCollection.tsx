import React, { useState, useEffect,useRef } from "react";

interface AddNewCollectionProps {
  onClose: () => void;
}
interface ValidationState {
  collectionName: boolean;
  description: boolean;
  tags: boolean;
  accessLevel: boolean;
}

const AddNewCollection: React.FC<AddNewCollectionProps> = ({ onClose }) => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionTags, setCollectionTags] = useState("");
  const [collectionAccessLevel, setCollectionAccessLevel] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    collectionName: '',
    description: '',
    tags: '',
    accessLevel: '',
    thumbnail: null as File | null
});
  const [isValid, setIsValid] = useState<ValidationState>({
    collectionName: false,
    description: false,
    tags: false,
    accessLevel: false,
  });

  const validateForm = () => {
    const newValidState = {
      collectionName: collectionName.length >= 3,
      description: collectionDescription.length >= 0,
      tags: collectionTags.length > 0,
      accessLevel: collectionAccessLevel.length > 0,
    };
    setIsValid(newValidState);
  };

  useEffect(() => {
    validateForm();
}, [formData]);

  const isFormValid = () => {
    return Object.values(isValid).every((value) => value === true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(isValid).every(Boolean)) {
        console.log({
        collectionName,
        collectionDescription,
        collectionTags,
        collectionAccessLevel,
      });
      onClose();
    }
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File size should not exceed 10MB');
            return;
        }
        const validTypes = ['image/svg+xml', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Only SVG, JPG, and PNG files are allowed');
            return;
        }
        setFormData(prev => ({ ...prev, thumbnail: file }));
    }
};
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        onClose();
    }, 300);
};

  return (
    <div className={`add-new-collection ${isClosing ? 'closing' : ''}`}>
      <div className="collection-form">
        <div className="form-header">
          <div className="header-content">
            <div className="header-icon">
              <img src="/icons/collection-icon.svg" alt="Collection" />
            </div>
            <div className="header-text">
              <h2>Add New Collection</h2>
              <p>Knowledge Base / Create New Collection</p>
            </div>
          </div>
          <button className="close-button" onClick={handleClose}>
            <img src="/icons/close.svg" alt="Close" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>
              Collection Name<span className="required">*</span>
              <img src="/icons/info-icon.svg" alt="info" />
            </label>
            <div className="input-wrapper">
              <img
                src="/icons/document-icon.svg"
                alt="document"
                className="input-icon-left"
              />
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Arena"
                className={
                  !isValid.collectionName && collectionName.length > 0
                    ? "error"
                    : ""
                }
              />
              <div
                className="input-icon-right"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <img src="/icons/info.svg" alt="info" />
                {showTooltip && (
                  <div className="tooltip">
                    Collection Name should be at least 3 characters
                  </div>
                )}
              </div>
            </div>
            {!isValid.collectionName && collectionName.length > 0 && (
              <span className="error-message">
                Collection Name must be at least 3 characters
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Description
              <img src="/icons/info-icon.svg" alt="info" />
            </label>
            <div className="input-wrapper">
              <textarea
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
                placeholder="Description"
                className={
                  !isValid.description && collectionDescription.length > 0
                    ? "error"
                    : ""
                }
              />
            </div>

            
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>
                Tags<span className="required">*</span>
                <img src="/icons/info-icon.svg" alt="info" />
              </label>
              <div className="input-wrapper">
                <img
                  src="/icons/category-2.svg"
                  alt="document"
                  className="input-icon-left"
                />
                <input
                  type="text"
                  value={collectionTags}
                  onChange={(e) => setCollectionTags(e.target.value)}
                  placeholder="Placeholder"
                  className={
                    !isValid.tags && collectionTags.length > 0 ? "error" : ""
                  }
                />
              </div>
            </div>

            <div className="form-group half">
              <label>
                Access Level<span className="required">*</span>
                <img src="/icons/info-icon.svg" alt="info" />
              </label>
              <div className="input-wrapper">
                <img
                  src="/icons/setting-2.svg"
                  alt="document"
                  className="input-icon-left"
                />
                <select
                  value={collectionAccessLevel}
                  onChange={(e) => setCollectionAccessLevel(e.target.value)}
                  className={
                    !isValid.accessLevel && collectionAccessLevel.length > 0
                      ? "error"
                      : ""
                  }
                >
                  <option value="">Placeholder</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

             
            </div>
          </div>
          <div className="upload-wrapper">
          <div 
                className="upload-section"
                onClick={() => fileInputRef.current?.click()}
            >              
            <div className="upload-content">
                <img src="/icons/upload-icon.svg" alt="Upload" />
                <p>
                  <span className="click-text">Click here</span> to upload your
                  Collection Thumbnail or drag and drop.
                </p>
                <p className="support-text">Supported Format: SVG, JPG, PNG (10mb each)</p>
                    {formData.thumbnail && (
                        <p className="file-name">Selected: {formData.thumbnail.name}</p>
                    )}
              </div>
              <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".svg,.jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    required
                />
            </div>
            
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`create-button ${!isFormValid() ? "disabled" : ""}`}
              disabled={!isFormValid()}
            >
                                <img src="/icons/add.svg"sizes="24px" alt="Upload" />

              Create Now
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCollection;
