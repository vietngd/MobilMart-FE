import axios from "axios";
import { useEffect, useState } from "react";

const AddressSelection = ({ getProvice, getDistrict, getWard }) => {
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  //Fetch thông tin tỉnh thành
  const fetchProvince = async () => {
    //Thành phố
    try {
      const res = await axios.get(`https://vapi.vnappmob.com/api/province/`);
      setWard([]);
      return res.data?.results;
    } catch (error) {
      console.log("Err fetch Province", error);
    }
  };

  const handleProvinceChange = async (e) => {
    try {
      const province_id = e.target.value;
      //Tỉnh
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${province_id}`,
      );

      setDistrict(res.data?.results);
      setWard([]);
      getProvice(e.target.options[e.target.selectedIndex].text);
      getDistrict("");
      getWard("");
    } catch (error) {
      console.log("Err fetch district", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const district_id = e.target.value;
    //Huyện
    try {
      const res = await axios.get(
        `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
      );

      setWard(res.data?.results);
      getDistrict(e.target.options[e.target.selectedIndex].text);
      getWard("");
    } catch (error) {
      console.log("Err fetch ward", error);
    }
  };

  const handleWardChange = (e) => {
    getWard(e.target.options[e.target.selectedIndex].text);
  };

  useEffect(() => {
    async function fetchData() {
      setProvince(await fetchProvince());
    }
    fetchData();
  }, []);

  return (
    <div className="mt-5 grid gap-x-2 lg:flex">
      {/* Chọn địa chỉ */}
      <select
        className="mb-2 flex-1 rounded border py-3 outline-none"
        onChange={handleProvinceChange}
        defaultValue=""
      >
        <option value="" disabled>
          Chọn thành phố
        </option>
        {province?.map((item) => {
          return (
            <option
              value={item.province_id}
              key={item.province_id}
              className="py-2 hover:bg-gray-200"
              name={item.province_name}
            >
              {item.province_name}
            </option>
          );
        })}
      </select>
      <select
        className="mb-2 flex-1 rounded border py-3 outline-none"
        onChange={handleDistrictChange}
        defaultValue=""
      >
        <option value="" disabled>
          Chọn tỉnh thành
        </option>
        {district &&
          district?.map((item) => {
            return (
              <option
                value={item.district_id}
                key={item.district_id}
                className="py-2 hover:bg-gray-200"
              >
                {item.district_name}
              </option>
            );
          })}
      </select>
      <select
        className="mb-2 flex-1 rounded border py-3 outline-none"
        onChange={handleWardChange}
        defaultValue=""
      >
        <option value="" disabled>
          Chọn huyện
        </option>
        {ward &&
          ward?.map((item) => {
            return (
              <option
                value={item.ward_id}
                key={item.ward_id}
                className="py-2 hover:bg-gray-200"
              >
                {item.ward_name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default AddressSelection;
