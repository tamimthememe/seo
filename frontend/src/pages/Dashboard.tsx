import React, { useContext, useEffect } from "react";
import docsIcon from "../assets/images/docsIcon.png";
import { useState } from "react";
import {
  countries,
  languages,
  sizes,
  voices,
  models,
  imageStyles,
  imageSizes,
  yesNo,
  numbers,
} from "../assets/constants/constant";
import axios from "axios";
import Select from "./Dashboard/_components/Select";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./Dashboard/_components/Loading";
import Navbar from "../components/Shared/Navbar";
import { UserContext } from "../providers/userProvider";
import { SubscriptionContext } from "../providers/subscriptionProvider";
import CheckApprovalLoader from "./Dashboard/_components/checkApprovalLoader";

const Dashboard = () => {
  const { userId, updateUserId, isLoggedIn } = useContext(UserContext);
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("english-us");
  const [size, setSize] = useState("600-1200 words, 2-5 H2 headings");
  const [model, setModel] = useState("gpt-4o-mini");
  const [voice, setVoice] = useState("None");
  const [country, setCountry] = useState("usa");
  const [images, setImages] = useState("Yes");
  const [imageSize, setImageSize] = useState("256x256");
  const [numImages, setNumImages] = useState("1");
  const [style, setStyle] = useState("None");
  const [seo, setSeo] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkApproval, setCheckApproval] = useState(false);
  const [payment, setPayment] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [generations, setGenerations] = useState(0);

  const { subscriptionId, plan, updatePlan, updateSubscriptionId } =
    useContext(SubscriptionContext);

  const generateTitle = async () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/chat/title`, {
        prompt: keyword,
      })
      .then((res) => {
        const data = res.data.replace(/['"]+/g, "");
        setTitle(data);
      });
  };

  const generateKeywords = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/chat/keywords`, {
        prompt: title,
      })
      .then((res) => {
        setSeo(res.data);
      });
  };

  const checkApprovalButtonHandler = async () => {
    const checkApproval = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/payment/getSubscriptionApproval`,
      { subId: subscriptionId }
    );

    //@ts-ignore
    if (checkApproval.data != "APPROVAL_PENDING") {
      setCheckApproval(false);
    } else {
      alert("Not Approved");
    }
  };

  useEffect(() => {
    const updateSubs = async () => {
      try {
        console.log("IDHAR");
        if (localStorage.getItem("subscriptionId")) {
          console.log("idhar ni");
          const checkApproval = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/payment/getSubscriptionApproval`,
            { subId: subscriptionId }
          );

          //@ts-ignore
          if (checkApproval === "APPROVAL_PENDING") {
            setCheckApproval(true);
            console.log("Awaiting Approval");
          } else if (!checkApproval) {
            console.log("PLEASE PAY");
          } else {
            setCheckApproval(false);
            let generations;
            if (plan === "Starter") {
              generations = 50;
            } else if (plan === "Professional") {
              generations = 250;
            }
            const res = await axios.put(
              `${import.meta.env.VITE_BACKEND_URL}/updateSub`,
              {
                subscriptionId: subscriptionId,
                subscription: plan,
                userId: userId,
                generations: generations,
              }
            );
          }

          localStorage.removeItem("subscriptionId");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (subscriptionId) {
      const response = updateSubs();

      console.log(response);
    }
  }, [checkApproval, subscriptionId]);

  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        userId: userId,
      });

      setUserDetails(res.data);
      if (!userDetails) {
        navigate("/sign-in");
      }

      if (res.data.generations <= 0) {
        setPayment(true);
      }
      setGenerations(res.data.generations);
    };

    getDetails();
  }, [userId]);

  const navigate = useNavigate();
  const checkPayment = () => {
    navigate("/");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const blogData = {
      title,
      language,
      size,
      voice,
      model,
      country,
      images,
      numImages,
      imageSize,
      style,
      seo,
    };

    if (generations <= 0) {
      setCheckApproval(true);
    } else {
      setLoading(true);
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/updateGen`, {
          userId,
          generations: generations - 1,
        })
        .then((res) => console.log(res.data));

        if (blogData.images == "Yes") {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/chat/create`, { blogData })
          .then((res) => {
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/chat/image`, {
                blogData,
              })
              .then((response) => {
                navigate(`/blog/${userId}`, {
                  state: { blogdata: res.data, images: response.data },
                });
              });
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/chat/create`, { blogData })
          .then((res) => {
            navigate(`/blog/${userId}`, {
              state: { blogdata: res.data, images: [] },
            });
          });
      }
    }
  };

  const renderComps = () => {
    if (loading) {
      return <LoadingSpinner />;
    } else if (checkApproval) {
      return (
        <CheckApprovalLoader
          handleClick={checkApprovalButtonHandler}
          text="Awaiting Approval"
          cta="check Approval"
        />
      );
    } else if (payment) {
      return (
        <CheckApprovalLoader
          handleClick={checkPayment}
          text="Pay to continue"
          cta="Pay from here"
        />
      );
    } else {
      return (
        <>
          <h1 className="my-5 ml-10">Your Plan: {plan ? plan : "Free"}</h1>
          <h1 className="my-5 ml-10">
            Generations Left:
            {/*@ts-ignore*/}
            {userDetails.generations && userDetails.generations}
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="bg-blue-50 w-[80%] mx-auto p-10 rounded-md">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="bg-red-400 rounded-md p-2 ">
                    <img src={docsIcon} alt="Page Icon" width="60" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-semibold font-inter">
                      1-Click Blog Post
                    </h1>
                    <p className="text-xs font-inter mt-2 text-gray-600 ">
                      Generate and publish article in 1 click
                    </p>
                  </div>
                </div>
                <button className="px-12 py-3 gap-10 bg-purple-600 text-white text-xl font-inter rounded-lg">
                  Run
                </button>
              </div>
              <div className="mt-6">
                <div className="flex w-full lg:w-[82%]  justify-between my-2 pl-2 flex-wrap">
                  <label className="required font-inter">Main Keyword</label>
                  <p className="font-inter text-gray-500">
                    {keyword.length}/80
                  </p>
                </div>
                <div className="flex justify-between mb-6 flex-wrap max-lg:gap-6">
                  <input
                    type="text"
                    name="main keyword"
                    className="dashboard-input lg:w-[82%]"
                    placeholder="Enter your main keyword"
                    maxLength={80}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    required
                  />
                  <div
                    className="dashboard-btn flex items-center cursor-pointer hover:text-[#9885fa] hover:border-[#9885fa] px-8 text-md text-[#6a4bff] border border-[#6a4bff] py-2 rounded-md bg-white"
                    onClick={() => generateTitle()}
                  >
                    Generate a Title
                  </div>
                </div>
                <div className="flex w-full justify-between my-2 pl-2">
                  <label className="required font-inter">Title</label>
                  <p className="font-inter text-gray-500">{title.length}/100</p>
                </div>
                <input
                  type="text"
                  name="title"
                  value={title}
                  maxLength={100}
                  className="dashboard-input w-full"
                  placeholder="Enter your blog title here"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-10 mx-auto w-[80%]">
              <h1 className="text-2xl mb-21">Core Settings</h1>
              <div className="flex flex-wrap justify-between">
                <div className="w-[30rem]">
                  <label className="block my-4 font-extralight">Language</label>
                  <Select
                    name="language"
                    className="w-full"
                    options={languages}
                    onChange={(e) => {
                      setLanguage(e);
                    }}
                  />
                </div>
                <div className="w-[30rem]">
                  <label className="block my-4 font-extralight">
                    Article Size
                  </label>
                  <div className="flex gap-6 flex-wrap items-center">
                    <select
                      name="size"
                      className="select"
                      onChange={(e) => {
                        setSize(e.target.value);
                        console.log(size);
                      }}
                    >
                      {sizes.map((item) => (
                        <option
                          value={item.details}
                          className={`font-light p-2 font-${item.color}`}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <div className="p-3 bg-gray-200 rounded-md">
                      <p className="font-extralight text-sm">
                        {sizes.find((item) => item.details === size)?.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-between py-4">
                <div className="w-[30rem]">
                  <label className="block my-4 font-extralight">
                    Tone of Voice
                  </label>
                  <Select
                    name="voice"
                    className="w-full"
                    onChange={(e) => setVoice(e)}
                    options={voices}
                  />
                </div>
                <div className="w-[30rem]">
                  <label className="block my-4 font-extralight">AI Model</label>
                  <div className="flex gap-6 flex-wrap items-center ">
                    <div className="flex justify-between w-full">
                      <Select
                        options={models}
                        className="w-full"
                        name="model"
                        onChange={(e) => {
                          setModel(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[30rem]">
                  <label className="block my-4 font-extralight">
                    Target Country
                  </label>
                  <Select
                    name="country"
                    className="w-full"
                    onChange={(e) => setCountry(e)}
                    options={countries}
                  />
                </div>
              </div>
            </div>
            <div className="p-10 mx-auto w-[80%] bg-yellow-50 rounded-lg">
              <h1 className="text-2xl mb-21">Media Hub</h1>
              <div className="flex flex-wrap justify-between">
                <div className="w-[10rem]">
                  <label className="block my-4 font-extralight">
                    AI Images
                  </label>
                  <Select
                    name="images"
                    className="w-full"
                    onChange={(e) => setImages(e)}
                    options={yesNo}
                  />
                </div>
                <div className="w-[10rem]">
                  <label className="block my-4 font-extralight">
                    Number of Images
                  </label>
                  <Select
                    name="numImages"
                    onChange={(e) => setNumImages(e)}
                    options={numbers}
                  />
                </div>
                <div className="w-[10rem]">
                  <label className="block my-4 font-extralight">
                    Image Style
                  </label>
                  <Select
                    name="imageStyle"
                    options={imageStyles}
                    onChange={(e) => setStyle(e)}
                  />
                </div>
                <div className="w-[10rem]">
                  <label className="block my-4 font-extralight">
                    Image Size
                  </label>
                  <Select
                    name="imageSize"
                    options={imageSizes}
                    onChange={(e) => setImageSize(e)}
                  />
                </div>
              </div>
            </div>
            <div className="p-10 mx-auto w-[80%] rounded-lg">
              <h1 className="text-2xl mb-21">SEO</h1>
              <div className="flex w-full lg:w-[75%]  justify-between my-2 pl-2 flex-wrap">
                <label className="required font-inter">
                  Keywords to include in the text
                </label>
              </div>
              <div className="flex justify-between mb-6 flex-wrap max-lg:gap-6">
                <input
                  type="text"
                  name="main keyword"
                  className="select lg:w-[75%]"
                  placeholder="Enter your main keyword"
                  value={seo}
                  onChange={(e) => setSeo(e.target.value)}
                  required
                />
                <div
                  className="dashboard-btn px-8 text-md text-[#6a4bff] border flex items-center  hover:text-[#9885fa] hover:border-[#9885fa] cursor-pointer  border-[#6a4bff] py-2 rounded-md bg-white"
                  onClick={() => generateKeywords()}
                >
                  Generate Keywords
                </div>
              </div>
            </div>
          </form>
        </>
      );
    }
  };
  return (
    <>
      <Navbar mode="logged" />
      <section className="md:p-10 font-inter">{renderComps()}</section>
    </>
  );
};

export default Dashboard;
