import { Button } from "./ui/button";
import { useAuthStore } from "~/store/useAuthStore";
import { useJobStore } from "~/store/useJobStore";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const { isAdmin, setAdmin } = useAuthStore();
  const router = useRouter();
  const { setOpenJobModal } = useJobStore();
  const handleSignOut = () => {
    localStorage.removeItem('token')
    setAdmin(false);
    router.push("/");
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Job Seeker</h1>
      <div className="flex gap-2">
        <Button variant="blue" onClick={() => setOpenJobModal(true)}>
          Post Job
        </Button>
        {isAdmin ? (
          <Button variant="red" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Button variant="blue" onClick={() => router.push("/signin")}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;