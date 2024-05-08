//Chuyển ảnh sang dạng base64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export function convertToMonney(price) {
  return price?.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
}

export function validation(values) {
  const regexPhone = /(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/;
  let message = "";

  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      message = "Vui lòng nhập đầy đủ thông tin";
    }

    if (key === "phone" && values[key]) {
      if (!regexPhone.test(values[key]))
        message = "Số điện thoại chưa đúng định dạng";
    }
  });

  return message;
}
