export default function FormErrors({ errors }: any) {
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
