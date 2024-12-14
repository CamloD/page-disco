import eventsData from '@/app/Dulcinea/data/dataevent.json'

export async function generateStaticParams() {
  const slugs = eventsData.events.map(event => event.slug);

  return slugs.map(slug => ({
    slug: [slug],
  }));
}

export default function Page({ params }) {
  const event = eventsData.events.find(e => e.slug === params.slug[0]);

  if (!event) {
    return <div>No se encontró el evento</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
}