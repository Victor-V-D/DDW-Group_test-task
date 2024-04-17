import "./Preloader.css";
const Preloader = ({ show }: { show: boolean }) => {
  const classes: string = ["preloader"].concat(show ? "" : "preloader--hide").join(" ");

  return (
    <div className={classes}>
      <div className="loader"></div>
    </div>
  )
}

export default Preloader;