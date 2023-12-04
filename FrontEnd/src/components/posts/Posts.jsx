import Post from "../post/Post";
import Pagination from "../sidebar/pagination/Pagination";
import "./posts.css";

export default function Posts({ posts, currentPage,totalPages,handlePageChange}) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
            <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

    </div>
  );
}
