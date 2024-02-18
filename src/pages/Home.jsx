import shirt from "../assets/home/shirt.png";
import companies from "../assets/home/companies.jpg";
import onlineshopping from "../assets/home/onlineshopping.svg";
import chat from "../assets/home/chat.png";
import chatbot from "../assets/home/chatbot.png";
import company from "../assets/home/company.png";
import filter from "../assets/home/filter.png";
import product from "../assets/home/product.png";
import review from "../assets/home/review.png";
import mail from "../assets/home/mail.png";
import linkedin from "../assets/home/linkedin.png";
import instagram from "../assets/home/instagram.png";
import whatsapp from "../assets/home/whatsapp.png";
import Layout from "../components/Layout/Layout";
import ChatBotComponent from "../components/Chatbot/ChatbotComponent";
import PipeImg from "../assets/pipe.jpg"
import SheetImg from "../assets/sheet.png"
import BarsImg from "../assets/tmt-bars.png"
import SinkImg from "../assets/stainlesssink.png"
import rollImg from "../assets/packaging-foam-roll.jpg"
import CpvcImg from "../assets/CPVC-Left.png"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <ChatBotComponent />
      {/* Button section */}
      <div className="flex justify-center sticky top-0 bg-white py-2 z-20">
        <button onClick={() => navigate("/products")} className="font-semibold border-2 shadow-sm shadow-gray-500 px-3 mx-6 cursor-pointer flex relative">
          Product
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
          </div>
        </button>
        <button onClick={() => navigate("/products")}  className="font-semibold border-2 shadow-sm shadow-gray-500 px-3 mx-6 cursor-pointer flex relative">
          Product
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
          </div>
        </button>
        <button onClick={() => navigate("/products")}  className="font-semibold border-2 shadow-sm shadow-gray-500 px-3 mx-6 cursor-pointer flex relative">
          Product
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
          </div>
        </button>
      </div>
      {/* Main section */}
      <div className="h-[400px] w-[95%] flex justify-between mx-auto bg-slate-100 mt-8 shadow-md shadow-gray-500">
        <div className="my-auto ml-4">
          <h1 className="text-3xl font-semibold">Welcome to</h1>
          <h1 className="text-3xl font-bold">UDHYAM CONNECT!!</h1>
          <p className="mt-2 text-lg">Transforming Enterprises, Uniting Buisnesses</p>
        </div>
        <div>
          <img src={onlineshopping} height="550px" width="550px"></img>
        </div>
      </div>

      {/* Block information */}
      <div className="w-[100%] mx-auto">
        <h1 className="text-2xl font-bold text-center mt-10">WE PROVIDE</h1>
        <div className="grid grid-cols-3 w-[80%] mx-auto mt-10 leading-7">
          <div className="h-[200px] w-[250px] bg-slate-100 mb-5 shadow-md shadow-gray-500  mx-auto transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105">
            <div className="h-[45px] w-[45px] bg-violet-200 rounded-full mx-auto mt-3 pt-1">
              <img
                src={chat}
                height="40px"
                width="40px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[102px]">Chat</h2>
            <p className="text-center mt-3">Connecting Enterprises Securely</p>
          </div>
          <div className="h-[200px] w-[250px] bg-slate-100 mb-5 shadow-md shadow-gray-500  mx-auto  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 ">
            <div className="h-[45px] w-[45px] bg-violet-200 rounded-full mx-auto mt-3 pt-1">
              <img
                src={chatbot}
                height="35px"
                width="35px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[84px]">Chat-bot</h2>
            <p className="text-center mt-3">
              An AI powered chat bot to get to your queries at the earliest
            </p>
          </div>
          <div className="h-[200px] w-[250px] bg-slate-100 mb-5 shadow-md shadow-gray-500  mx-auto  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 ">
            <div className="h-[45px] w-[45px] bg-violet-200 rounded-full mx-auto mt-3 pt-1">
              <img
                src={company}
                height="35px"
                width="35px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[82px]">Company</h2>
            <p className="text-center mt-3">
              Find your choice of deals and collaborations
            </p>
          </div>
          <div className="h-[200px] w-[250px] bg-slate-100 shadow-md shadow-gray-500  mx-auto  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 ">
            <div className="h-[45px] w-[45px] bg-violet-200 rounded-full mx-auto mt-3 pt-2">
              <img
                src={filter}
                height="35px"
                width="35px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[102px]">Filter</h2>
            <p className="text-center mt-3">
              Strain products by your prefrences
            </p>
          </div>
          <div className="h-[200px] w-[250px] bg-slate-100 shadow-md shadow-gray-500  mx-auto  transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 ">
            <div className="h-[45px] w-[45px] bg-violet-300 rounded-full mx-auto mt-3 pt-2">
              <img
                src={product}
                height="30px"
                width="30px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[87px]">Products</h2>
            <p className="text-center mt-3">
              Land on your choice of products without any Hustle-Bustle
            </p>
          </div>
          <div className="h-[200px] w-[250px] bg-slate-100 shadow-md shadow-gray-500  mx-auto transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 ">
            <div className="h-[45px] w-[45px] bg-violet-300 rounded-full mx-auto mt-3 pt-2">
              <img
                src={review}
                height="25px"
                width="25px"
                className="mx-auto"
              ></img>
            </div>
            <h2 className="mt-3 text-xl font-semibold ml-[92px]">Review</h2>
            <p className="text-center mt-3">
              Empowering your voice, reviewing made easy.
            </p>
          </div>
        </div>
      </div>
      {/* Product section */}
      <div className="mt-10">
        <div className="text-center font-bold text-2xl">
          PRODUCTS SIMILAR TO YOU
        </div>
        {/* Product container */}
        <div>
          <div className="grid grid-cols-3 w-[80%] mx-auto mt-10 leading-7">
            <div className="mx-auto cursor-pointer">
              <img
                src={PipeImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">Pipe</p>
              <p>
                Rupees <span className="font-bold text-green-700">750</span>/-
              </p>
              <p className="text-green-700">Available</p>
              <p className="text-red-700">One stock left</p>
            </div>
            <div className="mx-auto cursor-pointer">
              <img
                src={SheetImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">Sheet</p>
              <p>
                Rupees <span className="font-bold text-green-700">400</span>/-
              </p>
              <p className="text-green-700">Available</p>
            </div>
            <div className="mx-auto cursor-pointer">
              <img
                src={BarsImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">Iron Bars</p>
              <p>
                Rupees <span className="font-bold text-green-700">900</span>/-
              </p>
              <p className="text-green-700">Available</p>
              <p className="text-red-700">One stock left</p>
            </div>
            <div className="mx-auto cursor-pointer">
              <img
                src={SinkImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">Sink</p>
              <p>
                Rupees <span className="font-bold text-green-700">1500</span>/-
              </p>
              <p className="text-green-700">Available</p>
            </div>
            <div className="mx-auto cursor-pointer">
              <img
                src={rollImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">Foam Roll</p>
              <p>
                Rupees <span className="font-bold text-green-700">350</span>/-
              </p>
              <p className="text-green-700">Available</p>
              <p className="text-red-700">One stock left</p>
            </div>
            <div className="mx-auto cursor-pointer">
              <img
                src={CpvcImg}
                height="200px"
                width="200px"
                className="shadow-md shadow-gray-500 "
              ></img>
              <p className="font-bold mt-2">CPVC</p>
              <p>
                Rupees <span className="font-bold text-green-700">600</span>/-
              </p>
              <p className="text-green-700">Available</p>
            </div>
          </div>
        </div>
      </div>
      {/* Company section */}
      <div>
        <h1 className="font-bold text-2xl text-center mt-9">COMMUNITY</h1>
        <div className="h-[250px] w-[80%] bg-slate-200 mx-auto mt-7 shadow-md shadow-gray-500 relative flex">
          <div className="my-auto pl-12">
            <h1 className="font-bold text-3xl">10K+ and counting...</h1>
            <h2 className="font-semibold text-lg">
              Community of 10K+ Enterprises
            </h2>
            <p>
              Connect with us and <span>GROW</span> your business
            </p>
            <p>Register now!</p>
            <button>Sign up</button>
          </div>
          <div className="absolute right-0">
            <img
              src={companies}
              height="220px"
              width="220px"
              className="m-2 mt-4"
            ></img>
          </div>
        </div>
      </div>
      {/* Footer section
      {/* <div className="h-[300px]  w-[100%] bg-slate-300 mt-12 flex relative">
        <div className="text-3xl font-bold pt-32 ml-12">Udhyam Connect</div>
        <div>
          <div>
            <div className="flex">
              <img src={mail} className="pl-[200px] mt-20"></img>
              <h2 className="mt-[90px] ml-2">udhyamconnect.gmail.com</h2>
            </div>
            <div className="flex">
              <img src={linkedin} className="pl-[200px] mt-16"></img>
              <h2 className="mt-20 ml-2">UdhyamConnect</h2>
            </div>
          </div>
          <div className="absolute right-[20px] top-[0px]">
            <div className="flex">
              <img src={whatsapp} className="pl-[200px] mt-20"></img>
              <h2 className="mt-[90px] ml-2">udhyamconnect.gmail.com</h2>
            </div>
            <div className="flex">
              <img src={instagram} className="pl-[200px] mt-16"></img>
              <h2 className="mt-20 ml-2">UdhyamConnect</h2>
            </div>
          </div>
        </div>
      </div> */} 
    </Layout>
  );
};
export default Home;
