"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/context/LanguageContext";
import { RICH_TEXT_COMPONENTS } from "@/components/common/RichTextComponents";
import { urlFor } from "@/lib/sanity";
import { AboutData } from "@/types";

export default function AboutSection({ data }: { data: AboutData }) {
  const { lang } = useLanguage();

  if (!data || !data.members) return null;

  const { sectionTitle, mainTitle, mainSubtitle, members } = data;

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-title">
          <Image
            src="/images/icons/arrows.svg"
            alt="icon"
            width={20}
            height={20}
          />
          <p>{sectionTitle?.[lang]}</p>
        </div>

        <div className="standard-content">
          <h2 className="standard-title">
            {mainTitle?.[lang] && (
              <PortableText
                value={mainTitle[lang]}
                components={RICH_TEXT_COMPONENTS}
              />
            )}
          </h2>
          <p className="text-standard">{mainSubtitle?.[lang]}</p>
        </div>

        <ul className="member-list">
          {members.map((member) => {
            const memberImgUrl = member.image?.asset
              ? urlFor(member.image).url()
              : member.image?.mockPath || "/images/member-fallback.png";

            return (
              <li
                className="member-item"
                style={
                  memberImgUrl
                    ? { backgroundImage: `url(${memberImgUrl})` }
                    : {}
                }
                key={member._key}
              >
                <p className="member-name">{member.name}</p>
                <p className="text-standard member-desc">
                  {member.description?.[lang]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
