import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import Pagination from "../../components/sidebar/pagination/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page
  const [totalPages, setTotalPages] = useState(1); // Initialize total pages
  const [limit] = useState(2); // Set the number of items per page
  const { search } = useLocation();

  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts?${search}&page=${currentPage}&limit=${limit}`);
        debugger
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, [search, currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        <Sidebar />
      </div>
    </>
  );
}
