import React, { useState } from 'react';
import { Row } from 'antd';
import FAQCategory from '../faqCategory/FAQCategory.jsx';
import style from './FAQCategories.module.scss';
import { FormattedMessage } from 'react-intl';

const FAQCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 1, title: 'Fleet Management', icon: '/images/modern/faq/Fleet Management.png' },
    { id: 2, title: 'Legal Services', icon: '/images/modern/faq/Legal Services.png' },
    { id: 3, title: 'VAT Self-Services', icon: '/images/modern/faq/VAT Self-Services.png' },
    { id: 4, title: 'Gurecard', icon: '/images/modern/faq/Gurecard.png' },
    { id: 5, title: 'Tacho Manager', icon: '/images/modern/faq/Tacho Manager.png' },
    { id: 6, title: 'Positioning', icon: '/images/modern/faq/Positioning.png' },
    { id: 7, title: 'Assistances', icon: '/images/modern/faq/Assistances.png' },
    { id: 8, title: 'TruckController', icon: '/images/modern/faq/TruckController.png' },
    { id: 9, title: 'Document Box', icon: '/images/modern/faq/Document Box.png' },
    { id: 10, title: 'Shared Calendar', icon: '/images/modern/faq/Shared Calendar.png' },
  ];

  const handleCategorySelect = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className={style.FAQCategories}>
      <h2>
        <FormattedMessage id="FAQs" defaultMessage="* FAQs" />
      </h2>
      <input className={style.FAQSearch} placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
      <Row gutter={[16, 16]}>
        {filteredCategories.map((category) => (
          <FAQCategory
            key={category.id}
            title={category.title}
            icon={category.icon}
            isSelected={selectedCategory === category.title}
            onSelect={() => handleCategorySelect(category.title)}
          />
        ))}
      </Row>
    </div>
  );
};

export default FAQCategories;
