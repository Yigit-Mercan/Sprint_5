import { type CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div className="detail-page">
      {/* Afiş kutusu */}
      <div className="poster-box">
        <h2>{event.title}</h2>
        <p>{formatDate(event.date)} · {event.location}</p>
      </div>
      <span className="poster-caption">{event.title} afişi</span>

      {/* Etkinlik Künyesi */}
      <div className="info-box">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      {/* Açıklama */}
      <div className="desc-box">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </div>

      {/* Butonlar */}
      <div className="detail-actions">
        <button className="btn-back" onClick={onBack}>
          ← Listeye dön
        </button>
        <button className="btn-edit" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </div>
  );
}

export default EventDetail;