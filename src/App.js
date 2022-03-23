import React, { useState } from "react";
import "./styles.css";

const INITIAL_STATE = [
  { id: 1, baslik: "Alisveris Yap", tamamlandi: false },
  { id: 2, baslik: "Fatura ode", tamamlandi: true },
];

export default function App() {
  const [liste, setListe] = useState(INITIAL_STATE);
  const [yeniGorev, setYeniGorev] = useState("");

  const ekle = () => {
    setListe([
      ...liste,
      { id: Date.now(), baslik: yeniGorev, tamamlandi: false },
    ]);
    setYeniGorev("");
  };

  const handleChange = (event) => {
    setYeniGorev(event.target.value);
  };

  const yapildi = (item) => {
    setListe(
      liste.map((e) =>
        e.id === item.id ? { ...e, tamamlandi: !e.tamamlandi } : e
      )
    );
  };

  
  return (
    <div className="App">
      <h1>Yapılacaklar Listesi</h1>
      <div className="ekleme_formu">
        <input
          value={yeniGorev}
          onChange={handleChange}
          placeholer="listeye ekle"
        />
        <button
          onClick={() => {
            ekle();
          }}
        >
          Ekle
        </button>
      </div>
      <div className="liste">
        {liste.map((item) => (
          <div style={{ display: "flex", flexDirection: "row", background: "red", justifyContent: "center" }}>
          <div
            onClick={() => {
              yapildi(item);
            }}
            className={item.tamamlandi ? "yapildi" : ""}
          >
            {item.baslik}
          </div>
           <button onClick={() => setListe(liste.filter((urun) => urun.id !== item.id))}>x</button>
           </div>
        ))}
      </div>
      <button
        className="temizle"
        onClick={() => setListe(liste.filter((item) => !item.tamamlandi))}
      >
        Tamamlananları Temizle
      </button>
    </div>
  );
}
