export default function FetcherErrors({ errors }: any) {
  return (
    <>
      {errors && (
        <ul>
          {errors.map((message: any, index: any) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}
    </>
  );
}
