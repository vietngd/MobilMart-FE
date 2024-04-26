import { Drawer } from "antd";

const DrawerComponent = ({
  title = "Drawer",
  placement = "right",
  isOpen = false,
  children,
  ...rest
}) => {
  return (
    <Drawer title={title} open={isOpen} placement={placement} {...rest}>
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
