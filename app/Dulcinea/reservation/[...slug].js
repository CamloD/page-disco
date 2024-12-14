// pages/Dulcinea/reservation/[...slug].js
import eventsData from '@/app/Dulcinea/data/dataevent.json';  // Asegúrate de que el archivo esté correctamente importado

// Función para generar los parámetros estáticos para las rutas dinámicas
export async function generateStaticParams() {
  // Obtener todos los slugs de los eventos disponibles
  const slugs = eventsData.events.map(event => event.slug);

  // Devolver los slugs como un array de objetos para Next.js
  return slugs.map(slug => ({
    slug: [slug],  // El valor debe ser un array para que coincida con la ruta '[...slug]'
  }));
}

// Página de detalles del evento
export default function Page({ params }) {
  // Buscar el evento correspondiente al slug
  const event = eventsData.events.find(e => e.slug === params.slug[0]);

  // Si no se encuentra el evento, mostrar un mensaje
  if (!event) {
    return <div>No se encontró el evento</div>;
  }

  // Renderizar los detalles del evento
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
}
