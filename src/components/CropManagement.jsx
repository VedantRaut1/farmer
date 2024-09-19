import React from 'react';
import '../styles/CropManagement.css';

const tips = [
  {
    id: 1,
    title: 'Soil Preparation',
    description: 'Ensure your soil is well-prepared with the right nutrients and pH levels before planting. Conduct soil tests to understand the nutrient requirements.',
  },
  {
    id: 2,
    title: 'Watering Techniques',
    description: 'Implement efficient watering techniques such as drip irrigation to minimize water wastage and ensure consistent moisture for your crops.',
  },
  {
    id: 3,
    title: 'Pest Control',
    description: 'Monitor your crops regularly for pests and diseases. Use organic or integrated pest management techniques to control infestations effectively.',
  },
  {
    id: 4,
    title: 'Crop Rotation',
    description: 'Practice crop rotation to prevent soil depletion and reduce the risk of soil-borne diseases. Rotate crops with different nutrient requirements and pest profiles.',
  },
  {
    id: 5,
    title: 'Harvesting',
    description: 'Harvest crops at the right time for optimal yield and quality. Follow guidelines specific to each crop for the best harvesting practices.',
  }
];

const CropManagement = () => {
  return (
    <div className="crop-management-container">
      <h1>Crop Management Tips</h1>
      <div className="tips-list">
        {tips.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h2>{tip.title}</h2>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropManagement;
