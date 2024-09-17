import "./style.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as ProductServices from "../../../../services/productServices";
import * as CategoryServices from "../../../../services/categoryServices";
import * as UserServices from "../../../../services/userServices";
import * as OrderServices from "../../../../services/orderServices";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calculateDailySale, convertToMonney } from "../../../../ultils";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AdminDashboard() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [dataChartLine, setDataChartLine] = useState([]);
  const [dataPieChart, setDataPieChart] = useState([]);

  const fetchProducts = async () => {
    const res = await ProductServices.getAllProduct();
    setProducts(res?.data);
  };
  const fetchCategories = async () => {
    const res = await CategoryServices.getAllCategory();
    setCategories(res?.categories);
  };
  const fetchUsers = async (access_token) => {
    const res = await UserServices.getAllUser(access_token);
    setUsers(res?.data);
  };
  const fetchOrders = async (access_token) => {
    const res = await OrderServices.getAllOrder(access_token);

    setOrders(res?.data);
    const sale = res?.data?.reduce((total, order) => {
      return total + order.total_money;
    }, 0);
    setSales(sale);
    setDataChartLine(calculateDailySale(res.data));
  };
  const fetchStatisticalOrder = async (access_token) => {
    const res = await OrderServices.statisticalOrder(access_token);
    if (res && res?.data && res?.data?.length > 0) {
      const dataPie = [];
      res.data.map((item) => {
        dataPie.push({
          name: item?.category_name,
          value: Number(item?.total_quantity_sold),
        });
      });
      setDataPieChart(dataPie);
    }
  };

  useEffect(() => {
    if (user && user?.access_token) {
      fetchProducts();
      fetchCategories();
      fetchUsers(user.access_token);
      fetchOrders(user.access_token);
      fetchStatisticalOrder(user.access_token);
    }
  }, [user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderCustomizedLegend = (value, entry, index) => {
    return (
      <span style={{ color: COLORS[index % COLORS.length], fontWeight: 'bold' }}>
        {value}
      </span>
    );
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <div className="text-[20px] font-semibold">Thống kê</div>
      </div>
      <div className="grid grid-cols-4 gap-4 pb-4">
        <div className="border-gray-400 rounded-lg border-[1px] p-4 mt-3">
          <div className="flex justify-between">
            <div className="text-[16px] font-bold">Sản phẩm</div>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1 className="text-[16px] font-medium">{products?.length}</h1>
        </div>
        <div className="border-gray-400 rounded-lg border-[1px] p-4">
          <div>
            <div className="text-[16px] font-bold">Danh mục</div>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1 className="text-[16px] font-medium">{categories?.length}</h1>
        </div>
        <div className="border-gray-400 rounded-lg border-[1px] p-4">
          <div>
            <div className="text-[16px] font-bold">Khánh hàng</div>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1 className="text-[16px] font-medium">{users?.length}</h1>
        </div>
        <div className="border-gray-400 rounded-lg border-[1px] p-4">
          <div>
            <div className="text-[16px] font-bold">Đơn hàng</div>
            <FaShoppingCart className="card_icon" />
          </div>
          <h1>{orders?.length}</h1>
        </div>
      </div>
      <div className="text-[20px] font-semibold">Thống kê doanh thu</div>
      <div className="grid grid-cols-4">
        <div  className="border-gray-400 rounded-lg border-[1px] p-4 mt-3">
          <div className="text-[16px] font-bold">Doanh thu</div>
          <FaDollarSign className="card_icon" />
          <div className="text-[16px] font-medium">{convertToMonney(sales)}</div>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400} className="mt-10">
          <LineChart
            width={500}
            height={300}
            data={dataChartLine}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sale"
              stroke="#EE4E4E"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h1 className="mt-10">THỐNG KÊ SỐ LƯỢNG BÁN</h1>
      <div>
        <ResponsiveContainer width="100%" height={400} className={"mb-10"}>
   
    <PieChart width={400} height={400}>
      <Pie
        data={dataPieChart}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={120}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {dataPieChart.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        verticalAlign="middle" 
        align="left"
        iconType="circle"
        formatter={renderCustomizedLegend}
        layout="vertical" 
      />

    </PieChart>


        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashboard;
