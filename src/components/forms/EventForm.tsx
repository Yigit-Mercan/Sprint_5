import { useState } from "react";
import { type CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: (data: Omit<CampusEvent, "id">) => void;
  initial?: CampusEvent;
}

function EventForm({ onSubmit, initial }: EventFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [capacity, setCapacity] = useState(initial?.capacity?.toString() ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      category,
      date,
      time,
      location: location.trim(),
      capacity: Number(capacity) || 0,
      description: description.trim(),
    });
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="form-page">
      <p className="form-info">
        {initial
          ? "Alanları güncelleyip Kaydet'e basın."
          : "Bu sprinte form sadece görünüm; kayıt yapılmaz."}
      </p>

      {submitted && (
        <div className="success-box">
          <p>✓ Etkinlik {initial ? "güncellendi" : "eklendi"}!</p>
        </div>
      )}

      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="f-title">Etkinlik Adı</label>
          <input
            id="f-title"
            type="text"
            value={title}
            placeholder="Örn. Kariyer Günleri 2026"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="f-cat">Kategori</label>
          <select
            id="f-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Konferans">Konferans</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="f-date">Tarih</label>
          <input
            id="f-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="f-time">Saat</label>
          <input
            id="f-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="f-loc">Yer</label>
          <input
            id="f-loc"
            type="text"
            value={location}
            placeholder="Örn. A Blok Konferans Salonu"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="f-cap">Kontenjan</label>
          <input
            id="f-cap"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="f-desc">Açıklama</label>
          <textarea
            id="f-desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default EventForm;