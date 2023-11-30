import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Learn & Grow</span>
        <span className="headerTitleLg">Blogify</span>
      </div>
      <img
        className="headerImg"
        src="http://localhost:5000/images/1636622981869Blogging-Tips-Build-Archive-Image.jpg"
        alt=""
      />
    </div>
  );
}
