type show = { type: string; name: string };

interface Props {
  setShow: React.Dispatch<React.SetStateAction<show>>;
  show:show
}
const ListShow = ({ setShow,show }: Props) => {
    const colors = ["#ee6a29","#a7c0c7"]

    const buttonColorName = (name:string)=>{
        return show.name!==name ? { cursor:"pointer" } : {cursor:"pointer" , backgroundColor:"#a7c0c7"}
    }

    const buttonColorType = ( type:string)=>{
        return show.type!==type ?{ cursor:"pointer" } : {cursor:"pointer" , backgroundColor:"#ee6a29"}
    }


  return (
    <ul className="list-group list-group-flush flex-row flex-lg-column justify-content-center align-items-center my-2">
      <h6
        className={"list-group-item list-group-item-action "}
        style={buttonColorName('B-P')}
        onClick={() =>
          setShow((prev: show) => {
            return { ...prev, name: "B-P" };
          })
        }
      >
        B-P
      </h6>
      <h6
        className={"list-group-item list-group-item-action "}
        style={buttonColorName('A1C')}
        onClick={() =>
          setShow((prev: show) => {
            return { ...prev, name: "A1C" };
          })
        }
      >
        A1C
      </h6>
      <h6
        className={"list-group-item list-group-item-action mt-lg-5 ml-lg-0 ml-lg-3 "}
        style={buttonColorType("curve")}
        onClick={() =>
          setShow((prev: show) => {
            return { ...prev, type: "curve" };
          })
        }
      >
        Curve
      </h6>
      <h6
        className={"list-group-item list-group-item-action "}
        style={buttonColorType("bar")}
        onClick={() =>
          setShow((prev: show) => {
            return { ...prev, type: "bar" };
          })
        }
      >
        Bar
      </h6>
    </ul>
  );
};

export default ListShow;
