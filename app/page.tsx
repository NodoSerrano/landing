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
  const inView = useInView(ref, { once: true, threshold: 0.2 })

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
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
            NODO SERRANO
          </motion.div>
          <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
            <NavLink href="#about">Nosotros</NavLink>
            <NavLink href="#features">Características</NavLink>
            <NavLink href="#signup">Registro</NavLink>
          </div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={scrollToSignup}
                className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white"
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
        <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col overflow-hidden">
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
            className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-24"
            {...heroAnimation}
          >
            <div className="max-w-4xl mx-auto space-y-6">
              <motion.div
                className="flex flex-col items-center space-y-4"
                variants={fadeInUp}
              >
                <Image
                  src="/imagotipo-color.svg"
                  alt="Nodo Serrano Imagotipo"
                  width={200}
                  height={320}
                  className="w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-cyan-200 max-w-2xl mx-auto text-center drop-shadow"
                variants={fadeInUp}
              >
                Hackerspace y Semillero. Investigación y educación con un foco en Ethereum Blockchain en la ciudad de Tandil.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Events Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-slate-800 to-slate-700">
          <div className="container mx-auto px-4">
            <motion.div
              ref={eventsAnimation.ref}
              initial="hidden"
              animate={eventsAnimation.controls}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Próximos Eventos</h2>
              <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
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
        <section id="features" className="py-16 md:py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={featuresAnimation.ref}
              initial="hidden"
              animate={featuresAnimation.controls}
              variants={staggerContainer}
              className="space-y-12"
            >
              <motion.h2 className="text-2xl md:text-3xl font-bold text-center text-white" variants={itemFadeIn}>
                Qué se viene
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  title="Hub"
                  description="Un espacio físico para compartir, hackear y crear el nuevo mundo digital abierto."
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-white"
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
                      className="w-8 h-8 text-white"
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
                      className="w-8 h-8 text-white"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  }
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-20 bg-gradient-to-b from-slate-700 to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              ref={aboutAnimation.ref}
              initial="hidden"
              animate={aboutAnimation.controls}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Sobre el Proyecto</h2>
              <p className="text-base md:text-lg text-cyan-200 mb-8">
                Nodo Serrano es una nueva iniciativa que se enfocará en la investigación y educación sobre ethereum.
                Inspirados por las tecnologías descentralizadas y la innovación digital moderna, estamos creando una
                experiencia para fomentar esta floreciente comunidad en nuestra ciudad: Tandil.
              </p>
              <p className="text-base md:text-lg text-cyan-200">
                Mantente atento para más actualizaciones a medida que nos acercamos a nuestra fecha de lanzamiento.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="signup" className="py-16 md:py-20 bg-gradient-to-t from-slate-800 to-slate-700">
          <div className="container mx-auto px-4">
            <motion.div
              ref={signupAnimation.ref}
              initial="hidden"
              animate={signupAnimation.controls}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Únete a Nuestra Comunidad</h2>
              <p className="text-base md:text-lg text-cyan-200 mb-8">
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
              NODO SERRANO
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
            <div className="text-sm text-cyan-300">
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
      <Link href={href} className="text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors">
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
      <h3 className="text-xl font-bold text-center mb-2 text-white">{title}</h3>
      <p className="text-cyan-200 text-center">{description}</p>
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
        className="text-cyan-300 hover:text-cyan-200 transition-colors">
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  )
}
