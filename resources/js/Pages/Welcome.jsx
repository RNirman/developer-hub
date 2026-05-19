import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Users, Rocket, Layers, Shield, ChevronRight, Settings, Cpu, HardDrive } from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const features = [
        {
            icon: <Terminal className="w-6 h-6" />,
            title: 'CLI Integration',
            description: 'Advanced command-line interfaces for maximum efficiency. Automate workflows via terminal parameters.'
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: 'Code Execution',
            description: 'Intelligent snippet execution and syntax routing. Support for multi-language architecture.'
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: 'Peer Connectivity',
            description: 'Peer-to-peer developer connectivity protocol. Synchronous and asynchronous communication channels.'
        },
        {
            icon: <Rocket className="w-6 h-6" />,
            title: 'Optimized Pipelines',
            description: 'Optimized build pipelines ensuring sub-millisecond compute and hyper-fast deployment.'
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: 'Modular Architecture',
            description: 'Modular structural integrity. Extendable via standardized plugin interfaces.'
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: 'Secure Persistence',
            description: 'Encrypted persistence layer. Role-based access control and strict identity verification.'
        }
    ];

    return (
        <>
            <Head title="Developer Hub" />
            
            <div className="min-h-screen bg-blueprint-bg text-blueprint-fg font-sans relative selection:bg-blueprint-accent/30 selection:text-white">
                {/* Blueprint Grid Background - reduced opacity */}
                <div className="absolute inset-0 bg-blueprint-pattern bg-blueprint opacity-10 z-0 pointer-events-none"></div>

                {/* Technical Overlay Lines */}
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-blueprint-accent/10 z-0 pointer-events-none"></div>
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-blueprint-accent/10 z-0 pointer-events-none"></div>
                <div className="absolute top-0 left-[75%] w-[1px] h-full bg-blueprint-accent/10 z-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    {/* Header */}
                    <header className="border-b border-blueprint-grid bg-blueprint-bg/80 backdrop-blur-sm relative z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="border border-blueprint-accent p-1.5 bg-blueprint-bg rounded-md">
                                    <Cpu className="w-5 h-5 text-blueprint-accent" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-blueprint-accent font-bold tracking-wider text-lg font-mono">DEV_HUB</span>
                                </div>
                            </div>

                            <nav className="flex items-center gap-6">
                                {auth.user ? (
                                    <Link href={route('threads.index')} className="text-sm font-semibold text-blueprint-fg hover:text-blueprint-accent transition-colors flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blueprint-alert rounded-full animate-pulse"></span>
                                        Discussions
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-sm font-semibold text-blueprint-secondary hover:text-blueprint-accent transition-colors">
                                            Log In
                                        </Link>
                                        <Link href={route('register')} className="text-sm font-semibold bg-blueprint-accent/10 border border-blueprint-accent text-blueprint-accent px-4 py-2 hover:bg-blueprint-accent hover:text-blueprint-bg transition-colors rounded-md">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blueprint-grid/50 text-blueprint-accent text-xs tracking-wider uppercase mb-6 border border-blueprint-accent/30 rounded-full font-mono">
                                        <HardDrive className="w-3 h-3" />
                                        Platform Online
                                    </div>
                                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-sm">
                                        Engineered for <br/> <span className="text-blueprint-accent">Scale & Speed</span>
                                    </h1>
                                    <p className="text-blueprint-fg/90 max-w-lg mb-8 leading-relaxed text-lg">
                                        Connect, collaborate, and build faster with our comprehensive suite of developer tools, code sharing, and community forums.
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link href={route('register')} className="group flex items-center gap-2 bg-blueprint-accent text-blueprint-bg px-6 py-3 font-bold tracking-wide hover:bg-white transition-colors border border-blueprint-accent rounded-md">
                                            Create Workspace
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <a href="#features" className="flex items-center gap-2 px-6 py-3 border border-blueprint-grid hover:border-blueprint-secondary text-blueprint-secondary font-medium transition-colors rounded-md bg-blueprint-bg/50 backdrop-blur">
                                            View Features
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Technical Graphic */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative hidden md:block"
                            >
                                <div className="border border-blueprint-accent/40 bg-blueprint-bg/60 backdrop-blur-sm p-6 relative rounded-lg shadow-xl">
                                    <div className="absolute top-2 right-2 text-xs text-blueprint-accent/60 tracking-wider font-mono">CORE SYSTEM</div>
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="h-24 border border-blueprint-grid flex flex-col justify-between p-3 rounded bg-blueprint-grid/20">
                                                <div className="w-2 h-2 bg-blueprint-accent/50 rounded-full animate-ping" style={{ animationDelay: `${i * 0.3}s` }}></div>
                                                <div className="text-xs text-blueprint-fg/60 tracking-wider text-right font-mono">NODE_0{i+1}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-32 border border-blueprint-accent/60 flex items-center justify-center relative overflow-hidden group rounded bg-blueprint-bg/80">
                                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,240,255,0.1)_50%,transparent_100%)] -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                        <Settings className="w-12 h-12 text-blueprint-accent opacity-50 animate-[spin_10s_linear_infinite]" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </main>

                    {/* Features Grid */}
                    <section id="features" className="border-t border-blueprint-grid bg-blueprint-bg/90 relative z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                            <div className="mb-12 border-l-4 border-blueprint-accent pl-4">
                                <h2 className="text-3xl font-bold tracking-tight text-white">Platform Features</h2>
                                <p className="text-sm text-blueprint-secondary tracking-wide mt-2">Everything you need to ship faster.</p>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="border border-blueprint-grid p-6 bg-blueprint-bg hover:border-blueprint-accent/50 transition-colors group relative rounded-lg shadow"
                                    >
                                        <div className="text-blueprint-secondary mb-4 group-hover:text-blueprint-accent transition-colors">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-sm text-blueprint-fg/80 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-blueprint-grid py-8 relative z-10 bg-blueprint-bg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-blueprint-accent" />
                                <span className="font-bold text-sm tracking-wider font-mono">DEV_HUB</span>
                            </div>
                            <div className="text-sm text-blueprint-fg/60">
                                Laravel v{laravelVersion} · PHP v{phpVersion} · React
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </>
    );
}
