'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Cta() {
  return (
    <section className="bg-primary py-20 text-white md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">Looking for Quality Dental Care?</h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          The Dentist LTD provides professional and compassionate dental care for patients of all
          ages.
        </p>

        <Link href="/contact">
          <Button
            size="lg"
            className="cursor-pointer rounded-full bg-accent px-8 py-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent/90"
          >
            Book an Appointment
          </Button>
        </Link>
      </div>
    </section>
  )
}
