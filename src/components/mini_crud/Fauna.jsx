import { useEffect, useState } from "react";
import { create, destroy, read, update } from "../../function/localStorage";
import rand from "../../function/rand";
import Msg from "./Msg";

const key = "gyv";

function Fauna() {
  const [showData, setShowData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [gyv, setGyv] = useState([]);
  const [select, setSelect] = useState(0);
  const animal = ["avis", "antis", "antilope"];
  const [svoris, setSvoris] = useState(0);
  const [modalData, setModalData] = useState(null);

  const add = () => {
    setGyv((g) => [
      ...[...Array(rand(3, 9))].map(() => ({
        svoris: rand(10, 30),
        type: animal[rand(0, 2)],
      })),
    ]);
  };

  const addOne = () => {
    setGyv((g) => [{ svoris: svoris, type: animal[select - 1] }]);
    setSvoris(0);
    setSelect(0);
  };

  // READ
  useEffect(() => {
    setShowData(read(key));
  }, [lastUpdate]);

  //Delete
  useEffect(() => {
    destroy(key, deleteData.id);
    setLastUpdate(Date.now());
  }, [deleteData]);

  //Edit
  useEffect(() => {
    if (editData === null) {
      return;
    }
    update(key, editData, editData.id);
    setLastUpdate(Date.now());
  }, [editData]);

  const creat = () => {
    gyv.map((g) => create(key, g));
    setLastUpdate(Date.now());
  };

  return (
    <>
      <div className="top-block">
        <button onClick={add}>Pridėti atsitiktinį skaičių gyvūnų</button>
        <select
          style={{ height: "50px" }}
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option>Pasirinkite gyvūną</option>
          <option value="1">Avis</option>
          <option value="2">Antis</option>
          <option value="3">Antilopė</option>
        </select>
        <label style={{ height: "50px" }}>
          Įveskite svorį
          <input
            type="number"
            value={svoris}
            onChange={(e) => setSvoris(e.target.value)}
            style={{ height: "40px", width: "40px", textAlign: "right" }}
          />{" "}
          kg
        </label>
        <button onClick={addOne}>Pridėti pasirinktą gyvūną</button>
        <button onClick={creat}>Pridėti</button>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          flex: "1 1 auto",
          marginTop: "30px",
        }}
      >
        {showData.map((g) => (
          <div onClick={() => setModalData(g)} key={g.id} className={g.type}>
            {g.type} ({g.svoris}kg)
          </div>
        ))}
      </div>
      <Msg
        setModalData={setModalData}
        modalData={modalData}
        setDeleteData={setDeleteData}
        setEditData={setEditData}
      />
    </>
  );
}

export default Fauna;
