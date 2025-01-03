import ScrollTop from "../ui/ScrollTop";

export default function ProjectDescription() {
    return (
      <div className="mt-8">
        <ScrollTop/>
        <h3 className="text-2xl font-semibold mb-4 text-gray-100">Project Description</h3>
        <div className="space-y-4 text-gray-300">
          <p>
            Our project aims to revolutionize the way people interact with their smart home devices. 
            By leveraging artificial intelligence and machine learning algorithms, we're creating a 
            system that can predict user preferences and automate home settings for optimal comfort 
            and energy efficiency.
          </p>
          <p>
            Key features of our project include:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Advanced AI-driven prediction of user habits and preferences</li>
            <li>Seamless integration with existing smart home devices</li>
            <li>Real-time energy consumption monitoring and optimization</li>
            <li>Intuitive mobile app for manual controls and system insights</li>
            <li>Voice-activated commands for hands-free operation</li>
          </ul>
          <p>
            We're currently in the prototype phase and are looking for beta testers and potential 
            investors to help bring this innovative solution to market. Our team of experienced 
            developers and data scientists is committed to creating a product that will set new 
            standards in home automation technology.
          </p>
        </div>
      </div>
    )
  }
  
  