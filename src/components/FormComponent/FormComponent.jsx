import { Checkbox, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

const FormComponent = () => {
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
          marginTop: 20,
        }}
      >
        <Form.Item label="Tên">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Hot" name="disabled" valuePropName="checked">
          <Checkbox></Checkbox>
        </Form.Item>
        <Form.Item label="Giá gốc">
          <Input style={{ width: "150px" }} />
        </Form.Item>
        <Form.Item label="Giá sale">
          <Input style={{ width: "150px" }} />
        </Form.Item>
        <Form.Item label="Số lượng">
          <Input style={{ width: "50px" }} />
        </Form.Item>

        <Form.Item label="Danh mục">
          <Select style={{ width: "200px" }}>
            <Select.Option value="Iphone">Iphone</Select.Option>
            <Select.Option value="Samsung">Samsung</Select.Option>
            <Select.Option value="Vivo">Vivo</Select.Option>
            <Select.Option value="Xiaomi">Xiaomi</Select.Option>
            <Select.Option value="Realme">Realme</Select.Option>
            <Select.Option value="Oppo">Oppo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Cấu hình">
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
export default FormComponent;
