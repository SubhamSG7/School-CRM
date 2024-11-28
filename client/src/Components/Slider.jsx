import { Carousel, Typography, Button } from "@material-tailwind/react";

export function Slider() {
  return (
    <Carousel className="h-[70vh]">
      <div className="relative h-full w-full">
        <img
          src="https://static1.squarespace.com/static/50afefd0e4b01c11f0ec0c82/t/5d916d9585b31035f10fd716/1572059893014/Learning-Landscape-Denver-Schools-Conservatory-Green%2B%283%29.jpg?format=1500w"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Welcome To School CRM
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              We believe in nurturing minds, shaping futures, and building a
              community of lifelong learners. Established in [1997], our school
              has been a beacon of excellence, providing a well-rounded
              education that blends academic rigor with character development.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://images.squarespace-cdn.com/content/v1/50afefd0e4b01c11f0ec0c82/1652888190413-Q4BU33PCVB5OCQQ7POSW/20200616+BRUSH-152.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Campus
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Welcome to the campus—where learning meets inspiration. Nestled in
              the heart of India's Capital, our campus is designed to provide a
              safe, vibrant, and stimulating environment for students to thrive
              both academically and personally.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src="https://www.teachermagazine.com/files/All_Hallows_EMBED.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Play Ground
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              We understand the importance of play in a child’s overall
              development. Our expansive and well-maintained playgrounds provide
              a safe, fun, and engaging environment where students can explore,
              stay active, and build lasting friendships.
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
