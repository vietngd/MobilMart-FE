import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ children, isLoading, deday = 200 }) => {
  return (
    <Spin
      spinning={isLoading}
      delay={deday}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      }
    >
      {children}
    </Spin>
  );
};

export default Loading;
