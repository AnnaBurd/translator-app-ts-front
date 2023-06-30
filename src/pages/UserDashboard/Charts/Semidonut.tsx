import "./Semidonut.css";

type SemmidonutProps = {
  fillPercent: number;
};

const Semidonut: React.FC<SemmidonutProps> = ({ fillPercent }) => {
  return (
    <>
      <div
        className="donut"
        style={
          {
            "--donut-fill-percent": fillPercent,
          } as React.CSSProperties
        }
      >
        <span className="donut__overlay"></span>
      </div>
    </>
  );
};

export default Semidonut;
