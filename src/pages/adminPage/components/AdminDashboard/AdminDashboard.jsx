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

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>THỐNG KÊ</h3>
      </div>

      <div className="main-cards text-white">
        <div className="card min-h-24">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{products?.length}</h1>
        </div>
        <div className="card min-h-24">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{categories?.length}</h1>
        </div>
        <div className="card min-h-24">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{users?.length}</h1>
        </div>
        <div className="card min-h-24">
          <div className="card-inner">
            <h3>ORDERS</h3>
            <FaShoppingCart className="card_icon" />
          </div>
          <h1>{orders?.length}</h1>
        </div>
      </div>
      <h1>THỐNG KÊ DOANH SỐ</h1>
      <div className="card mt-3 min-h-24 w-1/3 text-white">
        <div className="card-inner">
          <h3>DOANH THU</h3>
          <FaDollarSign className="card_icon" />
        </div>
        <h1>{convertToMonney(sales)}</h1>
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
          <PieChart>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashboard;
