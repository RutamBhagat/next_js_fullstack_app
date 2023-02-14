import { Inter } from "@next/font/google";
import FormInput from "./components/FormInput";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
   return (
      <main className="bg-white min-h-screen">
         <div className="flex justify-end">
            <div className="w-96">
               <FormInput />
            </div>
         </div>
         <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
               <div className="flex flex-wrap justify-center -m-4">
               </div>
            </div>
         </section>
      </main>
   );
}
