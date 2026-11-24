import type { Transition } from "./types";
import { t1HeroAbout } from "./t1-hero-about";
import { t2AboutServices } from "./t2-about-services";
import { t3ServicesProcess } from "./t3-services-process";
import { t4ProcessStack } from "./t4-process-stack";
import { t5StackWork } from "./t5-stack-work";
import { t6WorkCredentials } from "./t6-work-credentials";
import { t7CredentialsExperience } from "./t7-credentials-experience";
import { t8ExperienceEducation } from "./t8-experience-education";
import { t9EducationContact } from "./t9-education-contact";

export const TRANSITIONS: Transition[] = [
  t1HeroAbout,
  t2AboutServices,
  t3ServicesProcess,
  t4ProcessStack,
  t5StackWork,
  t6WorkCredentials,
  t7CredentialsExperience,
  t8ExperienceEducation,
  t9EducationContact,
];
