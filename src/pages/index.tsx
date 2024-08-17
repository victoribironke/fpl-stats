import HeadTemplate from "@/components/general/HeadTemplate";
import { alreadyLoggedIn } from "@/components/hoc/ProtectedRoute";
import { ENDPOINTS } from "@/constants/endpoints";
import { PAGES } from "@/constants/pages";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const loginAndSaveUser = async () => {
    setLoading(true);

    const isDev = process.env.NODE_ENV === "development";
    const url = ENDPOINTS.history(value);

    try {
      const res = await fetch(isDev ? url : "/api/main", {
        headers: { url },
      });

      if (!res.ok) {
        toast.error("Invalid team ID.");

        return;
      }

      localStorage.setItem(
        "fpl-stats-user-info",
        JSON.stringify({ team_id: value })
      );
      push(PAGES.dashboard);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadTemplate title="Home" />

      <section className="w-full flex items-center justify-center min-h-screen flex-col gap-4">
        <input
          type="text"
          className="w-full border-2 border-blue rounded-lg px-3 py-2 outline-none max-w-lg"
          placeholder="Team ID..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && loginAndSaveUser()}
        />

        <button
          className="px-3 py-2.5 rounded-md bg-blue text-white w-full max-w-lg disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
          disabled={loading}
          onClick={loginAndSaveUser}
        >
          Login{" "}
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
        </button>

        <p className="text-sm text-gray-500">
          Made by{" "}
          <Link href="https://victoribironke.com" className="underline">
            Victor Ibironke
          </Link>{" "}
        </p>
      </section>
    </>
  );
};

export default alreadyLoggedIn(Home);
