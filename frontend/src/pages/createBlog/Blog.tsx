import React, { useState } from "react";
import docsIcon from "../../assets/images/docsIcon.png";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar";

type Props = {};

const Blog = (props: Props) => {
  const location = useLocation();
  const { blogdata, images } = location.state;
  const blogData = JSON.parse(blogdata);
  const imageArray = images.data;
  const [count, setCount] = useState(0);

  const addImage = (imageArray: { url: string }[], val: number) => {
    if (val - 1 < imageArray.length) {
      console.log(val - 1, imageArray.length);
      const image = imageArray[val - 1].url;
      return <img src={image} alt="image" width={300} className="mx-auto" />;
    }
  };

  //@ts-ignore
  const renderBlogData = (
    blogDataItem: {
      type: string;
      text: string[];
      questions: string[];
      answers: string[];
      headerStrong?: string;
      header?: string;
    },
    imageArray: { url: string }[],
    val: number
  ) => {
    if (blogDataItem) {
      switch (blogDataItem.type) {
        case "title":
          return (
            <h1 className="text-4xl mt-8 mb-7 font-black">
              {blogDataItem.text[0]}
            </h1>
          );
        case "para":
          return (
            <div className="my-12">
              {blogDataItem.header && (
                <p className="text-2xl font-semibold ml-5">
                  {blogDataItem.header}
                </p>
              )}
              {blogDataItem.headerStrong && (
                <p className="text-3xl font-bold mt-10 mb-5">
                  {blogDataItem.headerStrong}
                </p>
              )}
              <div className="flex gap-10">
                <div>
                  {blogDataItem.text.map((sentence) => (
                    <p className="ml-5 my-3 text-lg font-light">{sentence}</p>
                  ))}
                </div>
              </div>
            </div>
          );
        case "unordered list":
          return (
            <div className="my-12">
              {blogDataItem.header && (
                <p className="text-2xl font-semibold">{blogDataItem.header}</p>
              )}
              {blogDataItem.headerStrong && (
                <p className="text-3xl font-bold mt-10 mb-5">
                  {blogDataItem.headerStrong}
                </p>
              )}
              <div className="ml-8">
                {blogDataItem.text.map((listItem) => (
                  <li className="text-lg my-3">{listItem}</li>
                ))}
              </div>
            </div>
          );
        case "faq":
          return (
            <div>
              {blogDataItem.header && (
                <p className="text-2xl font-semibold">{blogDataItem.header}</p>
              )}
              {blogDataItem.headerStrong && (
                <p className="text-3xl font-bold mt-10 mb-5">
                  {blogDataItem.headerStrong}
                </p>
              )}
              {blogDataItem.questions.map((question, i) => (
                <div className="my-8 ml-5">
                  <p className="text-2xl font-semibold mb-2">{question}</p>
                  <p className="text-xl">{blogDataItem.answers[i]}</p>
                </div>
              ))}
            </div>
          );
      }
    }
  };

  return (
    <>
      <Navbar mode="logged" />
      <section className="lg:mx-52 md:mx-20 mx-5 font-inter">
        <div className="flex flex-wrap gap-5 justify-between items-center border my-10 p-5">
          <div className="bg-red-400 rounded-md p-2 ">
            <img src={docsIcon} alt="Page Icon" width="30" />
          </div>
          <p className="text-sm">{blogData[0].text[0]}</p>
          <p className="text-[#17514b] hover:text-[#2dd4bf] cursor-pointer">
            Repeat
          </p>
        </div>
        <main className="md:mx-14 ">
          <div className="pt-6 pb-4">
            <p className="text-gray-500">Save Blog</p>
          </div>
          {/*@ts-ignore*/}
          {blogData.map((item, val) => renderBlogData(item, imageArray, val))}
          {imageArray && (
            <>
              <h1 className="text-3xl font-bold mt-10 mb-5">Images</h1>
              <div className="flex flex-wrap justify-center gap-10 items-center mb-10">
                {imageArray.map((image: { url: string }) => (
                  <div className="relative w-60 h-60 border group">
                    <a
                      href={image.url}
                      download
                      className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20"
                    >
                      <button className="bg-white font-inter text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300">
                        Download
                      </button>
                    </a>
                    <img
                      src={image.url}
                      alt="image"
                      className="w-60 absolute"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </section>
    </>
  );
};

export default Blog;
