import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Historical Figures Chat</h1>
        <Link href="/chat">
          <h2 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Start Chatting
          </h2>
        </Link>
      </div>
    </div>  
  );
}
