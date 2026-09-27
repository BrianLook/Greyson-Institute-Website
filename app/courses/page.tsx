import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LicenseExpirationPromo } from "@/components/LicenseExpirationPromo";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Explore Greyson Institute online real estate education for pre-licensing, post-license, continuing education, instructor education, broker education, reactivation, and exam preparation.",
};

const paths = [
  {
    label: "I need my first license",
    detail: "Start the education path toward becoming a real estate sales associate.",
    href: "#pre-licensing",
  },
  {
    label: "I’m preparing for the licensing exam",
    detail: "Review key concepts and prepare more confidently for exam day.",
    href: "#exam-prep",
  },
  {
    label: "I need post-license education",
    detail: "Continue with the education required after becoming licensed.",
    href: "#post-license",
  },
  {
    label: "I need continuing education",
    detail: "Find education for maintaining and renewing an active license.",
    href: "#continuing-education",
  },
  {
    label: "I need instructor continuing education",
    detail: "Review the education required to renew a Florida real estate instructor permit.",
    href: "#instructor-ce",
  },
  {
    label: "I want to become a broker",
    detail: "Explore the education path for advancing to broker licensure.",
    href: "#broker",
  },
  {
    label: "I need broker post-license education",
    detail: "Review the 60-hour education required for a broker's first renewal.",
    href: "#broker-post-license",
  },
  {
    label: "I need to reactivate my license",
    detail: "Find education associated with returning an inactive license to active status.",
    href: "#reactivation",
  },
  {
    label: "I want to become a real estate instructor",
    detail: "Explore the requirements to teach Florida real estate courses.",
    href: "#instructor-path",
  },
];

const courses = [
  {
    id: "pre-licensing",
    eyebrow: "PRE-LICENSING",
    title: "Sales Associate Pre-Licensing",
    body: "For students beginning the path toward a real estate sales associate license.",
  },
  {
    id: "post-license",
    eyebrow: "POST-LICENSE",
    title: "Sales Associate Post-License",
    body: "For newly licensed sales associates completing the education required for their first renewal period.",
  },
  {
    id: "continuing-education",
    eyebrow: "CONTINUING EDUCATION",
    title: "Continuing Education",
    body: "For active real estate professionals completing education for license renewal.",
  },
  {
    id: "instructor-ce",
    eyebrow: "INSTRUCTOR CE",
    title: "Real Estate Instructor Continuing Education",
    body: "For Florida real estate school instructors completing Core Law and Teaching Techniques requirements for permit renewal.",
  },
  {
    id: "instructor-path",
    eyebrow: "INSTRUCTOR PATH",
    title: "Become a Real Estate Instructor",
    body: "Explore the requirements and next steps for teaching Florida real estate education.",
  },
  {
    id: "broker",
    eyebrow: "BROKER",
    title: "Broker Pre-Licensing",
    body: "For experienced real estate professionals preparing to advance to broker licensure.",
  },
  {
    id: "broker-post-license",
    eyebrow: "BROKER POST-LICENSE",
    title: "Broker Post-License",
    body: "For newly licensed brokers and broker associates completing the 60-hour education required for their first renewal.",
  },
  {
    id: "reactivation",
    eyebrow: "REACTIVATION",
    title: "Reactivation Education",
    body: "For licensees completing education associated with returning an inactive license to active status.",
  },
  {
    id: "exam-prep",
    eyebrow: "EXAM PREP",
    title: "Exam Preparation",
    body: "Focused preparation designed to reinforce key concepts before a licensing examination.",
  },
];
