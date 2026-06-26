import { Button } from "@/components/ui/button";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-2xl">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-500/15">
          <SearchX className="h-12 w-12 text-violet-500" />
        </div>


        <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-white">
          404
        </h1>


        <h2 className="mt-3 text-3xl font-bold text-white">Page Not Found</h2>


        <p className="mt-4 leading-7 text-zinc-400">
          Sorry, the page you're looking for doesn't exist, has been moved, or
          the URL may be incorrect.
        </p>

       
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1 bg-violet-600 hover:bg-violet-700"
            onClick={() => navigate("/shop/home")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
