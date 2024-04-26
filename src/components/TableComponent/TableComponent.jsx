import { Table } from "antd";
import Loading from "../Loading/LoadingComponent";

const paginationConfig = {
  pageSize: 6, // Số lượng hàng trên mỗi trang
};

const TableComponent = (props) => {
  const { products = [], columms = [], isLoading = false } = props;
  const data = products.map((product) => {
    return {
      ...product,
      key: product.id,
    };
  });

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Table
          columns={columms}
          dataSource={data}
          pagination={paginationConfig}
          {...props}
        />
      </Loading>
    </div>
  );
};

export default TableComponent;
