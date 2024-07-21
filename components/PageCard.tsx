"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import db, { UserData } from "../app/store/db";
import { useGetDexieDB, useSetDexieDB } from "@/utils/useDexieDB";
import { Session } from "next-auth";
import { getDexieUser, setDexieUser } from "@/utils/dexieUtils";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { IoClose } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { ReactNode } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
interface PageCardProps {
  children: ReactNode;
  favouredSize?: "icon" | "card";
  margin?: "small" | "large";
  highlightedBlock?: "string";
  layoutId?: string;
  stacked?: boolean;
  color?: string;
}
const PageCard: React.FC<PageCardProps> = ({
  children,
  favouredSize,
  margin,
  highlightedBlock,
  layoutId,
  stacked,
  color
}) => {
  const [searchBanner, setSearchBanner] = useState(false);
  const controls = useAnimation();
  useEffect(() => {
    if (!searchBanner) {
      controls.start({
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 50,
          duration: 0.1,
        },
      });
    }
  }, [searchBanner, controls]);
  return (
    <motion.div
      whileTap={{ scale: 0.99 }}
      transition={{
        duration: 0.1,
        delay: 0.1,
        transfrom:"translateZ(0)",
        ease: [0.3, 0.0, 0.1, 1.0],
        type: "spring", // Use a spring animation
        stiffness: 300, // Adjust for desired springiness
        damping: 25,
      }}
      viewport={{ once: true }}
      drag
      animate={controls}
      whileDrag={{
        scale: 0.99,
        opacity: "0.8",
        transition: { duration: 0, delay: 0 },
        zIndex: 10,
        position: "relative",
      }}
      
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      dragConstraints={{ left: -300, right: 300, top: -100, bottom: 300 }}
      dragElastic={0.09}
      dragSnapToOrigin={!searchBanner}
      className={`page-card p-5 mx-1 pb-2 my-1 w-full sm:w-[370px] ${
        stacked ? "stacked-page-card" : "unstacked-page-card"
      }`}
      style={{
        background:color
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 },
        zIndex: 10,
      }}
      layoutId={layoutId || ""}
    >
      <div className="text-xl mb-3 font-normal">My page</div>      {children}
      <div className="mb-3 text-sm">

      I have a lot of text inside me im sorrry that im so fat ill try
      my best to not be this fat again
      </div>
      <div className="button ml-0 py-3 bg-white/[.9]"><FaArrowRightLong size={20} /></div>
    </motion.div>
  );
};

export default PageCard;