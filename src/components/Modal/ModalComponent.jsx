import { Modal } from "antd";

const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  children,
  width,
  ...rests
}) => {
  return (
    <Modal title={title} open={isOpen} {...rests} width={width}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
