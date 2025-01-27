export default function Banner({image_url, title}:{image_url:string, title:string}) {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <img
        src={image_url}
        alt="Project Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
    </div>
  )
}
  