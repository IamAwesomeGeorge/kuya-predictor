interface PageHeaderProps {
  title: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { title } = props;

  return (
    <>
      <h2
        data-testid="page-title"
        style={{
          marginTop: "0.2em",
        }}
      >
        {title}
      </h2>
    </>
  );
}
