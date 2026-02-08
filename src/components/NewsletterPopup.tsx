'use client'

import { useState, useEffect } from 'react'

export default function NewsletterPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // Don't show if already dismissed or subscribed
    const dismissed = localStorage.getItem('newsletter_dismissed')
    const subscribed = localStorage.getItem('newsletter_subscribed')
    if (dismissed || subscribed) return

    // Show after 15 seconds of browsing
    const timer = setTimeout(() => {
      setShow(true)
    }, 15000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      setShow(false)
      setClosing(false)
      localStorage.setItem('newsletter_dismissed', Date.now().toString())
    }, 200)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    // Store email locally (can be integrated with email service later)
    const emails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]')
    emails.push({ email: email.trim(), date: new Date().toISOString() })
    localStorage.setItem('newsletter_emails', JSON.stringify(emails))
    localStorage.setItem('newsletter_subscribed', 'true')

    setSubmitted(true)
    setTimeout(() => {
      setClosing(true)
      setTimeout(() => {
        setShow(false)
        setClosing(false)
      }, 200)
    }, 2500)
  }

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 ${closing ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Popup */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${closing ? 'scale-95' : 'scale-100 animate-slide-up sm:animate-none'} transition-transform duration-200`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors z-10 text-sm"
        >
          ✕
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 pt-8 pb-6 text-center text-white">
          <span className="text-3xl mb-2 block">🧵</span>
          <h3 className="text-xl font-serif mb-1">Get 5% Off Your First Order</h3>
          <p className="text-sm text-green-50 opacity-90">
            Join our community for exclusive deals on authentic Kuthampully handlooms
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="text-center py-4">
              <span className="text-4xl mb-3 block">🎉</span>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Welcome to the family!</h4>
              <p className="text-sm text-gray-600 mb-3">Send us a message on WhatsApp with the code below to claim your discount:</p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 inline-block">
                <span className="font-bold text-primary-700 text-lg tracking-wider">FIRST5</span>
              </div>
              <a
                href="https://wa.me/917907730095?text=Hi!%20I%20want%20to%20claim%20my%205%25%20first%20order%20discount.%20Code%3A%20FIRST5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full py-2.5 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                💬 Claim on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
              >
                Get My 5% Discount
              </button>
              <p className="text-[11px] text-gray-400 text-center">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
