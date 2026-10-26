import { useState } from "react";
import { type PageName } from "./types/page";
import { type CampusEvent } from "./types/campus-event";
import { events as initialEvents } from "./data/events";
import { filterEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";
import "./App.css";

const categories = ["Seminer", "Atölye", "Söyleşi", "Konferans"];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const selected = events.find((e) => e.id === selectedId);
  const editing = events.find((e) => e.id === editId);
  const filtered = filterEvents(events, searchText, category);
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  const go = (p: PageName) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const showDetail = (id: string) => {
    setSelectedId(id);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const startEdit = (id: string) => {
    setEditId(id);
    setPage("update");
    window.scrollTo(0, 0);
  };

  const handleAdd = (data: Omit<CampusEvent, "id">) => {
    const newEvent: CampusEvent = { ...data, id: "event-" + Date.now() };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdate = (data: Omit<CampusEvent, "id">) => {
    if (!editId) return;
    setEvents((prev) =>
      prev.map((e) => (e.id === editId ? { ...data, id: editId } : e))
    );
  };

  const titles: Record<PageName, { title: string; text?: string }> = {
    home: { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
    events: { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
    detail: { title: selected?.title ?? "Etkinlik Detayı" },
    add: { title: "Etkinlik Ekle" },
    update: { title: "Etkinlik Güncelle" },
  };

  return (
    <div className="app">
      <Header title={titles[page].title} text={titles[page].text} />
      <Navigation current={page} onNavigate={go} />

      <main className="main">
        {page === "home" && (
          <>
            <h2 className="section-title">Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              totalCount={filtered.length}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <EventList
              events={filtered}
              onShowDetail={showDetail}
              emptyText={`"${searchText}" araması: bulunamadı.`}
            />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={startEdit}
          />
        )}

        {page === "add" && <EventForm onSubmit={handleAdd} />}

        {page === "update" && editing && (
          <EventForm onSubmit={handleUpdate} initial={editing} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;