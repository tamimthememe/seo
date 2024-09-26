import { Params, useParams } from "react-router-dom";
import docsIcon from "../assets/images/docsIcon.png";
import { useState } from "react";
import {
  countries,
  languages,
  sizes,
  voices,
  models,
  imageStyles,
  imageSizes
} from "../assets/constants/constant.js";

const Dashboard = () => {
  const { userId }: Readonly<Params<string>> = useParams();
  console.log(userId);

  const [selectedItem, setSelectedItem] = useState("X-small");

  return (
    <section className="p-10 font-inter">
      <form>
        <div className="bg-blue-50 w-[80%] mx-auto p-10 rounded-md">
          <div className="flex items-center justify-between flex-wrap">
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
            <button className="px-12 py-3 bg-purple-600 text-white text-xl font-inter rounded-lg">
              Run
            </button>
          </div>
          <div className="mt-6">
            <div className="flex w-full lg:w-[82%]  justify-between my-2 pl-2 flex-wrap">
              <label className="required font-inter">Main Keyword</label>
              <p className="font-inter text-gray-500">5/80</p>
            </div>
            <div className="flex justify-between mb-6 flex-wrap max-lg:gap-6">
              <input
                type="text"
                name="main keyword"
                className="dashboard-input lg:w-[82%]"
                placeholder="Enter your main keyword"
                required
              />
              <button className="dashboard-btn px-8 text-md text-[#6a4bff] border border-[#6a4bff] py-2 rounded-md bg-white">
                Generate a Title
              </button>
            </div>
            <div className="flex w-full justify-between my-2 pl-2">
              <label className="required font-inter">Title</label>
              <p className="font-inter text-gray-500">44/100</p>
            </div>
            <input
              type="text"
              name="title"
              className="dashboard-input w-full"
              placeholder="Enter your blog title here"
              required
            />
          </div>
        </div>
        <div className="p-10 mx-auto w-[80%]">
          <h1 className="text-2xl mb-21">Core Settings</h1>
          <div className="flex flex-wrap justify-between">
            <div className="w-[30rem]">
              <label className="block my-4 font-extralight">Language</label>
              <select name="language" className="select w-full">
                {languages.map((item: string) => (
                  <option value={item} className="font-light p-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[30rem]">
              <label className="block my-4 font-extralight">Article Size</label>
              <div className="flex gap-6 flex-wrap items-center">
                <select
                  name="size"
                  className="select"
                  onChange={(e) => setSelectedItem(e.target.value)}
                >
                  {sizes.map((item) => (
                    <option
                      value={item.name}
                      className={`font-light p-2 font-${item.color}`}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="p-3 bg-gray-200 rounded-md">
                  <p className="font-extralight text-sm">
                    {sizes.find((item) => item.name === selectedItem)?.details}
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
              <select name="voice" className="select w-full">
                {voices.map((item) => (
                  <option value={item} className="font-light p-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[30rem]">
              <label className="block my-4 font-extralight">AI Model</label>
              <div className="flex gap-6 flex-wrap items-center ">
                <div className="flex justify-between w-full">
                  <select
                    name="model"
                    className="select w-full"
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    {models.map((item) => (
                      <option value={item.name} className={`font-light p-4 `}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-[30rem]">
              <label className="block my-4 font-extralight">
                Target Country
              </label>
              <select name="country" className="select w-full">
                {countries.map((item) => (
                  <option value={item} className="font-light p-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="p-10 mx-auto w-[80%] bg-yellow-50 rounded-lg">
          <h1 className="text-2xl mb-21">Media Hub</h1>
          <div className="flex flex-wrap justify-between">
            <div className="w-[10rem]">
              <label className="block my-4 font-extralight">AI Images</label>
              <select name="language" className="select w-full">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-[10rem]">
              <label className="block my-4 font-extralight">
                Number of Images
              </label>
              <select
                name="numImages"
                className="select"
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="w-[10rem]">
              <label className="block my-4 font-extralight">
                Image Style
              </label>
              <select name="style" className="select">
                {imageStyles.map((item) => (
                  <option value={item} className="font-light p-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[10rem]">
              <label className="block my-4 font-extralight">
                Image Size
              </label>
              <select name="imageSize" className="select">
                {imageSizes.map((item) => (
                  <option value={item} className="font-light p-2">
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
        </div>
        <div className="p-10 mx-auto w-[80%] rounded-lg">
          <h1 className="text-2xl mb-21">SEO</h1>  
          <div className="flex w-full lg:w-[75%]  justify-between my-2 pl-2 flex-wrap">
              <label className="required font-inter">Keywords to include in the text</label>
              <p className="font-inter text-gray-500">5/80</p>
            </div>
            <div className="flex justify-between mb-6 flex-wrap max-lg:gap-6">
              <input
                type="text"
                name="main keyword"
                className="select lg:w-[75%]"
                placeholder="Enter your main keyword"
                required
              />
              <button className="dashboard-btn px-8 text-md text-[#6a4bff] border border-[#6a4bff] py-2 rounded-md bg-white">
                Generate Keywords
              </button>
            </div>        
        </div>
      </form>
    </section>
  );
};

export default Dashboard;
