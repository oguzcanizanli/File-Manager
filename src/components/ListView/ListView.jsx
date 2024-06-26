import "./ListView.styles.css";
import { useView } from "../../context/ViewContext/ViewContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFolderQuery } from "../../queries/useFoldersQuery";
import ListViewItem from "./ListViewItem";

// eslint-disable-next-line react/prop-types
const ListView = ({ files, folders }) => {
  const navigate = useNavigate();

  const params = useParams();
  const folder = useFolderQuery(params.id);

  const { clear, setSelection } = useView();

  const bulk = (e) => {
    const value = e.target.checked;

    if (value) {
      setSelection([...(folders || []), ...(files || [])]);
    } else {
      clear();
    }
  };

  return (
    <div className="listView">
      <div className="listViewTitle">
        <input type="checkbox" onChange={bulk} />
        <span>Name</span>
      </div>

      <div
        className="listViewItem"
        onDoubleClick={() => {
          clear();
          navigate("/folder/" + folder.find.data.parentId || "null");
        }}
      >
        <img
          src="/blue-folder.svg"
          alt="Blue Folder"
          style={{ marginLeft: 28 }}
        />
        <span>..</span>
      </div>

      {[...(folders || []), ...(files || [])].map((item) => {
        return <ListViewItem item={item} />;
      })}
    </div>
  );
};

export default ListView;
