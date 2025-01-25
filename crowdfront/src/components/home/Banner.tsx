export default function Banner({image_url,title}:{image_url:string,title:string}) {
    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <img
          src={image_url}
          alt="Project Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{title}</h1>
        </div>
      </div>
    )
  }
  