interface Props {
  readonly title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <h2 className="text-2xl font-bold mb-6 border-b pb-2">{title}</h2>
  );
}
