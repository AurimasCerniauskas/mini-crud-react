import { useEffect } from "react";
import { useState } from "react";

function Msg({setModalData, modalData, setDeleteData, setEditData}) {

  const [type, setType] = useState('');
  const [svoris, setSvoris] = useState('');

  useEffect(()=>{
  if(modalData === null){
    return;
  }
  setType(modalData.type);
  setSvoris(modalData.svoris);

  }, [modalData])

  const save = () =>{
    setEditData({
      type,
      svoris,
      id: modalData.id
    });
    setModalData(null);
  }
  const dest = () =>{
    setDeleteData(modalData);
    setModalData(null);
  }


  if (modalData === null) {
    return null;
}

  return (
    <div className="edit-modal">
      <div className="edit-form">
        <input type="text" value={type} onChange={e =>setType(e.target.value)} />
        <input style={{width: '30%', display: 'inline'}} type='number' value={svoris} onChange={e => setSvoris(e.target.value)} />kg
      </div>
      <div>
        <button onClick={save}>Save</button>
        <button onClick={dest}>Delete</button>
        <button onClick={() => setModalData(null)}>Cancel</button>
      </div>
    </div>
  );
}

export default Msg;
