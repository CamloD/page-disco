// pages/Dulcinea/reservation/[...slug].js
import eventsData from '@/app/Dulcinea/data/dataevent.json'; // Asegúrate de que el archivo esté correctamente importado

// Esta función generará las rutas estáticas para los eventos
export async function generateStaticParams() {
  // Generar los slugs a partir de los eventos. Aquí concatenamos el id y el título para formar el slug.
  const slugs = eventsData.events.map(event => `${event.id}-${event.title.toLowerCase().replace(/\s+/g, '-')}`);

  // Devolvemos los slugs como objetos que Next.js puede usar para generar las rutas estáticas.
  return slugs.map(slug => ({
    slug: [slug],  // `slug` debe ser un array para que coincida con la ruta '[...slug]'
  }));
}

// Página de detalles del evento
export default function Page({ params }) {
  // Extraemos el id y el título del slug
  const [eventId, eventTitle] = params.slug[0].split('-');
  const event = eventsData.events.find(e => e.id.toString() === eventId && e.title.toLowerCase().replace(/\s+/g, '-') === eventTitle);

  // Si no se encuentra el evento, mostramos un mensaje de error
  if (!event) {
    return <div>No se encontró el evento</div>;
  }

  // Renderizamos los detalles del evento
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
}