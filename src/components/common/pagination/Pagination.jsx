import React from 'react';
import { Pagination, Select, Space } from 'antd';
import { FormattedMessage } from 'react-intl';

const PaginationComponent = ({ totalRecords, pageNumber, pageSize, handlePageChange }) => {
  const pageSizeOptions = [10, 25, 75, 100];

  return (
    <div
      className="pagination"
      id="pagination"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <div>
        <Space>
          <span>
            <FormattedMessage id="NHShow" defaultMessage="* Show" />
          </span>
          <Select
            className="custom-select"
            getPopupContainer={() => document.getElementById('pagination')}
            defaultValue={pageSize}
            options={pageSizeOptions.map((size) => ({ value: size, label: size }))}
            onChange={(value) => handlePageChange(1, value)}
          />
          <span>
            <FormattedMessage id="NHResults" defaultMessage="* Results" />
          </span>
        </Space>
      </div>
      <Pagination
        total={totalRecords}
        pageSize={pageSize}
        current={pageNumber}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default PaginationComponent;
