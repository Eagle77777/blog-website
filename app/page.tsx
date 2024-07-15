import Image from "next/image";
import Posts from "./components/Posts";
import MyProfilePic from "./components/MyProfilePic";

export const revalidate = 10

export default function Home() {
  return (
    <div className="px-6 mx-auto">
      <MyProfilePic/>
    <p className="mt-12 mb-12 text-3xl pl-80 dark:text-white">
        
      <span className="whitespace-nowrap">
         <span className="font-bold">   &nbsp;</span>
      </span>
    </p>
      <Posts/>
    </div>
  );
}
