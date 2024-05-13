import ImgShowComponent from "../ImgShowComponent/ImgShowComponent";
import InfoProductComponent from "../InfoProductComponent/InfoProductComponent";
import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import WarrantyComponent from "../WarrantyComponent/WarrantyComponent";
import * as Productservices from "../../services/productServices.js";
import * as CategoryServices from "../../services/categoryServices.js";
import Loading from "../Loading/LoadingComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "../Breadcrumb/Breadcrumb.jsx";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../hooks/userMutationHook.js";
import { AiOutlineLike } from "react-icons/ai";
import "animate.css";
import { useSelector } from "react-redux";
import { convertDateTime } from "../../ultils.js";
import logo from "../../assets/images/logo-2.png";
import Pagination from "../Pagination/Pagination.jsx";

const ProductDetailsComponent = ({ idProduct }) => {
  const user = useSelector((state) => state.user);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isShowComment, setIsShowComment] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchProduct = async () => {
    const res = await Productservices.getDetailProduct(idProduct);
    return res;
  };
  const queryProduct = useQuery({
    queryKey: ["productDetail", idProduct],
    queryFn: fetchProduct,
    retry: 3,
    retryDelay: 1000,
    onError: (error) => {
      console.log("Error fetching product:", error);
      // Handle error here if needed
    },
  });

  const { data: product, isLoading } = queryProduct;

  const productConfig = product && JSON.parse(product?.data[0]?.configuration);

  const fetchCategory = async () => {
    const categoryId = product.data[0].category_id;
    const res = await CategoryServices.getCategory(categoryId);
    return res;
  };

  useEffect(() => {
    async function fetchCate() {
      const res = await fetchCategory();
      setCategoryName(res.category[0].name);
      setCategoryId(res.category[0].id);
    }
    if (product) fetchCate();
  }, [product, idProduct]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paths = [
    { name: "Home", url: "/" },
    { name: categoryName, url: `/product/category/${categoryId}` },
    { name: product?.data[0].name },
  ];

  const mutation = useMutationHook(async (data) => {
    const res = await Productservices.createComment(data);
    return res;
  });

  const mutationReplyComment = useMutationHook(async (data) => {
    const res = await Productservices.ReplyComment(data);

    return res;
  });

  const { data, isPending, isError } = mutation;
  const {
    data: dataReplyComment,
    isPending: isPendingReply,
    isError: isErrorReply,
  } = mutationReplyComment;

  useEffect(() => {
    if (data && data.status === "OK") {
      setIsShowComment(false);
      setComment("");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }
  }, [isPending, isError]);

  useEffect(() => {
    if (dataReplyComment && dataReplyComment.status === "OK") {
      setReplyingToComment(null);
      setReplyText("");
    }
  }, [isPendingReply, isErrorReply]);

  const handleComment = async () => {
    const data = {
      product_id: idProduct,
      content: comment,
      name: name,
      phone: phone,
      email: email,
      rating: rating,
    };
    const res = await mutation.mutateAsync(data);
    setMessage(res?.message);
  };

  const fetchComment = async () => {
    const res = await Productservices.getAllComment(idProduct, pageNumber);
    console.log(res);
    return res;
  };

  const [commentsFetch, setCommentsFetch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCommentsFetch(await fetchComment());
    }
    fetchData();
  }, [pageNumber, data, dataReplyComment]);

  // trả lời comment
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [replyText, setReplyText] = useState("");

  //Xử lý việc hiện ô trả lời
  const handleReply = (commentId) => {
    setReplyingToComment(commentId);
  };

  const handleReplyComment = (comment_id) => {
    const data = {
      user_id: user?.id,
      comment_id: comment_id,
      content: replyText,
    };

    mutationReplyComment.mutateAsync(data);
  };

  const handleGetPageNumber = (pageNumber) => {
    setPageNumber(pageNumber);
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Breadcrumb paths={paths} categoryName={categoryName} />
        {/* Header */}
        <div className="my-5 flex justify-between">
          <span className="text-2xl ">{product?.data[0].name}</span>
          <div className="flex items-center">
            <span className="mr-2 flex items-center text-primary">
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar /> <FaRegStarHalfStroke />
            </span>
            <span className="text-sm opacity-80">
              ({commentsFetch?.data?.length} Đánh giá)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-x-4">
          <div className="col-span-3">
            <ImgShowComponent imgs={product?.data[0]?.images.split(",")} />
          </div>
          <div className="col-span-4">
            <InfoProductComponent product={product?.data[0]} />
          </div>
          <div className="col-span-3">
            <div className=" rounded-md border p-2">
              <h3 className="font-semibold">Thông số kĩ thuật</h3>
              <ul className="boder mt-2 overflow-hidden rounded-md">
                <li className=" flex bg-[#F2F2F2] px-2 py-3">
                  <span className="flex-1">Kích thước màn hình </span>
                  <span className="flex-1">{productConfig?.ScreenSize}</span>
                </li>
                <li className="flex  px-2 py-3">
                  <span className="flex-1">Công nghệ màn hình </span>
                  <span className="flex-1">
                    {productConfig?.ScreenTechnology}
                  </span>
                </li>
                <li className="flex bg-[#F2F2F2] px-2 py-3">
                  <span className="flex-1">Camera sau </span>
                  <span className="flex-1">{productConfig?.AfterCamera}</span>
                </li>
                <li className="flex  px-2 py-3">
                  <span className="flex-1">Camera trước </span>
                  <span className="flex-1">{productConfig?.BeforeCamera} </span>
                </li>
                <li className="flex bg-[#F2F2F2] px-2 py-3">
                  <span className="flex-1">Chipset </span>
                  <span className="flex-1">{productConfig?.Chipset} </span>
                </li>
                <li className="flex  px-2 py-3">
                  <span className="flex-1">Dung lượng Ram </span>
                  <span className="flex-1">{productConfig?.Ram} </span>
                </li>
                <li className="flex bg-[#F2F2F2] px-2 py-3">
                  <span className="flex-1">Bộ nhớ trong </span>
                  <span className="flex-1">{productConfig?.Storage} </span>
                </li>
                <li className=" flex px-2 py-3">
                  <span className="flex-1">Pin </span>
                  <span className="flex-1">{productConfig?.Battery} </span>
                </li>
                <li className="flex bg-[#F2F2F2] px-2 py-3">
                  <span className="flex-1">Hệ điều hành </span>
                  <span className="flex-1">
                    {productConfig?.OperatingSystem}
                  </span>
                </li>
                <li className="flex  px-2 py-3">
                  <span className="flex-1">Độ phân giải màn hình </span>
                  <span className="flex-1">
                    {productConfig?.ScreenResolution}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Đánh giá */}
        <div className="mt-5 grid grid-cols-4 gap-x-4">
          <div className="col-span-3">
            <div className="grid h-36 grid-cols-4">
              <div className="col-span-1 grid gap-y-3 border py-10 text-center">
                <p className="text-xl">5/5</p>
                <p className="flex justify-center">
                  <span className="mr-2 flex items-center text-primary">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <IoIosStar
                          size={"1.5rem"}
                          key={index}
                          style={{
                            color:
                              ratingValue <= rating ? "#978535" : "#a29e9e",
                          }}
                        />
                      );
                    })}
                  </span>
                </p>
                <p>{commentsFetch?.data?.length} đánh giá và hỏi đáp</p>
              </div>
              <div className="col-span-2 flex flex-col justify-evenly border p-4">
                <p className="flex items-center gap-x-2">
                  <span>5 Sao</span>
                  <span className="relative h-2 min-w-[350px] overflow-hidden rounded-md bg-[#f5f5f5]">
                    <span
                      className={`absolute left-0 top-0 h-full w-[${
                        commentsFetch?.data?.filter(
                          (comment) => comment.rating === 5,
                        ).length *
                          10 >
                        100
                          ? 100
                          : commentsFetch?.data?.filter(
                              (comment) => comment.rating === 5,
                            ).length * 10
                      }%] rounded-md bg-primary`}
                    ></span>
                  </span>
                  <span className="inline-block ">
                    {
                      commentsFetch?.data?.filter(
                        (comment) => comment.rating === 5,
                      ).length
                    }
                  </span>
                </p>
                <p className="flex items-center gap-x-2">
                  <span>4 Sao</span>
                  <span className="relative h-2 min-w-[350px] overflow-hidden rounded-md bg-[#f5f5f5]">
                    <span
                      className={`absolute left-0 top-0 h-full w-[${
                        commentsFetch?.data?.filter(
                          (comment) => comment.rating === 4,
                        ).length *
                          10 >
                        100
                          ? 100
                          : commentsFetch?.data?.filter(
                              (comment) => comment.rating === 4,
                            ).length * 10
                      }%] rounded-md bg-primary`}
                    ></span>
                  </span>
                  <span className="inline-block ">
                    {
                      commentsFetch?.data?.filter(
                        (comment) => comment.rating === 4,
                      ).length
                    }
                  </span>
                </p>
                <p className="flex items-center gap-x-2">
                  <span>3 Sao</span>
                  <span className="relative h-2 min-w-[350px] overflow-hidden rounded-md bg-[#f5f5f5]">
                    <span
                      className={`absolute left-0 top-0 h-full w-[${
                        commentsFetch?.data?.filter(
                          (comment) => comment.rating === 3,
                        ).length *
                          10 >
                        100
                          ? 100
                          : commentsFetch?.data?.filter(
                              (comment) => comment.rating === 3,
                            ).length * 10
                      }%] rounded-md bg-primary`}
                    ></span>
                  </span>
                  <span className="inline-block ">
                    {
                      commentsFetch?.data?.filter(
                        (comment) => comment.rating === 3,
                      ).length
                    }
                  </span>
                </p>
                <p className="flex items-center gap-x-2">
                  <span>2 Sao</span>
                  <span className="relative h-2 min-w-[350px] overflow-hidden rounded-md bg-[#f5f5f5]">
                    <span
                      className={`absolute left-0 top-0 h-full w-[${
                        commentsFetch?.data?.filter(
                          (comment) => comment.rating === 2,
                        ).length *
                          10 >
                        100
                          ? 100
                          : commentsFetch?.data?.filter(
                              (comment) => comment.rating === 2,
                            ).length * 10
                      }%] rounded-md bg-primary`}
                    ></span>
                  </span>
                  <span className="inline-block ">
                    {
                      commentsFetch?.data?.filter(
                        (comment) => comment.rating === 2,
                      ).length
                    }
                  </span>
                </p>
                <p className="flex items-center gap-x-2">
                  <span>1 Sao</span>
                  <span className="relative h-2 min-w-[350px] overflow-hidden rounded-md bg-[#f5f5f5]">
                    <span
                      className={`absolute left-0 top-0 h-full w-[${
                        commentsFetch?.data?.filter(
                          (comment) => comment.rating === 1,
                        ).length *
                          10 >
                        100
                          ? 100
                          : commentsFetch?.data?.filter(
                              (comment) => comment.rating === 1,
                            ).length * 10
                      }%] rounded-md bg-primary`}
                    ></span>
                  </span>
                  <span className="inline-block ">
                    {
                      commentsFetch?.data?.filter(
                        (comment) => comment.rating === 1,
                      ).length
                    }
                  </span>
                </p>
              </div>
              <div className="col-span-1 flex  items-center justify-center border text-center">
                <div>
                  <p>Bạn có vấn đề cần tư vấn</p>
                  <button
                    className=" rounded bg-primary px-5 py-2 text-white"
                    onClick={() => {
                      if (isShowComment) {
                        setComment("");
                        setName("");
                        setPhone("");
                        setEmail("");
                        setMessage("");
                      }
                      setIsShowComment(!isShowComment);
                    }}
                  >
                    Gửi câu hỏi
                  </button>
                </div>
              </div>
            </div>
            {isShowComment && (
              <Loading isLoading={isPending}>
                <div className="animate__zoomIn animate__animated  relative mt-10 grid gap-y-3 border bg-[#f5f5f5] p-3">
                  <p>Bạn muốn đánh giá sản phẩm bao nhiêu sao?</p>
                  <p>
                    <span className="mr-2 flex items-center ">
                      {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          <IoIosStar
                            size={"1.5rem"}
                            key={index}
                            style={{
                              color:
                                ratingValue <= rating ? "#978535" : "#a29e9e",
                            }}
                            onClick={() => setRating(ratingValue)}
                          />
                        );
                      })}
                    </span>
                  </p>
                  <textarea
                    type="text"
                    className="px-2 py-1  outline-none"
                    placeholder="Mời bạn để lại đánh giá,bình luận (Vui lòng nhập tiếng việt có dấu)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-2 py-1  outline-none"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-2 py-1  outline-none"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    type="text"
                    className="px-2 py-1  outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="flex justify-end gap-x-2">
                    <button
                      className="rounded px-3 py-1 text-primary"
                      onClick={() => {
                        setIsShowComment(!isShowComment);
                        setComment("");
                        setName("");
                        setPhone("");
                        setEmail("");
                        setMessage("");
                      }}
                    >
                      Hủy
                    </button>
                    <button
                      className="rounded border bg-primary px-3 py-1 text-white"
                      onClick={handleComment}
                    >
                      Gửi
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 text-red-600">
                    {message}
                  </span>
                </div>
              </Loading>
            )}

            {/* Các comment */}
            <div className="mb-3">
              {commentsFetch &&
                commentsFetch?.data?.length > 0 &&
                commentsFetch?.data?.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <div>
                        <div className=" mt-10 flex py-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center bg-[#ebe9eb] ">
                            {comment.name.split("")[0].toUpperCase()}
                          </div>
                          <div className="grid flex-1 gap-y-4 pr-3">
                            <div className="flex justify-between">
                              <div>
                                <span className="mr-3">{comment.name}</span>
                                <span>{comment.phone}</span>
                              </div>
                              <span className="mr-2 flex items-center">
                                {[...Array(5)].map((star, index) => {
                                  const ratingValue = index + 1;
                                  return (
                                    <IoIosStar
                                      size={"1rem"}
                                      key={index}
                                      style={{
                                        color:
                                          ratingValue <= comment.rating
                                            ? "#978535"
                                            : "#a29e9e",
                                      }}
                                    />
                                  );
                                })}
                              </span>
                            </div>
                            <span>{comment.content}</span>
                            <div>
                              <span className="mr-2">
                                <AiOutlineLike
                                  style={{ display: "inline-block" }}
                                />{" "}
                                2 Thích
                              </span>
                              <span className="mr-2">
                                {convertDateTime(comment.created_at).time}
                              </span>
                              <span className="mr-2">
                                {convertDateTime(comment.created_at).day}
                              </span>
                              {comment.reply_content === null &&
                                user?.isAdmin === 1 && (
                                  <span
                                    className=" cursor-pointer text-red-400"
                                    onClick={() => handleReply(comment.id)}
                                  >
                                    Trả lời
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>
                        {replyingToComment === comment.id && (
                          <div className="mb-1 flex">
                            <input
                              type="text"
                              placeholder="Câu trả lời"
                              className="flex-1 border border-primary px-2 py-1 outline-none"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            ></input>
                            <button
                              className="ml-2 rounded bg-primary px-2 py-1 text-white"
                              onClick={() => handleReplyComment(comment.id)}
                            >
                              Gửi
                            </button>
                          </div>
                        )}
                      </div>
                      {/* Phản hổi của admin */}
                      {comment.admin_name != null && (
                        <div className="relative flex border bg-[#f8f8f8] px-2 py-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center bg-[#ebe9eb] ">
                            <img src={logo} alt="M" />
                          </div>
                          <div className="grid flex-1 gap-y-4 pr-3">
                            <div className="flex justify-between">
                              <div>
                                <span className="mr-3">
                                  {comment.admin_name}
                                </span>
                                <span className="rounded bg-primary px-1 text-white">
                                  Quản trị viên
                                </span>
                              </div>
                            </div>
                            <span>{comment.reply_content}</span>
                            <div>
                              <span className="mr-2">
                                <AiOutlineLike
                                  style={{ display: "inline-block" }}
                                />{" "}
                                2 Thích
                              </span>
                              <span className="mr-2">
                                {convertDateTime(comment.created_at_reply).time}
                              </span>
                              <span className="mr-2">
                                {convertDateTime(comment.created_at_reply).day}
                              </span>
                            </div>
                          </div>
                          <span className="absolute bottom-full left-4 border-[10px] border-[#f8f8f8] border-l-transparent border-r-transparent border-t-transparent "></span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Phân trang*/}
            {commentsFetch?.pagination?.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  totalPage={commentsFetch?.pagination?.totalPages}
                  getPageNumber={handleGetPageNumber}
                />
              </div>
            )}
          </div>
          <div className="col-span-1 rounded-md p-2">
            <WarrantyComponent />
          </div>
        </div>
      </Loading>
    </>
  );
};

export default ProductDetailsComponent;
