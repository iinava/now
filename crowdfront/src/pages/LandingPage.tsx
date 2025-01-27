import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lightbulb, Users, MessageSquare, TrendingUp, CheckCircle } from "lucide-react"
import { Link } from 'react-router-dom'

export default function LandingPage() {
    const features = [
        {
            title: "Share Your Ideas",
            description: "Post your startup or business ideas and get feedback from the community.",
            icon: Lightbulb,
        },
        {
            title: "Connect with Innovators",
            description: "Network with like-minded entrepreneurs and potential collaborators.",
            icon: Users,
        },
        {
            title: "Engage in Discussions",
            description: "Participate in meaningful conversations about various business concepts.",
            icon: MessageSquare,
        },
        {
            title: "Track Trending Ideas",
            description: "Stay updated with the most popular and innovative ideas in the community.",
            icon: TrendingUp,
        },
    ]

    const steps = [
        "Sign up for an IdeaConnect account",
        "Create and share your business idea",
        "Engage with the community through comments and discussions",
        "Refine your idea based on feedback",
        "Connect with potential collaborators or investors",
    ]

    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Founder, TechStart",
            content:
                "IdeaConnect helped me refine my startup idea and connect with amazing co-founders. It's a game-changer for entrepreneurs!",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            name: "Sarah Lee",
            role: "CEO, GreenGrowth",
            content:
                "The feedback I received on IdeaConnect was invaluable. It helped me pivot my business model and secure funding.",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            name: "Michael Chen",
            role: "Investor",
            content:
                "As an investor, IdeaConnect is my go-to platform for discovering innovative startups and talented entrepreneurs.",
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="py-4 px-4 md:px-6 lg:px-8">
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-white"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <span className="font-bold text-2xl text-white">IdeaConnect</span>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
                    <div className="flex justify-center items-center"> <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-20 w-20 text-white"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg></div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Connect, Share, and Grow Your Business Ideas
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        IdeaConnect is the platform where entrepreneurs and innovators come together to share, discuss, and evolve
                        their startup and business ideas.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/register">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                                Register
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                                Login
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-4 md:px-6 lg:px-8 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="bg-black border-gray-800">
                                <CardHeader>
                                    <feature.icon className="h-10 w-10 mb-4 text-white" />
                                    <CardTitle className="text-white">{feature.title}</CardTitle>
                                    <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
                    <div className="max-w-3xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center mb-6">
                                <CheckCircle className="h-6 w-6 text-white mr-4" />
                                <p className="text-lg text-gray-300">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-black border-gray-800">
                                <CardHeader>
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                            <AvatarFallback>
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                                            <p className="text-sm text-gray-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300">{testimonial.content}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 md:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Bring Your Ideas to Life?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join IdeaConnect today and start sharing your innovative business ideas with a community of entrepreneurs,
                        investors, and collaborators.
                    </p>
                    <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                        Sign Up Now
                    </Button>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-6 px-4 md:px-6 lg:px-8 border-t border-gray-800">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-white"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            <span className="font-bold text-xl text-white">IdeaConnect</span>
                        </div>
                    </div>
                    <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
                        <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-300 hover:text-white hover:underline">
                            Contact Us
                        </a>
                    </nav>
                </div>
                <div className="mt-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} IdeaConnect. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

