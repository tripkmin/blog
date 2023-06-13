interface SubHeaderProps {
  title: string;
  description: string;
}

export default function SubHeader({ title, description }: SubHeaderProps) {
  return (
    <section className="sub-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
