export default function Banner() {
    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <img
          src="https://s3-ap-south-1.amazonaws.com/static.awfis.com/wp-content/uploads/2017/07/07184649/ProjectManagement.jpg"
          alt="Project Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Project Idea</h1>
        </div>
      </div>
    )
  }
  