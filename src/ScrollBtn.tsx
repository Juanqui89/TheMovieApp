import "./assets/CSS/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const ScrollBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Esto produce un desplazamiento suave
    });
  };

  return (
    <button onClick={scrollToTop} className="arrow">
      <i className="bi bi-arrow-up-circle-fill"></i>
    </button>
  );
};

export default ScrollBtn;
