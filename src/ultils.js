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

export function convertDateTime(timeString) {
  const dateTime = new Date(timeString);

  // Lấy thông tin về ngày, giờ, phút và giây
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
  const day = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  return {
    time: `${hour}:${minute < 10 ? `0${minute}` : minute}:${second}`,
    day: `${day}/${month}/${year}`,
  };
}

export async function URLtoFile(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  // Gets URL data and read to blob

  const mime = blob.type;
  const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);
  // Gets blob MIME type (e.g. image/png) and extracts extension

  const file = new File([blob], `filename.${ext}`, {
    type: mime,
  });

  file.thumbUrl = await getBase64(file);

  return file;
}

export function calculateDailySale(apiData) {
  const dailySale = {};

  // Lấy ngày hiện tại và 15 ngày trước đó
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - 30);

  if (apiData) {
    apiData.forEach((order) => {
      const orderDate = new Date(order.created_at);

      // Chỉ lấy dữ liệu của ngày hiện tại và 15 ngày trước đó
      if (orderDate >= pastDate && orderDate <= now) {
        const date = convertDateTime(order.created_at).day;
        if (dailySale[date]) {
          dailySale[date] += order.total_money;
        } else {
          dailySale[date] = order.total_money;
        }
      }
    });
  }

  const result = Object.keys(dailySale).map((date) => ({
    name: `${date}`,
    sale: dailySale[date],
  }));

  return result.reverse();
}

// Tính tỉ lệ đánh giá
export function calculateAverageRating(ratingCounts) {
  let totalRatings = 0;
  let totalStars = 0;

  for (let star in ratingCounts) {
    let count = ratingCounts[star];
    totalRatings += count;
    totalStars += star * count;
  }

  if (totalRatings === 0) {
    return 0; // Nếu không có đánh giá nào thì trả về 0
  }

  let averageRating = totalStars / totalRatings;
  return Number.isInteger(averageRating)
    ? averageRating
    : averageRating.toFixed(1);
}
