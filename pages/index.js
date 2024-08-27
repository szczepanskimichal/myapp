import Header from "../components/Header";
import Featured from "../components/Featured";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-screen flex flex-col">
        <Header />
        <Featured />
      </div>
    </div>
  );
}
