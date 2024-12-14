// pages/Dulcinea/reservation/[...slug].js
import eventsData from '@/app/Dulcinea/data/dataevent.json'; // Asegúrate de que el archivo esté correctamente importado

// Esta función generará las rutas estáticas para los eventos
export async function generateStaticParams() {
  // Generar los slugs a partir de los eventos. Solo usamos el ID del evento.
  const slugs = eventsData.events.map(event => `${event.id}`); // Solo usamos el ID como parámetro en la URL

  // Devolvemos los slugs como objetos que Next.js puede usar para generar las rutas estáticas.
  return slugs.map(slug => ({
    slug: [slug],  // El parámetro slug que se usa en la URL
  }));
}

// Página de detalles del evento
export default function Page({ params }) {
  // Extraemos el ID del evento desde el primer valor de 'slug'
  const eventId = params.slug[0]; // Tomamos el primer valor del array slug

  // Buscamos el evento en los datos con el ID extraído
  const event = eventsData.events.find(e => e.id.toString() === eventId);

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
