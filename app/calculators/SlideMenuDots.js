export default function SlideMenuDots({ totalSlides, currentSlide, setCurrentSlide, className, dataTestId }) {
  return (
    <div className={`flex justify-center mt-4 w-full ${className}`} data-testid={dataTestId}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-4 h-4 mx-1 rounded-full border-2 ${
            currentSlide === index ? 'bg-[#FFB703] border-[#FFB703]' : 'bg-transparent border-[#023047]'
          }`}
        ></button>
      ))}
    </div>
  );
}