import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { FiMapPin } from "react-icons/fi";
import { useTranslations } from 'next-intl';


export const footer = [
    {
        name: "number",
        content: "009990099",
        icon: <SlPhone />
    },
    {
        name: "number1",
        content: "009990099",
        icon: <SlPhone />
    },
    {
        name: "email",
        content: "ex@ex.ex",
        icon: <MdOutlineEmail />
    },
    {
        name: "address",
        content: "Bordj bou arreridj, 5 juilier",
        icon: <FiMapPin />
    }
];

export const useNavbarLinks = () => {
  const t = useTranslations('Navbar');

  return [
    {
      name: t("home.name"),
      hash: t("home.hash"),
    },
    {
      name: t("services.name"),
      hash: t("services.hash"),
    },
    {
      name: t("us.name"),
      hash: t("us.hash"),
    },
    {
      name: t("contact.name"),
      hash: t("contact.hash"),
    },
    {
      name: t("ЛБ.name"),
      hash: t("ЛБ.hash"),
    }
  ];
};
export const service = ()=>{
  return[
    {
      name: "Implant dentaire",
    },
    {
      name: "Appareils orthodontiques et aligneurs",
    },
    {
      name: "Tad",
    },
    {
      name: "Couronne dentaire",
    },
    {
      name: "Soins dentaires",
    },
    {
      name: "bridge",
    },
    {
      name: "Consultation",
    },
    {
      name: "Détartrage et polissage",
    },
    {
      name: "blanchiment",
    },
    {
      name: "Traitement canalaire",
    },
    {
      name: "Extraction des dents de sagesse",
    },
    {
      name: "Prothèse dentaire",
    },
    {
      name: "Chirurgie légère",
    },
    {
      name: "Gingivectomy",
    },
  ]
}
export const maladie=()=>{
  return [
    { name:"pas de maladie"},
    { name: "Grippe", description: "Infection virale aiguë qui affecte les voies respiratoires." },
    { name: "Rhume", description: "Infection virale bénigne des voies respiratoires supérieures." },
    { name: "Diabète", description: "Maladie métabolique caractérisée par une hyperglycémie chronique." },
    { name: "Hypertension artérielle", description: "Élévation persistante de la pression artérielle." },
    { name: "Asthme", description: "Affection respiratoire chronique causant une inflammation des voies respiratoires." },
    { name: "Bronchite", description: "Inflammation des bronches, généralement causée par une infection virale ou bactérienne." },
    { name: "Eczéma", description: "Affection cutanée provoquant des démangeaisons et des éruptions cutanées." },
    { name: "Rhinite allergique", description: "Réaction allergique causant des symptômes nasaux comme le nez qui coule et les éternuements." },
    { name: "Sinusite", description: "Inflammation des sinus, souvent à la suite d'une infection virale ou bactérienne." },
    { name: "Cancer", description: "Groupe de maladies caractérisées par la croissance incontrôlée des cellules." },
    { name: "Insomnie", description: "Trouble du sommeil caractérisé par une difficulté à s'endormir ou à rester endormi." },
    { name: "Migraine", description: "Type de mal de tête sévère souvent accompagné de nausées et de sensibilité à la lumière." },
    { name: "Arthrite", description: "Inflammation des articulations, pouvant causer douleur et raideur." },
    { name: "Gastro-entérite", description: "Inflammation de l'estomac et de l'intestin, souvent causée par une infection virale ou bactérienne." },
    { name: "Hépatite", description: "Inflammation du foie, souvent causée par une infection virale ou des substances toxiques." }
  ];
}
// for the  services 
export const useServices =()=>{
    const t = useTranslations('Services');
        return[
          {
            titre: t("Check.title"),
            content: t('Check.description'),
            image: "/services/check.webp",
            icon: "https://img.icons8.com/?size=100&id=Qynk0dQDDiY4&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Implant.title"),
            content: t('Implant.description'),
            image: '/services/implant.webp',
            icon: "https://img.icons8.com/?size=100&id=GSlkzWZjhPmT&format=png&color=214030",
            direction: "left"
        },
        {
          titre: t("Crown.title"),
          content: t('Crown.description'),
          image: "/services/crown.webp",
          icon: "https://img.icons8.com/?size=100&id=2j8774BkNjto&format=png&color=214030",
          direction: "left"
      },
      {
          titre: t("Bridges.title"),
          content: t('Bridges.description'),
          image: "/services/bridges.webp",
          icon: "https://img.icons8.com/?size=100&id=Ax1nHq12vdvJ&format=png&color=214030",
          direction: "left"
      },
        {
            titre: t("Braces.title"),
            content: t('Braces.description'),
            image: "/services/braces.webp",
            icon: "https://img.icons8.com/?size=100&id=ZDLptEjyNsEC&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("screw.title"),
            content: t('screw.description'),
            image: "/services/tads.jpg",
            icon: "https://img.icons8.com/?size=100&id=ZDLptEjyNsEC&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Scaling.title"),
            content: t('Scaling.description'),
            image: "/services/scaling.webp",
            icon: "https://img.icons8.com/?size=100&id=7A92Y2BcmAqx&format=png&color=214030",
            direction: "right"
        },
        {
          titre: t("Whitening.title"),
          content: t('Whitening.description'),
          image: "/services/whitening.webp",
          icon: "https://img.icons8.com/?size=100&id=TEEyuMyShFK0&format=png&color=214030",
          direction: "left"
      },
      {
        titre: t("gumy.title"),
        content: t('gumy.description'),
        image: "/services/gumy.jpg",
        icon: "https://img.icons8.com/?size=100&id=wpfUlRXFcAiU&format=png&color=214030",
        direction: "right"
    },
    {
      titre: t("Denture.title"),
      content: t('Denture.description'),
      image: "/services/dentures.webp",
      icon: "https://img.icons8.com/?size=100&id=wpfUlRXFcAiU&format=png&color=214030",
      direction: "right"
  },
        {
          titre: t("Filling.title"),
          content: t('Filling.description'),
          image: "/services/filling.webp",
          icon: "https://img.icons8.com/?size=100&id=9RFbbtSrKPzM&format=png&color=214030",
          direction: "left"
      },
        {
            titre: t("Root.title"),
            content: t('Root.description'),
            image: "/services/root.webp",
            icon: "https://img.icons8.com/?size=100&id=olmK5dbavUrn&format=png&color=214030",
            direction: "right"
        },
        {
            titre: t("Wisdom.title"),
            content: t('Wisdom.description'),
            image: "/services/wisdom.webp",
            icon: "https://img.icons8.com/?size=100&id=eAO25vPIMU17&format=png&color=214030",
            direction: "left"
        },
    
    {
      titre: t("minor.title"),
      content: t('minor.description'),
      image: "/services/mini.jpg",
      icon: "https://img.icons8.com/?size=100&id=wpfUlRXFcAiU&format=png&color=214030",
      direction: "left"
  },
  
    ];

}

//for the side bar admin
import { IoHomeOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa";

export const navList= [{
    title:"accueil",
    url: "/admin" ,
    icon:<IoHomeOutline />,
},
{
    title:"patient",
    url:"/admin/patient",
    icon:<FaUserInjured />,
},
{
    title:"rendez-vous",
    url:"/admin/rendez-vous",
    icon:<SlCalender />,
},  {
    title:"docteur",
    url:"/admin/docteur",
    icon:<FaUserDoctor />,
},{
    title: "paramétre",
    icon: <IoSettingsOutline />,
    subMenu:true,
    subItems: [
        { title: "Settings", url: "/admin/settings" },
        { title: "Opening Hours", url: "/admin/opening" },
        { title: "Menu", url: "/admin/menu" },
    ],
},
];

// Lb 

export const useLbNavbarLinks = () => {  
    return [
      {
        name: "Home",
        hash: "/#accueil",
      },
      {
        name: "Services",
        hash: "/#services",
      },
      {
        name: "Why Us?",
        hash: "/#nous",
      },
      {
        name: "Contact",
        hash: "/#Contact",
      },
      {
        name: "ЛБ",
        hash: "/lb",
      }
    ];
  };

  //for the lb features
  export const uselbFeaturs= ()=>{
    return[
      {
        name:"Strong"
      },{
        name:"Long-Lasting"
      },{
        name:"Natural-Looking"
      }
    ]
  }

  export const useDays = ()=>{
    return [
      { dayOfWeek: 0, openTime: '08:00', closeTime: '18:00' }, // Sunday
      { dayOfWeek: 1, openTime: '08:00', closeTime: '18:00' }, // Monday
      { dayOfWeek: 2, openTime: '08:00', closeTime: '18:00' }, // Tuesday
      { dayOfWeek: 3, openTime: '08:00', closeTime: '18:00' }, // Wednesday
      { dayOfWeek: 4, openTime: '08:00', closeTime: '18:00' }, // Thursday
      { dayOfWeek: 5, openTime: '08:00', closeTime: '18:00' }, // Friday
      { dayOfWeek: 6, openTime: '08:00', closeTime: '18:00' }, // Saturday
  ];
  }