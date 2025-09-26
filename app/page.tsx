"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, MessageCircle, Mail } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"
import NewsletterForm from "@/components/newsletter-form"
import LumaEvents from "@/components/luma-events"
import BlogSectionClient from "@/components/blog-section-client"

// Variants for animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// Custom hook for scroll animations
function useScrollAnimation() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return { ref, controls, variants: fadeIn }
}

export default function Home() {
  const heroAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const aboutAnimation = useScrollAnimation()
  const signupAnimation = useScrollAnimation()
  const eventsAnimation = useScrollAnimation()

  // Function to scroll to signup section
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup')
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-violet-400/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            TANDIL
          </motion.div>
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
            <NavLink href="#top">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#events">Eventos</NavLink>
            <NavLink href="#about">Nosotros</NavLink>
            <NavLink href="#features">Características</NavLink>
            <NavLink href="#signup">Registro</NavLink>
          </div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={scrollToSignup}
                className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-off-white text-base font-bold"
              >
                Suscribirse
              </Button>
            </motion.div>
            <MobileMenu />
          </div>
        </div>
      </motion.header>

      <main className="flex-grow">
        {/* Hero Section with Magical Gradient */}
        <section className="relative w-full min-h-[30vh] md:min-h-[35vh] flex flex-col overflow-hidden">
          {/* Magical Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[128px] animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[200px]" />
          </div>
          
          {/* Content */}
          <motion.div
            className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-6 md:py-8"
            {...heroAnimation}
          >
            <div className="max-w-4xl mx-auto space-y-4">
              <motion.div
                className="flex flex-col items-center space-y-2"
                variants={fadeInUp}
              >
                <Image
                  src="/imagotipo-color.svg"
                  alt="Nodo Serrano Imagotipo"
                  width={200}
                  height={320}
                  className="w-16 md:w-20 lg:w-24 h-auto drop-shadow-2xl"
                  priority
                />
                <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-white text-center drop-shadow-lg">
                  Nodo Serrano
                </h1>
              </motion.div>
              <motion.p
                className="text-base md:text-lg lg:text-xl text-off-white max-w-2xl mx-auto text-center drop-shadow leading-relaxed"
                variants={fadeInUp}
              >
                <span className="block sm:inline">Hackerspace y Semillero.</span>{" "}
                <span className="block sm:inline">Investigación y educación con foco en Ethereum Ecosystem</span>{" "}
                <span className="block sm:inline">en la ciudad de Tandil.</span>
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Blog Section */}
        <BlogSectionClient />

        {/* Events Section */}
        <section id="events" className="py-12 md:py-16 bg-gradient-to-b from-slate-700 to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={eventsAnimation.ref}
              initial="hidden"
              animate={eventsAnimation.controls}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-off-white">Próximos eventos</h2>
              <p className="text-lg text-off-white max-w-2xl mx-auto">
                Participa en nuestros eventos y talleres sobre blockchain y Ethereum
              </p>
            </motion.div>
            
            <LumaEvents />
            
            {/* Luma Profile Link */}
            <div className="text-center mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="https://lu.ma/user/usr-dJssfd2hL0CffxN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-off-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
                >
                  Ver todos los eventos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={featuresAnimation.ref}
              initial="hidden"
              animate={featuresAnimation.controls}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.h2 className="text-2xl md:text-3xl font-bold text-center text-off-white" variants={itemFadeIn}>
                Qué se viene
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <FeatureCard
                  title="Hub"
                  description="Un espacio físico para compartir y crear el nuevo mundo digital abierto."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                      <path d="M12 12h.01" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Eventos"
                  description="Escuelas, Universidades e instituciones privadas serán parte de nuestros encuentros."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M3 10h18" />
                      <rect width="18" height="16" x="3" y="6" rx="2" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Comunidad"
                  description="Juntos podemos hacer más. Queremos conectar la comunidad local con el mundo."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Hackerspace"
                  description="Un espacio equipado con recursos de hardware, herramientas de hacking y tecnología para explorar la seguridad informática."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Educación"
                  description="Desde talleres prácticos de Ethereum y seguridad operacional hasta charlas espontáneas con expertos locales e internacionales que nos visitan."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Arte"
                  description="Un espacio creativo transversal donde la tecnología y el arte convergen. Ven a experimentar, jugar y expresarte."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="Cowork"
                  description="Vení a trabajar al nodo, sea por el día o por unos meses, y disfrutá del acceso a todo lo que ofrece desde adentro."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  }
                />
                <FeatureCard
                  title="After Office"
                  description="Sumate a relajar después del trabajo, con música, comida y mucho networking en un ambiente distendido."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-off-white"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                      <path d="M6 1v3" />
                      <path d="M10 1v3" />
                      <path d="M14 1v3" />
                    </svg>
                  }
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-gradient-to-b from-slate-700 to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={aboutAnimation.ref}
              initial="hidden"
              animate={aboutAnimation.controls}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-off-white">Sobre el proyecto</h2>
              <p className="text-base md:text-lg text-off-white mb-8">
                Nodo Serrano es una nueva iniciativa que se enfocará en la investigación y educación sobre ethereum.
                Inspirados por las tecnologías descentralizadas y la innovación digital moderna, estamos creando una
                experiencia para fomentar esta floreciente comunidad en nuestra ciudad: Tandil.
              </p>
              <p className="text-base md:text-lg text-off-white">
                Mantente atento para más actualizaciones a medida que nos acercamos a nuestra fecha de lanzamiento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-12 md:py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-off-white">Nos apoyan</h2>
              
              {/* Ethereum Logo - Centered Top */}
              <div className="flex justify-center mb-12">
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center"
                >
                  <svg
                    height="128"
                    viewBox="0 0 256 417"
                    className="h-32"
                  >
                    <path d="m127.961 0-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" fill="#343434"/>
                    <path d="m127.962 0-127.962 212.32 127.962 75.639V154.158z" fill="#8C8C8C"/>
                    <path d="m127.961 312.187-1.575 1.92v98.199l1.575 4.6L256 236.587z" fill="#3C3C3B"/>
                    <path d="m127.962 416.905v-104.72L0 236.585z" fill="#8C8C8C"/>
                    <path d="m127.961 287.958 127.96-75.637-127.96-58.162z" fill="#141414"/>
                    <path d="m0 212.32 127.96 75.638v-133.8z" fill="#393939"/>
                  </svg>
                </motion.div>
              </div>

              {/* Bottom Row - Three logos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
                {/* ESP - Ethereum Support Program */}
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 93.231 158.588"
                    className="h-32"
                  >
                    <defs>
                      <linearGradient id="esp-gradient-1" x1="-1.041" y1="74.024" x2="56.307" y2="16.676" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f47d51"/>
                        <stop offset="0.96" stopColor="#df72ac"/>
                      </linearGradient>
                      <linearGradient id="esp-gradient-2" x1="56.17" y1="54.938" x2="75.388" y2="35.72" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f15d4c"/>
                        <stop offset="1" stopColor="#c36ca1"/>
                      </linearGradient>
                      <linearGradient id="esp-gradient-3" x1="70.463" y1="104.612" x2="27.115" y2="47.264" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f47d51"/>
                        <stop offset="0.96" stopColor="#df72ac"/>
                      </linearGradient>
                      <linearGradient id="esp-gradient-4" x1="70.463" y1="137.557" x2="27.115" y2="80.209" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f47d51"/>
                        <stop offset="0.96" stopColor="#df72ac"/>
                      </linearGradient>
                      <linearGradient id="esp-gradient-5" x1="-1.041" y1="137.557" x2="41.307" y2="80.209" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f47d51"/>
                        <stop offset="0.96" stopColor="#df72ac"/>
                      </linearGradient>
                      <linearGradient id="esp-gradient-6" x1="-1.041" y1="104.612" x2="41.307" y2="47.264" gradientTransform="matrix(1, 0, 0, -1, 0, 165.733)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#f47d51"/>
                        <stop offset="0.96" stopColor="#df72ac"/>
                      </linearGradient>
                    </defs>
                    <polygon fill="url(#esp-gradient-1)" points="46.775 120.463 46.775 158.588 0 90.668 46.775 120.463"/>
                    <polygon fill="url(#esp-gradient-2)" points="93.231 90.668 46.775 158.588 46.775 120.463 93.231 90.668"/>
                    <polygon fill="url(#esp-gradient-3)" points="93.231 81.056 46.775 54.465 46.775 110.851 93.231 81.056"/>
                    <polygon fill="url(#esp-gradient-4)" points="93.231 81.056 46.775 0 46.775 54.465 93.231 81.056"/>
                    <polygon fill="url(#esp-gradient-5)" points="46.775 0 46.775 54.465 0 81.056 46.775 0"/>
                    <polygon fill="url(#esp-gradient-6)" points="46.775 54.465 46.775 110.851 0 81.056 46.775 54.465"/>
                  </svg>
                </motion.div>

                {/* Devconnect */}
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src="https://devconnect.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcube-logo.6e90fa94.png&w=384&q=75"
                    alt="Devconnect"
                    width={128}
                    height={128}
                    className="object-contain h-32"
                  />
                </motion.div>

                {/* TheRedGuild */}
                <motion.div
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src="https://theredguild.org/assets/navbar-logo.svg"
                    alt="TheRedGuild"
                    width={240}
                    height={128}
                    className="object-contain h-32"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="signup" className="py-12 md:py-16 bg-gradient-to-t from-slate-800 to-slate-700">
          <div className="container mx-auto px-4">
            <motion.div
              ref={signupAnimation.ref}
              initial="hidden"
              animate={signupAnimation.controls}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-off-white">Únete a nuestra comunidad</h2>
              <p className="text-base md:text-lg text-off-white mb-8">
                Sé parte de la revolución blockchain en Tandil. Regístrate para recibir novedades sobre eventos, talleres y oportunidades.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        className="bg-slate-900 border-t border-violet-400/30 py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent mb-6 md:mb-0">
              TANDIL
            </div>
            <div className="flex space-x-6 mb-6 md:mb-0">
              <SocialLink href="mailto:hey@nodoserrano.org" icon={<Mail className="h-6 w-6" />} label="Email" />
              <SocialLink
                href="https://twitter.com/NodoSerrano"
                icon={<Twitter className="h-6 w-6" />}
                label="Twitter"
              />
              <SocialLink
                href="https://instagram.com/nodoserrano"
                icon={<Instagram className="h-6 w-6" />}
                label="Instagram"
              />
              <SocialLink
                href="https://whatsapp.com/channel/0029VbAvlX0Gk1FnUUeDII3g"
                icon={<MessageCircle className="h-6 w-6" />}
                label="WhatsApp"
              />
            </div>
            <div className="text-sm text-off-white">
              © {new Date().getFullYear()} Nodo Serrano. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

// Component for navigation links with hover animation
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} className="text-base font-bold text-violet-500 hover:text-violet-600 transition-colors">
        {children}
      </Link>
    </motion.div>
  )
}

// Component for feature cards with animation
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      variants={itemFadeIn}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-violet-400/30 hover:border-violet-400/50 transition-colors shadow-sm"
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-violet-400 to-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold text-center mb-2 text-off-white">{title}</h3>
      <p className="text-off-white text-center">{description}</p>
    </motion.div>
  )
}

// Component for social links with animation
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <motion.div whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-off-white hover:text-white transition-colors"
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  )
}

