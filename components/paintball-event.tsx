"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Phone, Target, Users, ChevronRight, Crosshair, Trophy, Zap } from "lucide-react"

// Date de l'événement (5 avril 2025)
const EVENT_DATE = new Date(2025, 3, 5, 9, 0, 0).getTime()

export default function PaintballEvent() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Calculer le temps restant
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = EVENT_DATE - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Hero Section avec overlay */}
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250309-WA0091.jpg-NYDJJw7zg1JePzK30aQwfy4Fr9PAur.jpeg"
            alt="Paintball Clash"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge className="bg-red-600 text-white border-none px-4 py-1 text-sm mb-4">ÉVÉNEMENT EXCLUSIF</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">PAINTBALL</span>
              <br />
              <span className="text-white relative">
                CLASH
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Élimine ton adversaire, deviens le champion !
            </p>
          </motion.div>

          {/* Compte à rebours */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-8"
          >
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-blue-500/30">
                <div className="text-3xl md:text-5xl font-bold text-white">{value.toString().padStart(2, "0")}</div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-gray-400">{key}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-8">
              <a href="https://wa.me/message/Q4PPKUMAGEVQO1">
                S'inscrire maintenant
              </a>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Section d'information */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="py-16 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-red-500">PACK SPÉCIAL</span> PAINTBALL
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Rejoignez-nous pour une expérience de paintball inoubliable !
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 transform rotate-12">
                Prix
              </div>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                <div className="relative h-64">
                  <Image
                    src="img/IMG-20250312-WA0197.jpg"
                    alt="Joueur de paintball"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-white">Pack Standard</h3>
                  {/* <ul className="space-y-3">
                    <li className="flex items-center">
                      <Crosshair className="h-5 w-5 text-blue-400 mr-2" />
                      <span>Équipement complet</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="h-5 w-5 text-blue-400 mr-2" />
                      <span>80 balles</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-5 w-5 text-blue-400 mr-2" />
                      <span>Une boisson rafraîchissante</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-400 mr-2" />
                      <span>Un casse croûte</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-400 mr-2" />
                      <span>Accèes au groupe Prenium PAINTBALL CLASH pour les évènement futures</span>
                    </li>
                  </ul> */}
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700"><a href="https://wa.me/message/Q4PPKUMAGEVQO1">Réserver</a></Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger value="info">Infos</TabsTrigger>
                  <TabsTrigger value="rules">Règles</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="bg-gray-800 p-6 rounded-b-lg border border-gray-700 border-t-0">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-red-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-gray-400">5 Avril 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-red-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Horaires</h4>
                        <p className="text-gray-400">9h00 - 17h00</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-red-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-medium">Lieu</h4>
                        <p className="text-gray-400">Paintball Club d'Olembe </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Trophy className="h-5 w-5 text-red-500 mr-3 mt-1" />
                      {/* <div>
                        <h4 className="font-medium">Prix à gagner</h4>
                        <p className="text-gray-400">Trophée + Équipement professionnel</p>
                      </div> */}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rules" className="bg-gray-800 p-6 rounded-b-lg border border-gray-700 border-t-0">
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Port du masque obligatoire sur le terrain</li>
                    <li>Respecter les consignes des arbitres</li>
                    <li>Signaler quand vous êtes touché</li>
                    <li>Ne pas tirer à moins de 5 mètres</li>
                    <li>Sécurité du lanceur hors du terrain</li>
                    <li>Pas de contact physique entre joueurs</li>
                  </ul>
                </TabsContent>
                <TabsContent value="contact" className="bg-gray-800 p-6 rounded-b-lg border border-gray-700 border-t-0">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-red-500 mr-3" />
                      <p>698 196 985</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      Pour réserver il faut simplement faire le dépot et envoyer une capture par WhatsApp en cliquant sur le boutton Réserver
                      Pour toute information supplémentaire, n'hésitez pas à nous contacter.
                    </p>
                    <div className="pt-4">
                      <h4 className="font-medium mb-2">Dépôts disponibles:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-700 p-2 rounded">
                          <p className="font-bold">Orange Money</p>
                          <p className="text-gray-400">688092408</p>
                        </div>
                        <div className="bg-gray-700 p-2 rounded">
                          <p className="font-bold">MTN Mobile Money</p>
                          <p className="text-gray-400">670618042</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 transform rotate-12">
                Prix
              </div>
              <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
                <div className="relative h-64">
                  <Image
                    src="img/IMG-20250312-WA0221.jpg"
                    alt="Joueur de paintball"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-white">Pack Spécial</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Target className="h-5 w-5 text-blue-400 mr-2" />
                      <span> +50 balles pour prolonger le massacre</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700"><a href="https://wa.me/message/Q4PPKUMAGEVQO1">Réserver</a></Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Galerie d'images */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            GALERIE <span className="text-red-500">PHOTOS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0214.jpg-nSlb8wC0liu7t8bw7vT67yZRPYzDk0.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0219.jpg-iTASaLG9yPLeTMmwlQ5Wp8dBAZB0jT.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0207.jpg-q5HabfimDQ2rPve8qCPbkUDlU7x499.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0216.jpg-kwZSgxmy8dMdiVDewQdo5foOFTItJL.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0209.jpg-QiAJKbLdyOdr52RGsN0MHrgrxiGgku.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250312-WA0018.jpg-wDj3LknkUpUo1AfD6SlAk95ICsRq22.jpeg",
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-lg aspect-square"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Paintball action ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Action Paintball</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="py-16 bg-gradient-to-t from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent animate-pulse" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              PRÊT POUR LE <span className="text-red-500">DÉFI</span> ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-8"
            >
              Inscrivez-vous maintenant et préparez-vous à vivre une expérience de paintball inoubliable !
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                <a href="https://chat.whatsapp.com/CSBZ2Q5Vmb0Hhw6wOtOkAu">Groupe WhatsApp</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="https://wa.me/message/Q4PPKUMAGEVQO1">En savoir plus</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 Paintball Clash. Tous droits réservés.</p>
          <p className="mt-2">Contact: 698 196 985</p>
        </div>
      </footer>
    </div>
  )
}

