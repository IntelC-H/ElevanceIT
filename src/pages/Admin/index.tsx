import { useAuthStore } from "~/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import JobList from "../../components/Admin/JobList";
import Header from "~/components/Header";
import SearchBar from "~/components/Search";

const AdminDashboard = () => {

  const router = useRouter();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    console.log('token in dashboard', token)
    if (!token) {
      router.push("/signin");
      return;
    }
  }, [])

  return (
    <div className="">
      <Header />
      <div className="flex items-center justify-center my-4">
        <SearchBar />
      </div>
      <div className="mx-8 mt-12">
        <JobList />
      </div>
    </div>
  );
};

export default AdminDashboard;
