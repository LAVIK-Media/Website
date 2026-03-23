"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export type UeberUnsTeamMember = {
  name: string;
  role: string;
  line: string;
  initials: string;
  imageSrc: string | null;
  imageAlt: string;
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

/** Parent: steuert die Reihenfolge – jedes Kind startet verzögert. */
const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.12,
    },
  },
};

/** Eine Personenkarte: Foto-Bereich + Text nacheinander innen. */
const cardVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0,
    },
  },
};

const photoFrameVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.88,
    filter: "blur(16px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease },
  },
};

const textBlockVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
};

function TeamPhoto({
  src,
  alt,
  initials,
}: {
  src: string | null;
  alt: string;
  initials: string;
}) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  if (showImage) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill
        className="pointer-events-none select-none object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
        draggable={false}
        onError={() => setHasError(true)}
        onContextMenu={(event) => event.preventDefault()}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
      <span className="select-none font-display text-2xl font-bold tracking-[0.25em] text-[#1FBF8F]/22 sm:text-3xl">
        {initials}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6F8580]">
        Foto
      </span>
    </div>
  );
}

export default function UeberUnsTeam({
  members,
}: {
  members: UeberUnsTeamMember[];
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {members.map((member) => (
          <article key={member.name} className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F1F1A] to-[#050706] ring-1 ring-white/[0.06]">
              <TeamPhoto
                src={member.imageSrc}
                alt={member.imageAlt}
                initials={member.initials}
              />
            </div>
            <div className="mt-5">
              <h3 className="font-display text-lg font-semibold text-[#F2F5F4]">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#1FBF8F]/85">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#9BAFA8]">
                {member.line}
              </p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8"
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -72px 0px" }}
    >
      {members.map((member) => (
        <motion.article
          key={member.name}
          variants={cardVariants}
          className="flex flex-col"
          whileHover={{ y: -5, transition: { duration: 0.25, ease } }}
        >
          <motion.div
            variants={photoFrameVariants}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F1F1A] to-[#050706] ring-1 ring-white/[0.06] shadow-none transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
          >
            <TeamPhoto
              src={member.imageSrc}
              alt={member.imageAlt}
              initials={member.initials}
            />
          </motion.div>

          <motion.div variants={textBlockVariants} className="mt-5">
            <h3 className="font-display text-lg font-semibold text-[#F2F5F4]">
              {member.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#1FBF8F]/85">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9BAFA8]">
              {member.line}
            </p>
          </motion.div>
        </motion.article>
      ))}
    </motion.div>
  );
}
