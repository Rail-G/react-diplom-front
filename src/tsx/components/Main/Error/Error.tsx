interface ErrorType {
  errorText: string;
  onClick: () => void;
}
export function Error({errorText, onClick}: ErrorType) {
  return (
    <section className="top-sales text-center">
      <h2>Произошла ошибка, пожалуйста повторите запрос</h2>
      <div className="background-image error-img"></div>
      <p className="text-center">{errorText}</p>
      <button onClick={onClick} className="btn btn-outline-primary">
        Повторить запрос
      </button>
    </section>
  );
}
