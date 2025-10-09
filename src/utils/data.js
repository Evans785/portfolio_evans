import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

import ROBOT from "../assets/images/robots.jpg";
import PROJECT_IMG_1 from "../assets/images/eCommerce.png";
import PROJECT_IMG_2 from "../assets/images/blogGeneratrice.png";
import PROJECT_IMG_3 from "../assets/images/gestionTache.png";
import PROJECT_IMG_4 from "../assets/images/projet4.jpg";
import PROJECT_IMG_5 from "../assets/images/construction.png";
import PROJECT_IMG_6 from "../assets/images/depense.png";
import PROJECT_IMG_7 from "../assets/images/projet7.jpg";
//  import PROJECT_IMG_8 from "../assets/images/projet8.jpg";

export const SKILLS_CATEGORY = [
  {
    title: "Frontend",
    icon: Code2,
    description: "Création d’interfaces belles et responsives",
    skills: [
      {
        name: "React",
        level: 93,
        color: "bg-blue-500",
      },
      {
        name: "Tailwind CSS",
        level: 92,
        color: "bg-cyan-500",
      },
      {
        name: "Framer Motion",
        level: 85,
        color: "bg-pink-500",
      },
      {
        name: "JavaScript",
        level: 92,
        color: "bg-blue-600",
      },
      //   {
      //     name:"Next.js",level:83,color:"bg-gray-800"
      // },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Développement back-end robuste",
    skills: [
      {
        name: "Node.js",
        level: 93,
        color: "bg-green-500",
      },
      {
        name: "Express js",
        level: 92,
        color: "bg-cyan-700",
      },
      {
        name: "Python",
        level: 85,
        color: "bg-yellow-500",
      },
      {
        name: "GraphQl",
        level: 92,
        color: "bg-pink-600",
      },
      {
        name: "Rest  Api",
        level: 83,
        color: "bg-orange-500",
      },
    ],
  },
  {
    title: "Database",
    icon: Database,
    description:
      "Conception, gestion et optimisation de bases de données pour des applications performantes et fiables.",
    skills: [
      {
        name: "MongoDB",
        level: 93,
        color: "bg-green-600",
      },
      {
        name: "MongoDb",
        level: 82,
        color: "bg-blue-700",
      },
      {
        name: "Prisma",
        level: 85,
        color: "bg-indigo-500",
      },
      {
        name: "Redis",
        level: 92,
        color: "bg-red-500",
      },
      {
        name: "Firebase",
        level: 90,
        color: "bg-yellow-800",
      },
    ],
  },
  {
    title: "Devops",
    icon: Cloud,
    description:
      "Automatisation des déploiements, surveillance et optimisation des environnements pour garantir fiabilité et performance.",
    skills: [
      {
        name: "Docker",
        level: 70,
        color: "bg-blue-600",
      },
      {
        name: "Aws",
        level: 50,
        color: "bg-orange-700",
      },
      {
        name: "Vercel",
        level: 85,
        color: "bg-gray-500",
      },
      {
        name: "Git",
        level: 92,
        color: "bg-orange-700",
      },
      {
        name: "CI/CD",
        level: 70,
        color: "bg-purple-800",
      },
    ],
  },
];

export const TECH_STACK = [
  "javascript",
  "HTML5",
  "CSS",
  "Notion",
  "SAS",
  "Figma",
  "Adobe XD",
  "vite",
  "webpack",
  "cypress",
  "chark",
  "jest",
  "slack",
];

export const STATS = [
  {
    number: "58+",
    label: "Projet achevé",
  },
  {
    number: "2+",
    label: "Années d’expérience",
  },
  {
    number: "20+",
    label: "Technologie",
  },
  {
    number: "100%",
    label: "client satisfait",
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "E-commerce plateforme",
    description:
      "Développement de plateformes e‑commerce performantes, sécurisées et faciles à utiliser pour une expérience client optimale",
    image: PROJECT_IMG_1,
    tags: ["react", "tailwind", "framer motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Développement complet",
  },
  {
    id: 2,
    title: "Blog App avec génération automatique de posts",
    description:
      "Création d’applications de blog dynamiques avec génération automatique de contenus pour un flux éditorial simplifié et interactif.",
    image: PROJECT_IMG_2,
    tags: ["react", "Node js", "Mongo Db", "tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "Développement complet",
  },
  {
    id: 3,
    title: "Application de gestion de tâches",
    description:
      "Développement d’applications de gestion de tâches efficaces pour organiser, suivre et prioriser les activités facilement.",
    image: PROJECT_IMG_3,
    tags: ["Javascript", "React js", "css", "Framer-motion"],
    liveUrl: "https://taskmate-chi-roan.vercel.app",
    githubUrl: "https://github.com/Evans785/taskmate.git",
    featured: true,
    category: "Application web",
  },
  {
    id: 4,
    title: "Application testée (QA)",
    description:
      "Mise en place et exécution de tests fonctionnels et E2E avec Cypress sur une application d’entretien. Vérification du flux complet : inscription, connexion, et gestion des entretiens. Utilisation de Postman pour la validation des API et rédaction de cas de test détaillés.",
    image: PROJECT_IMG_4,
    tags: ["Cypress", "Postman", "Testing", "QA", "JavaScript"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Qualité logicielle / Test QA",
  },

  {
    id: 5,
    title: "Application de construction",
    description:
      "Développement d’applications complètes pour concevoir et gérer des projets de manière efficace.",
    image: PROJECT_IMG_5,
    tags: ["next js", "typescript", "framer motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Application web",
  },
  {
    id: 6,
    title: "Suivi des dépenses",
    description:
      "Développement d’applications pour suivre et gérer les dépenses personnelles ou professionnelles de manière simple et efficace.",
    image: PROJECT_IMG_6,
    tags: ["next js", "typescript", "framer motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "Application web",
  },
  //  {
  //     id:7,
  //     title:"Task management App",
  //     description:"jsdgfjklekdgfgghhjjkkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjk",
  //     image:PROJECT_IMG_7,
  //     tags:["next js","typescript","framer motion"],
  //     liveUrl:"#",
  //     githubUrl:"#",
  //     featured: true,
  //     category:"web App",
  // },
];

export const JOURNEY_STEPS = [
  {
    year: "2023",
    title: "Début du code au BTS",
    company: "BTS – Groupe Istema, Abidjan",
    description:
      "Découverte du développement web durant mes cours au BTS et initiation aux bases du HTML, CSS et JavaScript.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2024",
    title: "Formation en front-end",
    company: "Projets personnels & cours en ligne",
    description:
      "Approfondissement du front-end avec React.js, création d’interfaces web interactives et réalisation de projets concrets.",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    year: "2024",
    title: "Formation full-stack",
    company: "Projets personnels & bootcamps",
    description:
      "Apprentissage du back-end avec Node.js et Firebase, création d’applications complètes front-end / back-end.",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2024",
    title: "Stage full-stack en start-up",
    company: "Start-up locale",
    description:
      "Stage pratique où j’ai travaillé sur des projets réels en full-stack, collaboré avec une équipe et mis en application mes compétences techniques.",
    icon: Rocket,
    color: "bg-orange-500",
  },
  {
    year: "2025",
    title: "Lancement en freelance",
    company: "Côte d’Ivoire & international",
    description:
      "Démarrage de mon activité freelance après la fin du stage. Réalisation de projets web pour des clients et consolidation de mon expérience professionnelle.",
    icon: Zap,
    color: "bg-cyan-500",
  },
  {
    year: "2025",
    title: "Entrepreneuriat et services web",
    company: "Clients & projets personnels",
    description:
      "Proposition de services web aux entreprises et startups, lancement de mes propres projets et expansion de mon activité freelance.",
    icon: Award,
    color: "bg-pink-500",
  },
];

export const PASSION = [
  {
    icon: Heart,
    title: "Expérience",
    description:
      " Une solide expérience dans le développement d’applications web modernes et performantes, couvrant à la fois le front-end et le back-end",
  },
  {
    icon: Coffee,
    title: " Résolution de problèmes",
    description:
      " Capacité à identifier, analyser et résoudre efficacement des problèmes complexes dans le développement d’applications et la gestion de projets technologiques",
  },
  {
    icon: BookOpen,
    title: "Apprentissage continu ",
    description:
      "Toujours à la recherche de nouvelles compétences et technologies pour améliorer mes projets et rester à la pointe du développement web et logiciel",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Github",
    icon: FiGithub,
    url: "https://github.com/Evans785",
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-800",
  },
  {
    name: "Linkedin",
    icon: FiLinkedin,
    url: "www.linkedin.com/in/yann-evans-adje-57749328b",
    color: "hover:text-blue-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    name: "Twitter",
    icon: FiTwitter,
    url: "https://x.com/uncleagbadou?s=21",
    color: "hover:text-sky-500",
    bgColor: "hover:bg-blue-500/10",
  },
  {
    name: "Email",
    icon: FiMail,
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=yannpaulevansadje@gmail.com",
    color: "hover:text-green-400",
    bgColor: "hover:bg-green-500/10",
  },
];

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "localisation",
    value: "Cocody Angré",
  },
  {
    icon: Mail,
    label: "Email",
    value: "yannpaulevansadje@gmail.com",
  },
  {
    icon: Phone,
    label: "phone",
    value: "+225 0759884664",
  },
];
