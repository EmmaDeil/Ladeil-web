import React, { useEffect, useRef } from "react";

const Home = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Ensure Bootstrap JS is loaded and initialize the carousel
    if (window.bootstrap && carouselRef.current) {
      const carousel = new window.bootstrap.Carousel(carouselRef.current, {
        interval: 2500,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
      return () => carousel.dispose();
    }
  }, []);

  return (
    <div className="page home">
      <div
        id="homeCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2500"
        ref={carouselRef}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./img1.jpg" className="d-block w-100" alt="Nature 1" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div class="flex flex-col gap-2 text-center">
                  <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FacilityPro
                  </h1>
                  <h2 class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span class="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="./img2.jpg" className="d-block w-100" alt="Mountain" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div class="flex flex-col gap-2 text-center">
                  <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FACLPRO
                  </h1>
                  <h2 class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span class="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="./img3.jpg" className="d-block w-100" alt="Forest" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div class="flex flex-col gap-2 text-center">
                  <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FacilityPro
                  </h1>
                  <h2 class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span class="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
