"use client"

import { useState, useEffect } from 'react'

// JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Master the Ward Round Method™ - Free Healthcare Webinar",
  "description": "Join 1000+ healthcare professionals in this exclusive free webinar. Discover the Ward Round Method™ - a unique mechanism that transforms healthcare practices.",
  "startDate": "2026-04-12T10:00:00+05:30",
  "endDate": "2026-04-12T11:30:00+05:30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://smitha-new.vercel.app"
  },
  "organizer": {
    "@type": "Person",
    "name": "Smitha Chowdary Kankanala",
    "url": "https://smitha-new.vercel.app"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-01-01"
  },
  "performer": {
    "@type": "Person",
    "name": "Smitha Chowdary Kankanala"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Healthcare Professionals"
  }
}

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  
  const [isRegistered, setIsRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: ''
  })

  useEffect(() => {
    // Set webinar date to April 12, 2026
    const webinarDate = new Date('2026-04-12T10:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = webinarDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {}
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number'
    }
    
    // Profession validation
    if (!formData.profession) {
      errors.profession = 'Please select your profession'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call - replace with actual submission logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // You can add actual form submission logic here
      // Example: await fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) })
      
      console.log('Form submitted successfully:', formData)
      setIsRegistered(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        profession: ''
      })
      setFormErrors({})
      
    } catch (error) {
      console.error('Form submission error:', error)
      // Handle error - you could set an error state here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-dark relative overflow-hidden">
      {/* Hero Section */}
      <section className="hero relative min-h-screen flex items-center justify-center px-6 py-12">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Pre-badge */}
            <div className="inline-block">
              <div className="bg-gradient-to-r from-teal to-teal-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                Free Webinar — Smitha Chowdary Kankanala
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-bebas text-white text-4xl lg:text-6xl xl:text-7xl leading-tight">
              Master the
              <span className="block text-teal">Ward Round Method™</span>
              for Healthcare Success
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted leading-relaxed">
              Discover the unique mechanism that helps healthcare professionals 
              build thriving practices while making a real difference in patients&apos; lives.
            </p>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-white">2.3M+</div>
                <div className="text-sm text-muted">Community Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm text-muted">Success Stories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">97%</div>
                <div className="text-sm text-muted">Implementation Rate</div>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-gradient-to-r from-teal/20 to-teal-600/20 backdrop-blur-sm border border-teal/30 rounded-2xl p-6">
              <div className="text-teal text-sm font-medium mb-3">Webinar Starts In</div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl lg:text-3xl font-bebas text-white">{timeLeft.days}</div>
                  <div className="text-xs text-muted">Days</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bebas text-white">{timeLeft.hours}</div>
                  <div className="text-xs text-muted">Hours</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bebas text-white">{timeLeft.minutes}</div>
                  <div className="text-xs text-muted">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bebas text-white">{timeLeft.seconds}</div>
                  <div className="text-xs text-muted">Seconds</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full lg:w-auto bg-gradient-to-r from-teal to-teal-600 hover:from-teal-600 hover:to-teal text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Reserve Your Free Seat → April 12, 2026
              </button>
            </div>
          </div>

          {/* Right Content - Coach Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal/20 to-teal-600/20 backdrop-blur-sm border border-teal/30 p-8">
              <div className="bg-teal/10 rounded-xl p-6 text-center">
                <div className="w-32 h-32 bg-teal/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍⚕️</span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">Smitha Chowdary Kankanala</h3>
                <p className="text-muted text-sm mb-4">Healthcare Transformation Expert</p>
                <div className="space-y-2 text-sm text-muted">
                  <div>✓ 10+ Years Experience</div>
                  <div>✓ Ward Round Method™ Creator</div>
                  <div>✓ 1000+ Healthcare Professionals Trained</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="registration" className="py-20 bg-gradient-to-b from-teal/5 to-transparent">
        <div className="container mx-auto max-w-2xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-white text-3xl lg:text-5xl mb-4">
              Reserve Your Free Seat
            </h2>
            <p className="text-muted text-lg">
              Join 1000+ healthcare professionals who have transformed their practice
            </p>
          </div>

          {!isRegistered ? (
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-teal/10 to-teal-600/10 backdrop-blur-sm border border-teal/30 rounded-2xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-dark/50 border text-white placeholder-muted focus:outline-none transition-colors ${
                    formErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-teal/30 focus:border-teal'
                  }`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-dark/50 border text-white placeholder-muted focus:outline-none transition-colors ${
                    formErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-teal/30 focus:border-teal'
                  }`}
                  placeholder="Enter your email address"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-dark/50 border text-white placeholder-muted focus:outline-none transition-colors ${
                    formErrors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-teal/30 focus:border-teal'
                  }`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="profession" className="block text-white text-sm font-medium mb-2">
                  Profession *
                </label>
                <select
                  id="profession"
                  name="profession"
                  required
                  value={formData.profession}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-dark/50 border text-white focus:outline-none transition-colors ${
                    formErrors.profession 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-teal/30 focus:border-teal'
                  }`}
                >
                  <option value="">Select your profession</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="physiotherapist">Physiotherapist</option>
                  <option value="nutritionist">Nutritionist</option>
                  <option value="other">Other Healthcare Professional</option>
                </select>
                {formErrors.profession && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.profession}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal to-teal-600 hover:from-teal-600 hover:to-teal text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Reserving Your Seat...
                  </>
                ) : (
                  'Reserve My Free Seat →'
                )}
              </button>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Registration Confirmed!</h3>
              <p className="text-muted">
                Thank you for registering! You&apos;ll receive a confirmation email with the webinar details shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-white text-3xl lg:text-5xl mb-4">
              What You&apos;ll Discover
            </h2>
            <p className="text-muted text-lg">
              Master the Ward Round Method™ and transform your practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-teal/10 to-teal-600/10 backdrop-blur-sm border border-teal/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-4">Core Method</h3>
              <p className="text-muted">
                Learn the fundamental principles of the Ward Round Method™ that have helped thousands of healthcare professionals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal/10 to-teal-600/10 backdrop-blur-sm border border-teal/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-4">Implementation</h3>
              <p className="text-muted">
                Get step-by-step guidance on how to implement this method in your daily practice for maximum impact.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal/10 to-teal-600/10 backdrop-blur-sm border border-teal/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-teal/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-4">Results</h3>
              <p className="text-muted">
                See real case studies and results from healthcare professionals who have implemented this method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-gradient-to-b from-teal/5 to-transparent">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="bg-gradient-to-br from-teal/10 to-teal-600/10 backdrop-blur-sm border border-teal/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-white text-3xl lg:text-4xl mb-4">
                Event Details
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-teal text-sm font-medium mb-2">Date</div>
                <div className="text-white text-xl font-semibold">April 12, 2026</div>
              </div>
              <div>
                <div className="text-teal text-sm font-medium mb-2">Time</div>
                <div className="text-white text-xl font-semibold">10:00 AM IST</div>
              </div>
              <div>
                <div className="text-teal text-sm font-medium mb-2">Duration</div>
                <div className="text-white text-xl font-semibold">90 Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-bebas text-white text-3xl lg:text-5xl mb-6">
            Don&apos;t Miss This Opportunity
          </h2>
          <p className="text-muted text-lg mb-8">
            Join the exclusive webinar and discover how to transform your healthcare practice.
          </p>
          <button 
            onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-teal to-teal-600 hover:from-teal-600 hover:to-teal text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Reserve Your Free Seat Now →
          </button>
        </div>
      </section>
    </main>
    </>
  )
}