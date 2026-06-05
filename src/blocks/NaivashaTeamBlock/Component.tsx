import React from 'react'
import type { NaivashaTeamBlock as NaivashaTeamBlockProps, NaivashaTeam } from '@/payload-types'
import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const NaivashaTeamBlockComponent: React.FC<NaivashaTeamBlockProps> = async (props) => {
  const { badge = 'Our Team', title, description, members: memberRelations } = props

  let members: NaivashaTeam[] = []

  if (memberRelations?.length) {
    const payload = await getPayload({ config: configPromise })

    const memberIds = memberRelations.map((member) =>
      typeof member === 'object' ? member.id : member,
    )

    const fetchedMembers = await payload.find({
      collection: 'naivasha-team',
      depth: 1,
      pagination: false,
      where: {
        id: {
          in: memberIds,
        },
      },
    })

    members = memberIds
      .map((id) => fetchedMembers.docs.find((doc) => doc.id === id))
      .filter((doc): doc is NaivashaTeam => Boolean(doc))
  }

  if (!members.length) return null

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="border-t pt-10">
          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end ">
            <div>
              <hr className="h-2 bg-primary w-1/2 mb-8" />
              <h2 className="justify-start max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
                {title}
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((member, index) => {
              const image = member.image
              const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

              return (
                <article
                  key={member.id}
                  className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[320px] overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={member.name || 'Team Member'}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted">
                        <span className="text-sm text-muted-foreground">No Image Available</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>

                        {member.position && (
                          <p className="mt-1 text-sm text-muted-foreground">{member.position}</p>
                        )}
                      </div>

                      <span className="text-xs font-medium text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {member.Branch && (
                      <div className="mt-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {member.Branch} Branch
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
